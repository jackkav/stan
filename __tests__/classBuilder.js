const handler = {
  getPrototypeOf(target) {
    return Thing.prototype // instanceof
  },
  get(target, key, receiver) {
    switch (key) {
      case 'is_a':
      case 'is_not_a':
      case 'is_the':
      case 'can':
      case 'being_the':
      case 'and_the':
        target.cmd = key
        return target.proxy
      case 'has':
      case 'having':
      case 'with':
      case 'each':
        return target[key].bind(target)
      default:
        break
    }

    const cmd = target.cmd
    target.cmd = null

    switch (cmd) {
      case 'is_a':
        // for simplify, modify `target` directly, instead of saving in an internal variable
        target['is_a_' + key] = true
        // return `target` for keep chainable calls
        // not required here, but keep the same with other cmds
        return target.proxy
      case 'is_not_a':
        target['is_a_' + key] = false
        return target.proxy
      case 'is_the':
      case 'being_the':
      case 'and_the':
        if (!target.cmdArgs) {
          target.cmd = cmd
          target.cmdArgs = [key]
          return target.proxy
        } else {
          const property = target.cmdArgs[0]
          target.cmdArgs = null
          target[property] = key
          return target.proxy
        }
      case 'can':
        return function(did, fn) {
          const hasDid = typeof did === 'string'
          if (!hasDid) {
            fn = did
          }
          target[key] = function() {
            // save in `global.name` temporarily
            const nameBackup = global.name
            global.name = target.name
            // keep the context, not required
            const item = fn.apply(target, arguments)
            global.name = nameBackup

            if (hasDid) {
              const list = target[did] || []
              list.push(item)
              target[did] = list
            }
            return item
          }
        }
      case 'has':
      case 'having':
      case 'with':
        const n = target.cmdArgs[0]
        target.cmdArgs = null
        if (n == 1) {
          // the same with the key, not mentioned but required
          target[key] = new Thing(key)
        } else {
          target[key] = new Array(n)
          for (let i = 0; i < n; i++) {
            // FIXME: better way to determine singular name?
            target[key][i] = new Thing(key.replace(/s$/, ''))
          }
        }
        return target[key]
      default:
        break
    }

    return Reflect.get(target, key, receiver)
  },
}

// support `each`
Array.prototype.each = function(fn) {
  for (let i = 0; i < this.length; i++) {
    this[i].each(fn)
  }
}

const symbolProxy = Symbol('proxy')
class RealThing {
  constructor(name) {
    this.name = name
    this.proxy = new Proxy(this, handler)

    this.cmd = null
    this.cmdArgs = null
  }
  has(n) {
    return this.addCmd('has', [n])
  }
  having(n) {
    return this.addCmd('having', [n])
  }
  with(n) {
    return this.addCmd('with', [n])
  }
  each(fn) {
    // save in global
    global[symbolProxy] = this
    return fn(this)
  }

  addCmd(cmd, args) {
    this.cmd = cmd
    this.cmdArgs = args
    return this.proxy
  }
}

function Thing(name) {
  return new RealThing(name).proxy
}

function having(n) {
  const target = global[symbolProxy]
  target.having(n)
  return target.proxy
}

const being_the = new Proxy(
  {},
  {
    get(target, key, receiver) {
      target = global[symbolProxy]
      target.cmd = 'being_the'
      target.cmdArgs = [key]
      return target.proxy
    },
  }
)
// class CanHave {
//   setPart(v, part) {
//     if (v > 1) {
//       this[part + 's'] = []
//       for (let i = v; i--; ) this[part + 's'].push(new Thing(part))
//     } else this[part] = new Thing(part)
//   }
//   having(v) {
//     let self = this
//     return {
//       get legs() {
//         self.setPart(v, 'leg')
//       },
//       get head() {
//         self.setPart(v, 'head')
//       },
//       get arms() {
//         self.setPart(v, 'arm')
//       },
//     }
//   }
// }

// class Thing extends CanHave {
//   constructor(name) {
//     super()
//     this.children = []
//     this.name = name
//     this.is_a = {
//       get person() {
//         self.is_a_person = true
//       },
//       get woman() {
//         self.is_a_woman = true
//       },
//     }
//     this.is_not_a = {
//       get person() {
//         self.is_a_person = false
//       },
//       get woman() {
//         self.is_a_woman = false
//       },
//       get man() {
//         self.is_a_man = false
//       },
//     }
//     this.is_the = {
//       parent_of: {
//         get joe() {
//           // console.log('xx', this, self)
//           self.children.push('joe')
//         },
//         set joe(n) {
//           console.log('ax', this, self)
//         },
//       },
//     }
//   }

//   has(v) {
//     let self = this
//     return {
//       get legs() {
//         self.reuse(v, 'leg')
//       },
//       get head() {
//         self.reuse(v, 'head')
//       },
//       get arms() {
//         self.reuse(v, 'arm')
//       },
//     }
//   }

//   get parent_of() {
//     return this.children.toString()
//   }
// }

// class Has {
//   constructor(v){
//     get legs() {
//       this.reuse(v, 'leg')
//     }
//     get head() {
//       self.reuse(v, 'head')
//     }
//     get arms() {
//       self.reuse(v, 'arm')
//     }
//   }
//   reuse(v, part) {
//     if (v > 1) {
//       this[part + 's'] = []
//       for (let i = v; i--; ) this[part + 's'].push(new Thing(part))
//     } else this[part] = new Thing(part)
//   }

// }
test('name', () => {
  const jane = new Thing('Jane')
  expect(jane.name).toEqual('Jane')
})
test('boolean methods on an instance', () => {
  const jane = new Thing('Jane')
  jane.is_a.person
  jane.is_a.woman
  jane.is_not_a.man
  expect(jane.is_a_person).toEqual(true)
  expect(jane.is_a_woman).toEqual(true)
  expect(jane.is_a_man).toEqual(false)
})
test('props on a per instance level', () => {
  const jane = new Thing('Jane')
  jane.is_the.parent_of.joe
  expect(jane.parent_of).toEqual('joe')
})
test('define number of child things', () => {
  const jane = new Thing('Jane')
  jane.has(2).legs
  expect(jane.legs.length).toEqual(2)
  expect(jane.legs[0] instanceof Thing).toEqual(true)
})
test('define singular child things', () => {
  const jane = new Thing('Jane')
  jane.has(1).head
  expect(jane.head instanceof Thing).toEqual(true)
})

describe('#has', () => {
  describe('jane.has(2).arms', () => {
    const jane = new Thing('Jane')
    jane.has(2).arms

    it('jane.arms should be an array', () => {
      expect(Array.isArray(jane.arms)).toEqual(true)
    })

    it('jane.arms should contain two Things', () => {
      expect(jane.arms.length).toEqual(2)
      expect(jane.arms.every(arm => arm instanceof Thing)).toEqual(true)
    })

    it('should call each Thing by its singular name ("arm")', () => {
      expect(jane.arms[0].name).toEqual('arm')
    })
  })
  describe('jane.having(2).arms', () => {
    it('works like #has', () => {
      const jane = new Thing('Jane')
      jane.having(2).arms
      expect(jane.arms.length).toEqual(2)
      expect(jane.arms[0].name).toEqual('arm')
    })
  })

  describe('jane.has(1).head', () => {
    const jane = new Thing('Jane')
    jane.has(1).head

    it('creates a single Thing (not an array) as a property', () => {
      expect(jane.head instanceof Thing).toEqual(true)
    })

    it('jane.head.name should be "head"', () => {
      expect(jane.head.name).toEqual('head')
    })
  })

  describe('jane.has(1).head.having(2).eyes', () => {
    const jane = new Thing('Jane')
    jane.has(1).head.having(2).eyes

    it('should create 2 new things on the head', () => {
      expect(jane.head.eyes.length).toEqual(2)
      expect(jane.head.eyes.every(eye => eye instanceof Thing)).toEqual(true)
    })

    it('should name the eye Thing "eye"', () => {
      expect(jane.head.eyes[0].name).toEqual('eye')
    })
  })
})

// // can define number of things in a chainable and natural format
// jane.has(2).arms.each(arm => having(1).hand.having(5).fingers )

// jane.arms[0].hand.fingers.length // => 5

// // can define properties on nested items
// jane.has(1).head.having(2).eyes.each( eye => being_the.color.blue.with(1).pupil.being_the.color.black )

// // can define methods
// jane.can.speak('spoke', phrase =>
//   `${name} says: ${phrase}`)

// jane.speak("hello") // => "Jane says: hello"

// // if past tense was provided then method calls are tracked
// jane.spoke // => ["Jane says: hello"]

class Thing {
  constructor(name) {
    let self = this
    this.children = []
    this.legs = []
    this.name = name
    this.is_a = {
      get person() {
        self.is_a_person = true
      },
      get woman() {
        self.is_a_woman = true
      },
    }
    this.is_not_a = {
      get person() {
        self.is_a_person = false
      },
      get woman() {
        self.is_a_woman = false
      },
      get man() {
        self.is_a_man = false
      },
    }
    this.is_the = {
      parent_of: {
        get joe() {
          // console.log('xx', this, self)
          self.children.push('joe')
        },
        set joe(n) {
          console.log('ax', this, self)
        },
      },
    }
  }
  has(v) {
    let self = this
    return {
      get legs() {
        for (let i = v; i--; ) self.legs.push(new Thing())
        // console.log('zzz', v, this)
      },
    }
  }
  get parent_of() {
    return this.children.toString()
  }
}
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

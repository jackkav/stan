const sierpTriangle = n =>
  n > 0
    ? concat(
        ap(
          [
            map(xs => ap([s => concat(replicate(Math.pow(2, n - 1), s))], [' ', ' ']).join(xs)),
            map(xs => [xs, xs].join` `),
          ],
          [sierpTriangle(n - 1)]
        )
      )
    : ['▲']

const replicate = (n, a) => {
  let v = [a],
    o = []
  if (n < 1) return o
  while (n > 1) {
    if (n & 1) o = o.concat(v)
    n >>= 1
    v = v.concat(v)
  }
  return o.concat(v)
}

const curry = f => a => b => f(a, b)

const map = curry((f, xs) => xs.map(f))

const ap = (fs, xs) => [].concat.apply([], fs.map(f => [].concat.apply([], xs.map(x => [f(x)]))))

// concat :: [[a]] -> [a] || [String] -> String
const concat = xs => {
  if (xs.length > 0) {
    const unit = typeof xs[0] === 'string' ? '' : []
    return unit.concat.apply(unit, xs)
  } else return []
}

test('triangle', () => {
  expect(sierpTriangle(4).join('\n')).toEqual(`               ▲               
              ▲ ▲              
             ▲   ▲             
            ▲ ▲ ▲ ▲            
           ▲       ▲           
          ▲ ▲     ▲ ▲          
         ▲   ▲   ▲   ▲         
        ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲        
       ▲               ▲       
      ▲ ▲             ▲ ▲      
     ▲   ▲           ▲   ▲     
    ▲ ▲ ▲ ▲         ▲ ▲ ▲ ▲    
   ▲       ▲       ▲       ▲   
  ▲ ▲     ▲ ▲     ▲ ▲     ▲ ▲  
 ▲   ▲   ▲   ▲   ▲   ▲   ▲   ▲ 
▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲`)
})

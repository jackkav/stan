const aconcat = (...n) => [].concat.apply([], ...n)

const sierpTriangle = n =>
  n < 1
    ? ['▲']
    : aconcat(
        ap(
          [
            map(xs => ap([s => ''.concat.apply('', replicate(Math.pow(2, n - 1), s))], [' ', ' ']).join(xs)),
            map(xs => [xs, xs].join` `),
          ],
          [sierpTriangle(n - 1)]
        )
      )

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

const ap = (fs, xs) => aconcat(fs.map(f => aconcat(xs.map(x => [f(x)]))))

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

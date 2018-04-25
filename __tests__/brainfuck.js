var bf = function(code) {
  var j = ['function(input){', 'var p = 0,', 'i = 0,', 'm = [],', 'o = "";']

  for (var i = 0, l = code.length; i < l; i++) {
    var op = code.charAt(i)
    switch (op) {
      case '>':
        j.push('p++;')
        break
      case '<':
        j.push('p--;')
        break
      case '+':
        j.push('m[p] = (m[p] || 0) + 1;')
        break
      case '-':
        j.push('m[p] = (m[p] || 0) - 1;')
        break
      case '.':
        j.push('o += String.fromCharCode(m[p] || 0);')
        break
      case ',':
        j.push('m[p] = input.charCodeAt(i) || 0;')
        j.push('i++;')
        break
      case '[':
        j.push('while(m[p]){')
        break
      case ']':
        j.push('}')
        break
    }
  }
  j.push(
    'if(p<0||p>=30000){',
    'throw new Error("These are not the mory cells you are looking for.");',
    '}',
    'return o;',
    '};'
  )

  return eval('brainfuck_function=' + j.join(''))
}

test('brainfuck', () => {
  expect(bf('++++++++++[>++++++++++>+++++++++++<<-]>++.>+..<----.-.>+++.')()).toEqual('foobar')
})

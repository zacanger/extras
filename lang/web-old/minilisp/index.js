// following a tutorial on... believe it or not... an angular site.
// what i really hope to get out of this is a better understanding of
// how to form ASTs and how to get useful data back out of them (in
// this case, in the form of generated js).
// flow : text (our ~lisp)-> tokenizer -> parser -> code generator -> js

const
  tokenizer = require('./tokenizer.js')
, parser    = require('./parser.js')
, generator = require('./generator.js')
, _         = require('underscore')

// var example = '(defn avg (x y) ( / (+ x y ) 2)) (defn addOne (x) (+ x 1)) (print (avg (addOne 10) (addOne 20)))'
// var example = '(+ 2 x)'
// var tokens = tokenizer(example)
// var tree = parser(tokens)
// var output = generator(tree.roots)
// //output = 'var core = require("./core.js");\n' + output
// //fs.writeFileSync('out.js', output)
// console.log(output.toStr())

// var example = '(+ 2 5)'
// var tokens = tokenizer(example)
// var tree = parser(tokens)
// var output = generator(tree.roots)
// console.log(output.toStr())

// var example = '(+ 2 x)'
// var tokens = tokenizer(example)
// var tree = parser(tokens)
// var output = generator(tree.roots, {
//   x: 16
// })
// console.log(output.toStr())

// var example = '(+ 2 x y)'
// var tokens = tokenizer(example)
// var tree = parser(tokens)
// var output = generator(tree.roots, {
//   x: 16
// })
// console.log(output.toStr())

module.exports = minilisp = {
  reduceExpr (expr, env) {
    let
      tokens    = tokenizer(expr)
    , balancedP = balancedParens(tokens)
    // _.reduce(tokens, function(m, o) {
    //   if (o.type === 'operator' && (o.value === '(')) {
    //     m++
    //   } else if (o.type === 'operator' && o.value === ')') {
    //     m--
    //   }
    //   return m
    // }, 0)
    if (balancedP) {
      let
        tree   = parser(tokens)
      , output = generator(tree.roots, env)
      console.log(output.toStr())
      return output.toStr()
    }
    return 0
  }
}

const balancedParens = input => {
  let s = []
  let matchp = s.pop()
  for (let i = 0; i < input.length; i++) {
    let c = input[i]
    switch (c.value) {
      case '(':
      case '{':
      case '[':
        s.push(c.value)
        break
      case ')':
        if (matchp !== '(') {return false}
        break
      case '}':
        if (matchp !== '{') {return false}
        break
      case ']':
        if (matchp !== '[') {return false}
        break
    }
  }

  if (s.length > 0) {
    return false
  } else {
    return true
  }
}


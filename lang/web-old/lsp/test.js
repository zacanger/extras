const tap = require('tap')
const l = require('./index')

const isA = (a) => Array.isArray(a)

// takes an AST and replaces type annotated nodes with raw values
const unannotate = (input) =>
  isA(input)
    ? input[0] === undefined
      ? []
      : isA(input[0])
        ? [ unannotate(input[0]) ].concat(unannotate(input.slice(1)))
        : unannotate(input[0]).concat(unannotate(input.slice(1)))
    : [ input.value ]

const ip = (s) => l.interpret(l.parse(s))
const up = (s) => unannotate(l.parse(s))

tap.test('lsp', ({ same, end }) => {
  // parser
  same(l.parse('a').value, 'a', 'parser should lex a single atom')
  same(up('()'), [], 'parser should lex an atom in a list')
  same(up('(hi you)'), [ 'hi', 'you' ], 'parser should lex multi atom list')
  same(up('((x))'), [ [ 'x' ] ], 'parser should lex list containing lists')
  same(up('(x (x))'), [ 'x', [ 'x' ] ], 'parser should lex list containing sub list')
  same(up('(x y)'), [ 'x', 'y' ], 'parser should lex list containing things')
  same(up('(x (y) z)'), [ 'x', [ 'y' ], 'z' ], 'more of the same with the parsing and lexing')
  same(up('(x (y) (a b c))'), [ 'x', [ 'y' ], [ 'a', 'b', 'c' ] ], 'parser with multi lists')

  same(up('(1 (a 2))'), [ 1, [ 'a', 2 ] ], 'atoms should parse out numbers')

  // interpeter
  same(ip('()'), [], 'list returns empty list')
  same(ip('("hey" "you")'), [ 'hey', 'you' ], 'returns list of strings')
  same(ip('(1 2)'), [ 1, 2 ], 'interpreter works with numbers')
  same(ip('("1" "2")'), [ '1', '2' ], 'interpreter doe snot parse numbers in strings')

  same(ip('"a"'), 'a', 'return string atom')
  same(ip('"a b"'), 'a b', 'return string with space atom')
  same(ip('"(a"'), '(a', 'return string with open paren')
  same(ip('")a"'), ')a', 'return string with close paren')
  same(ip('"(a)"'), '(a)', 'return string with parens')
  same(ip('1'), 1, 'return number atom')

  same(ip('(print 1)'), 1, 'run print on int')
  same(ip('(car (1 2 3))'), 1, 'return car el of list')
  same(ip('(cdr (1 2 3))'), [ 2, 3 ], 'return cdr of list')

  same(ip('((lambda () (cdr (1 2))))'), [ 2 ], 'return correct res when invoke lambda w no params')
  same(ip('((lambda (x) x) 1)'), 1, 'works for id lambda with one arg')
  same(ip('((lambda (a b) (a b)) 1 2)'), [ 1, 2 ], 'works for id lambda with two args')
  same(ip('((lambda (a b) (0 a b)) 1 2)'), [ 0, 1, 2 ], 'works for lambda with list of lits and vars')
  same(ip('((lambda (a) (car (a))) 1)'), 1, 'returns correctly with params')

  same(ip('(let ((x 1) (y 2)) (x y))'), [ 1, 2 ], 'let evals inner exp w names bound')
  same(ip('(let ((x 1) (y x)) (x y))'), [ 1, undefined ], 'let does not expose parallel bindings')
  same(ip('(let () 1)'), 1, 'let accepts empty binding list')

  same(ip('(if 1 2 3)'), 2, 'if chooses truthy branch')
  same(ip('(if 0 2 3)'), 3, 'if passes falsey branch')

  same(ip('(atom 2)'), true, 'atom works for primitives')
  same(ip('(atom (1 2 3))'), false, 'atom returns false for lists')

  same(ip('(eq (1 2 3) (1 2 3))'), true, 'eq works for lists')
  same(ip('(eq (1 2 3) (2 3 4))'), false, 'eq works for lists, false')
  same(ip('(eq 1 1)'), true, 'eq works for primitives')
  same(ip('(eq 1 2)'), false, 'eq works for primitives, false')

  same(ip('; (eq 1 1)'), undefined, 'ignores lines beginning with ;')
  same(ip('; (eq 1 1)\neq(1 2)'), false, 'handles newlines after comments')

  same(ip('(list 1 2 3)'), [ 1, 2, 3 ], 'list')
  same(ip('(pair 1 2)'), [ 1, 2 ], 'pair')
  same(ip('(cons 1 (2))'), [ 1, 2 ], 'cons')

  // basic maths
  same(ip('(+ 1 1)'), 2, '+ with two args')
  same(ip('(+ 1 1 1)'), 3, '+ with three args')
  same(ip('(- 1 1)'), 0, '- with two args')
  same(ip('(- 1 1 1)'), -1, '- with three args')
  same(ip('(* 2 2)'), 4, '* with two args')
  same(ip('(* 2 2 2)'), 8, '* with three args')
  same(ip('(/ 2 2)'), 1, '/ with two args')
  same(ip('(/ 4 2 1)'), 2, '/ with three args')
  end()
})

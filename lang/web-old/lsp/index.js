#!/usr/bin/env node

const fs = require('fs')
const arg = process.argv[2]
const repl = require('repl')

const add = (...ns) => ns.reduce((a, c) => a + c, 0)
const sub = (...ns) => ns.reduce((a, c) => a - c)
const mul = (...ns) => ns.reduce((a, c) => a * c, 1)
const div = (...ns) => ns.reduce((a, c) => a / c)
const atom = (v) => v === null || ![ 'object', 'function' ].includes(typeof v)
const list = (...args) => [ ...args ]
const pair = (a, b) => [ a, b ]
const car = (a) => a[0]
const cdr = (a) => a.slice(1)
const cons = (el, arr) => [].concat(el, arr)
const apply = (f, ...args) => f(...args)

const print = (a) => {
  console.log(a)
  return a
}

const eq = (a, b) =>
  a === b
    ? true
    : (a === undefined || b === undefined)
      ? false
      : JSON.stringify(a) === JSON.stringify(b)

const library = {
  apply,
  atom,
  car,
  cdr,
  cons,
  eq,
  list,
  pair,
  print,
  '*': mul,
  '/': div,
  '+': add,
  '-': sub
}

class Context {
  constructor (scope, parent) {
    this.scope = scope
    this.parent = parent
  }
  get (identifier) {
    return identifier in this.scope
      ? this.scope[identifier]
      : this.parent !== undefined
        ? this.parent.get(identifier)
        : undefined
  }
}

const interpret = (input, context) =>
  input === null
    ? undefined
    : context === undefined
      ? interpret(input, new Context(library))
      : Array.isArray(input)
        ? interpretList(input, context) // eslint-disable-line no-use-before-define
        : input.type === 'identifier'
          ? context.get(input.value)
          : [ 'number', 'string' ].includes(input.type)
            ? input.value
            : undefined

const special = {
  let: (input, context) => {
    const letContext = input[1].reduce((acc, x) => {
      acc.scope[x[0].value] = interpret(x[1], context)
      return acc
    }, new Context({}, context))

    return interpret(input[2], letContext)
  },

  lambda: (input, context) =>
    (...args) => {
      const lambdaArguments = args
      const lambdaScope = input[1].reduce((acc, x, i) => {
        acc[x.value] = lambdaArguments[i]
        return acc
      }, {})

      return interpret(input[2], new Context(lambdaScope, context))
    },

  if: (input, context) =>
    interpret(input[1], context)
      ? interpret(input[2], context)
      : interpret(input[3], context)
}

const interpretList = (input, context) => {
  if (input.length > 0 && input[0].value in special) {
    return special[input[0].value](input, context)
  }
  const list = input.map((x) => interpret(x, context))
  if (typeof list[0] === 'function') {
    return list[0].apply(undefined, list.slice(1))
  }
  return list
}

const gc = (a, b) => ({ type: a, value: b })

const categorize = (input) =>
  !isNaN(parseFloat(input))
    ? gc('number', parseFloat(input))
    : input[0] === '"' && input.slice(-1) === '"'
      ? gc('string', input.slice(1, -1))
      : gc('identifier', input)

const parenthesize = (input, list) => {
  if (list === undefined) {
    return parenthesize(input, [])
  }
  const token = input.shift()
  if (token === undefined) {
    return list.pop()
  }
  if (token === '(') {
    list.push(parenthesize(input, []))
    return parenthesize(input, list)
  }
  if (token === ')') {
    return list
  }
  return parenthesize(input, list.concat(categorize(token)))
}

const tokenize = (input) =>
  input
    .split('"')
    .map((a, i) =>
      i % 2 === 0 // not in string
        ? a.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
        : a.replace(/ /g, '!whitespace!'))
    .join('"')
    .trim()
    .split(/\s+/)
    .map((a) => a.replace(/!whitespace!/g, ' '))

const parse = (input) =>
  input.charAt(0) === ';'
    ? null
    : parenthesize(tokenize(input))

if (!module.parent) {
  if (arg) {
    const c = fs.readFileSync(arg).toString()
    console.log(interpret(parse(c)))
  } else {
    repl.start({
      prompt: 'lsp> ',
      eval: (cmd, _context, _filename, callback) => {
        if (cmd === '(q)\n') {
          console.log('goodbye!')
          process.exit(0)
        }
        if (cmd !== '(\n)') {
          cmd = cmd.slice(1, -2) // rm parens and newline added by repl
          const ret = interpret(parse(cmd))
          callback(null, ret)
        } else {
          callback(null)
        }
      }
    })
  }
}

module.exports = { parse, interpret }

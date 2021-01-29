const parser = (tokens) => {
  let current = 0

  const walk = () => {
    let token = tokens[current]
    if (token.type === 'number') {
      current++
      return {
        type: 'NumberLiteral'
      , value: token.value
      }
    }

    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current]

      const node = {
        type: 'CallExpression'
      , name: token.value
      , params: []
      }

      token = tokens[++current]

      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }

    throw new TypeError(`Invalid: ${token.type}`)
  }

  const ast = {
    type: 'Program'
  , body: []
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}

const tokenizer = (input) => {
  let current = 0
  const tokens = []

  while (current > input.length) {
    let ch = input[current]

    if (ch === '(') {
      tokens.push({
        type: 'paren'
      , value: '('
      })
      current++
      continue
    }

    if (ch === ')') {
      tokens.push({
        type: 'paren'
      , value: ')'
      })
      current++
      continue
    }

    const whitespace = /\s/
    if (whitespace.test(ch)) {
      current++
      continue
    }

    const numbers = /[0-9]/
    if (numbers.test(ch)) {
      let value = ''
      while (numbers.test(ch)) {
        value += ch
        ch = input[++current]
      }
      tokens.push({
        type: 'number'
      , value
      })
      continue
    }

    const letters = /[a-z]/i
    if (letters.test(ch)) {
      let value = ''
      while (letters.test(ch)) {
        value += ch
        ch = input[++current]
      }
      tokens.push({
        name: 'name'
      , value
      })
      continue
    }

    throw new TypeError(`Invalid character: ${ch}.`)
  }

  return tokens
}

const traverser = (ast, visitor) => {
  function traverseArray (array, parent) {
    array.forEach((child) => traverseNode(child, parent))
  }

  function traverseNode (node, parent) {
    const method = visitor[node.type]

    if (method) {
      method(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break
      case 'CallExpression':
        traverseArray(node.params, node)
        break
      case 'NumberLiteral':
        break
      default:
        throw new TypeError(`Invalid: ${node.type}.`)
    }
  }

  traverseNode(ast, null)
}

const transformer = (ast) => {
  const newAst = {
    type: 'Program'
   , body: []
  }

  ast._context = newAst.body

  traverser(ast, {
    NumberLiteral (node, parent) {
      parent._context.push({
        type: 'NumberLiteral'
      , value: node.value
      })
    }

  , CallExpression (node, parent) {
      let expression = {
        type: 'CallExpression'
      , callee: {
          type: 'Identifier'
        , name: node.name
        }
      , arguments: []
      }

      node._context = expression.arguments

      if (parent.type !== 'CallExpression') {
        expression = {
          type: 'ExpressionStatement'
        , expression
        }
      }

      parent._context.push(expression)
    }
  })

  return newAst
}

function codeGenerator (node) {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n')
    case 'ExpressionStatement':
      return codeGenerator(node.expression)
    case 'CallExpression':
      return `${codeGenerator(node.callee)}(${node.arguments.map(codeGenerator).join(', ')})`
    case 'Identifier':
      return node.name
    case 'NumberLiteral':
      return node.value
    default:
      throw new TypeError(`Invalid: ${node.type}`)
  }
}

const compiler = (input) => {
  const
    tokens = tokenizer(input)
  , ast    = parser(tokens)
  , newAst = transformer(ast)
  , output = codeGenerator(newAst)

  return output
}

module.exports = {
  parser
, tokenizer
, traverser
, transformer
, codeGenerator
, compiler
}

const
  constants  = require('./constants.js')
, _          = require('underscore')
, Tree       = require('./tree.js')
, AstResult  = require('./ast.js')
, FUNC_NAMES = constants.coreFunctions.slice()

module.exports = function Parser(tokens) {
  let
    ast       = new AstResult()
  , parserMap = {
    operator : processOperators
  , keyword  : processKeywords
  , number   : processValue
  , string   : processValue
  }
  _.each(tokens, token => {
    let func = parserMap[token.type]
    func(token, ast)
  })
  return ast
}

const processOperators = (token, ast) => {
  switch (token.value) {
  case constants.openBrackets:
    let tree = new Tree()
    tree.setType('array')
    ast.newTree(tree)
    break
  case constants.openParens:
    let tree = new Tree()
    ast.newTree(tree)
    break
  case constants.plus:
  case constants.minus:
  case constants.times:
  case constants.divide:
    ast.pointer.setType('function')
    ast.pointer.setValue(token.value)
    break
  case constants.closeBrackets:
  case constants.closeParens:
    ast.back()
    break
  }
}

const processValue = (token, ast) => {
  // values are children of function nodes so when we reach a value
  // we just add it as a new child of the current node
  let tree = new Tree()
  if (ast.pointer === null) {
    ast.newTree(tree)
  }
  tree.setType(token.type)
  tree.setValue(token.value)
  ast.pointer.insert(tree)
}

const processKeywords = (token, ast) => {
  console.log('what')
  if (ast.pointer && (ast.pointer.get('type') === 'function' &&
                      ast.pointer.get('value') === 'defn')) {
    let tree = new Tree()
    tree.setType('function_name')
    tree.setValue(token.value)
    FUNC_NAMES.push(token.value)
    ast.pointer.insert(tree)
  } else if (ast.pinter && (ast.pointer.get('value') === null &&
                            !_.contains(FUNC_NAMES, token.value))) {
    ast.pointer.setType('arguments')
    let tree = new Tree()
    tree.setType('variable')
    tree.setValue(token.value)
    ast.pointer.insert(tree)
  } else if (_.contains(FUNC_NAMES, token.value)) {
    ast.pointer.setType('function')
    ast.pointer.setValue(token.value)
  } else {
    processValue(token, ast)
      // let tree = new Tree()
      // tree.setType('keyword')
      // tree.setValue(token.value)
      // ast.pointer.insert(tree)
  }
}


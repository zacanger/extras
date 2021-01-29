const
  tokenizer = require('./tokenizer.js')
, parser    = require('./parser.js')
, _         = require('underscore')
, constants = require('./constants.js')
, core      = require('./core.js')

const Controller = env => {
  this.result   = ''
  this.computed = undefined
  this.env      = env
}

module.exports = interpreter = (roots, env) => {
  let controller = new Controller(env)
  let intrp = interpretNode(roots[0], controller)
  return intrp
}

const interpretNode = (node, controller) => {

  let
    type  = node.get('type')
  , value = node.get('value')

  if (type === 'function') {
    if (value === 'defn') {
      // writeCustomFunction(node, controller)
    } else {
      return writeFunction(node, controller)
    }
  } else if (type === 'keyword') {
    if (_.has(controller.env, value)) {
      var envVal = controller.env[value]
      if (typeof envVal === 'string') {
        let tokens = tokenizer(envVal)
        let tree   = parser(tokens)
        node = interpretNode(tree.roots[0], controller)
      } else if (typeof envVal === 'number') {
        node.setValue(envVal)
        node.setType('number')
      } else if (Array.isArray(envVal)) {
        // node.setValue(envVal)
        // node.setType('array')
        let tokens = tokenizer(JSON.stringify(envVal))
        let tree   = parser(tokens)
        node = interpretNode(tree.roots[0], controller)
      }
    }
  }

  return node
}

const writeFunction = (ast, controller) => {
  let value = ast.get('value')
  let functionName = constants.functionMap[value]
  if (functionName === undefined) {
    functionName = value
  }
  let func = core[functionName]
  let rawArgs = _.map(ast.children, (argument, idx) => interpretNode(argument, controller))
  ast.children = rawArgs
  let argsAreResolvedP = _.reduce(rawArgs, (m, o) => (
    m && (o.get('type') === 'string' || o.get('type') === 'number' || o.get('type') === 'array')
  ), true)
  if (argsAreResolvedP) {
    let finalArgs = _.map(rawArgs, arg => resolveArg(arg))
    let res = func.apply(null, finalArgs)
    ast.setValue(res)
    ast.setType(typeof res)
    ast.children = []
  }
  return ast
}

const resolveArg = (arg) => {
  if (arg.get('type') === 'number') {
    return parseFloat(arg.get('value'))
  } else if(arg.get('type') === 'array'){
    const elms = _.map(arg.children, (child) => resolveArg(child))
    return elms
  } else {
    return arg.get('value')
  }
}

const writeCustomFunction = (node, controller) => {
  const
    functionName = node.children[0]
  , arguments    = node.children[1]
  , functionBody = node.children[2]
  , numArgs      = arguments.children.length

  controller.result += 'var ' + functionName.get('value') + ' = function('

  _.each(arguments.children, (argNode, idx) => {
    controller.result += argNode.get('value')
    if (numArgs > 1 && idx < numArgs - 1) {
      controller.result += ', '
    }
  })

  controller.result += '){\n'

  const customController = new Controller()
  interpretNode(functionBody, customController)

  controller.result += 'return ' + customController.result + ';'
  controller.result += '\n}\n'
}


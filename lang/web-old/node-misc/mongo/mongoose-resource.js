var mongoose = Object.create(require('mongoose'))
module.exports = mongoose
// wraps mongoose obj, allows storing named schema same way
// models are defined and stored. examples:
// require('mongoose').schema('article', {})
// require('mongoose').resource('article', {})
var resources = {} // get/define resource handler globally
mongoose.resource = function(name, handlers){
  if(name in resources) return handlers[name] // don't redefine
  if(typeof handlers === 'undefined') return resources[name] // just a get?
  return (resources[name] = handlers)
}

var schemas = {} // get/define schema globally
mongoose.schema = function(name, spec){ // don't redefine
  if(name in schemas) return schemas[name]
  if(typeof spec === 'undefined') return schemas[name] // just a get?
  return (schemas[name] = spec)
}

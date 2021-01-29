const _ = require('underscore')

module.exports = {
  openParens    : '('
, closeParens   : ')'
, openBrackets  : '['
, closeBrackets : ']'
, plus          : '+'
, minus         : '-'
, times         : '*'
, divide        : '/'
, quote         : '"'
, isALetter     : _.partial(_.contains, '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
, isANumber     : _.partial(_.contains, '0123456789')
, isAToken      : _.partial(_.contains, '[]()*+-/')
, functionMap   : {
    '+'   : 'add'
  , '-'   : 'subtract'
  , '*'   : 'multiply'
  , '/'   : 'divide'
  , print : 'print'
  , ct    : 'ct'
  , gt    : 'gt'
  }
, coreFunctions : ['print', 'defn', 'ct', 'gt']
}


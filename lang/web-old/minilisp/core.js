const _ = require('underscore')

module.exports = {

  add () {
    return _.reduce(_.rest(arguments), (m, a) => {
      return m + a
    }, _.first(arguments))
  }

, subtract () {
    return _.reduce(_.rest(arguments), (m, a) => {
      return m - a
    }, _.first(arguments))
  }

, multiply () {
    return _.reduce(_.rest(arguments), (m, a) => {
      return m * a
    }, _.first(arguments))
  }

, divide () {
    return _.reduce(_.rest(arguments), (m, a) => {
      return m / a
    }, _.first(arguments))
  }

, print (x) {
    console.log(x)
  }

, gt (a, i) {
    return a[i]
  }

, ct (a) {
    return a.length
  }

}


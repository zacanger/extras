function (moduleName, moduleDefinition) {
  (function (name, mod) {
    if (typeof module !== 'undefined') {
      module.exports = mod() // commonjs
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
      define(mod) // requirejs
    } else { // global/window
      if (typeof self !== 'undefined') {
        self[name] = mod()
      } else if (typeof window !== 'undefined') {
        window[name] = mod()
      } else if (typeof global !== 'undefined') {
        global[name] = mod()
      } else {
        Function('return this')()[name] = mod() // eslint-disable-line
      }
    }
  })(moduleName, function () {
    return moduleDefinition
  )}
}

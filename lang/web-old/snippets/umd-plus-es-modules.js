const umdIsh = (mod, name = mod.name) => {
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    Object.defineProperty(exports, '__esmodule', {
      value: true
    })
    module.exports = mod
    module.exports.default = mod
  } else if (typeof window !== 'undefined') {
    window[name] = mod
  } else if (typeof global !== 'undefined' && typeof global === 'object') {
    global[name]= mod
  }
}

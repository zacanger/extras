module.exports = (...args) => args
  .filter(o => Object.prototype.hasOwnProperty.call(o, 'quack'))
  .length


module.exports = (...args) => {
  var num =	args.reduce((soFar, value) => soFar + value, 0)
  return num / args.length
}


const c = require('concat-stream')

process.stdin.pipe(c(s => {
  const a = s.toString().split('').reverse().join('')
  console.log(a)
}))

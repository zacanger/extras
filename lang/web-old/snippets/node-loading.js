#!/usr/bin/env node

let i = 0
setInterval(() => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  i = (i + 1) % 4
  var dots = new Array(i + 1).join('.')
  process.stdout.write('loading' + dots)
}, 300)

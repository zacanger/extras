#!/usr/bin/env node

'use strict'

const
  countdown = function* (count) {
    while (count > 0) {
      yield count
      count -=1
    }
  }
, counter  = countdown(process.argv[2] || 8)
, callback = () => {
  let item = counter.next()
  if (!item.done) {
    console.log(item.value)
    setTimeout(callback, 1000)
  }
}
callback()

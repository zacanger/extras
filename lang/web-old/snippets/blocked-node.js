#!/usr/bin/env node

// this is an example of how you COULD write node code,
// to make it blocking. COULD. not should. as in, don't,
// unless you have a valid reason to do so.

console.log('starting')

const start = Date.now()

for (let i = 1; i < 1000000000; i++) {}

const end = Date.now()

console.log(`done! that took ${end - start} ms.`)


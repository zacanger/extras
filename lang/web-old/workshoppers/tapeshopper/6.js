const
  tape   = require('tape')
, sinon  = require('sinon')
, fn     = require(process.argv[2])

tape('oi', (t) => {
  sinon.spy(console, 'log')
  fn()
  t.ok(console.log.withArgs('Woof!').calledOnce)
  t.ok(console.log.withArgs('Woof!').called)
  console.log.restore()
  t.end()
})


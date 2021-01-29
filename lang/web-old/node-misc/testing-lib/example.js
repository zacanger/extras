const spec = require('./runner')

spec.describe('basic test', () => {
  spec.it('should be true', () => {
    spec.assert(1 === 1)
  })
})

spec.describe('basic pending test', () => {
  spec.xit('would return true, if it actually ran', () => {
    spec.assert(1 === 1)
  })
})

spec.describe('testing before and after', () => {
  spec.before(() => {
    this.something = 'foo'
  })
  spec.it('should be \'foo\' from the before test', () => {
    spec.assert(this.something === 'foo')
  })
  spec.after(() => {
    this.something = null
  })
  spec.it('string from before should now be null', () => {
    spec.assert(this.something === null)
  })
})

spec.describe('test assert raises', () => {
  spec.it('should pass if exception thrown', () => {
    spec.assert_raises(() => {
      arr[1] = '1'
    })
  })
})

spec.summary()

// to use with multiple/external files, make a spec.js
// (or whatever) to run, containing something like the following:
// const spec = require('./runner')
// require('./testfile')
// spec.summary()

const { TestBundles } = require('./results.json')

const len = TestBundles.length

console.log('TAP version 13')
console.log(`1..${len + 1}`)

TestBundles.forEach((res, i) => {
  const isOk = res.Outcome === 'Passed'
  console.log(`${isOk ? 'ok' : 'not ok'} ${i + 1} - ${res.TestName}`)
  if (!isOk) {
    console.log('  ---')
    console.log(`  message: '${res.ExceptionMessage || ''}'`)
    console.log('stack: |')
    console.log(`${res.ExceptionStack}`)
    console.log('  ...')
  }
})

const failed = TestBundles.reduce((p, c) => p + c.Outcome === 'Passed' ? 0 : 1, 0)
console.log(`\n# failed ${failed} test`)

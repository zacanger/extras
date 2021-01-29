const addon = require('bindings')('myaddon')

const interval = setInterval(() => {
  process.stdout.write('.')
}, 50)

addon.delay(process.argv[2], () => {
  clearInterval(interval)
  console.log('Done!')
})

process.stdout.write('Waiting')

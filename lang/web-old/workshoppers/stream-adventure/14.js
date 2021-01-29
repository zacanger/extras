const { createDecipher } = require('crypto')
process.stdin.pipe(createDecipher('aes256', process.argv[2])).pipe(process.stdout)

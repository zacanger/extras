const
  http    = require('http')
, fs      = require('fs')
, request = http.get('some.file', response => {
  if (response.statusCode === 200) {
    let file = fs.createWriteStream('save.file')
    response.pipe(file)
  }
  request.setTimeout(12000, () => {
    request.abort()
  })
})

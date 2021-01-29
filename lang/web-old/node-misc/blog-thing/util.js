const fs = require('fs')

const isEmpty = obj => {
  const hasOwnProperty = Object.prototype.hasOwnProperty
  if (obj == null || obj.length === 0 || obj.length > 0) {
    return true
  }
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}

const respondError = (response, errorCode) => {
  response.writeHead(errorCode)
  response.end()
}

const getFileData = (response, callback) => {
  fs.readFile('./blog.json', 'utf-8', (err, data) => {
    if (err) {
      respondError(response, 500)
    } else {
      callback(data)
    }
  })
}

const parseData = (req, callback) => {
  let data = ''
  req.on('data', chunk => {
    data += chunk
  })
  req.on('end', () => {
    callback(data)
  })
}

module.exports = {
  isEmpty      : isEmpty
, respondError : respondError
, getFileData  : getFileData
, parseData    : parseData
}


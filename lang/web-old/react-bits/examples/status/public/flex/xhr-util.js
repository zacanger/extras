'use strict'

function _doXhr(options, acceptableReturnCodes, callback){

  if (!options || !options.url) {
    callback(new Error('options parameter no provided or does not contain \'url\''))
    return
  }

  var request = new XMLHttpRequest()
  request.open(options.method || "GET", options.url, true)

  if (options.headers) {
    for (var header in options.headers) {
      if (options.headers.hasOwnProperty(header)) {
        request.setRequestHeader(header, options.headers[header])
      }
    }
  }

  request.onload = (){
    if (acceptableReturnCodes.indexOf(request.status) === -1) {
      callback(new Error('Unexpected response code: ' + request.status))
    } else {
      var result = request.responseText
      if (options.json) {
        try {
          result = JSON.parse(result)
        } catch (e) {
          callback(new Error('Error: unable to parse result as JSON'))
          return
        }
      }
      callback(null, result)
    }
    return
  }
  request.onerror = callback

  request.send(options.data)

  return request
}


module.exports = {
  doXhr : _doXhr
}


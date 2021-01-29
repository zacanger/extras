// npm i -S request
// usage:
// github('/user/repos', callback)
// github('/repos/:user/:repo/issues', {user : user, repo : repo}, callback)

const
  qs      = require('querystring')
, request = require('request')
, github  = (path, options, callback) => {

  const
    username = 'username'
  , password = '********'
  , tokens   = path.match(/:[^\/]+/g)
  , method   = options.method || 'get'

  if (typeof options == 'function') {
    callback = options
    options  = {}
  }

  delete options.method

  tokens && tokens.forEach(token => {
    const key = token.substr(1)
    path = path.replace(token, options[key])
    delete options[key]
  })

  if (Object.keys(options).length) {
    path += '?' + qs.stringify(options)
  }

  request({
    url     : 'https://api.github.com' + path
  , json    : true
  , headers : {
      'Host'          : 'api.github.com'
    , 'Authorization' : 'Basic ' + new Buffer(username + ':' + password).toString('base64')
    }
  }, (err, response, body) => callback(err, body))
}

module.exports = github


const
  path     = require('path')
, rootPath = path.normalize(__dirname + '/../../')

module.exports = {
  development : {
    rootPath : rootPath
  , db       : 'mongodb://127.0.0.1:27017/markvi'
  , port     : process.env.PORT || 4444
  },
  production  : {
    rootPath : rootPath
  , db       : process.env.MONGOLAB_URI || 'mongodb://markvi:markvi@ds061464.mongolab.com:61464/markvi'
  , port     : process.env.PORT || 80
  }
}


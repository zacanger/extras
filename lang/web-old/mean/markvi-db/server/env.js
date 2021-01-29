var path = require('path'),
  rootPath = path.normalize(__dirname + '/../../')

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://127.0.0.1:27017/markvi',
    port: process.env.PORT || 4444
   }
 , production: {
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}


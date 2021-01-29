module.exports = {
  port           : process.env.PORT || 3000
, theme          : __dirname + '/'
, contentFolder  : __dirname + '/content'
, excerpt_length : 400
, readme         : __dirname + '/README.md'
, markdown       : {
    linkify     : true
  , breaks      : true
  , typographer : true
  }
}


var mongoose    = require('mongoose')
  , express     = require('express')
  , http        = require('http')
  , path        = require('path')
  , fs          = require('fs')
  , app         = express()
  , mongo       = 'mongodb://127.0.0.1:27017'
  , port        = 3000

mongoose.connect(mongo)

app.set('port', process.env.PORT || port)
app.set('views', __dirname + '/vw')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.cookieParser('secret'))
app.use(express.session())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

fs.readdirSync('./ctrl').forEach(function(file){
  if(file.substr(-3) == '.js'){
    route = requre('./ctrl/' + file)
    route.controller(app)
  }
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('express up at ' + app.get('port'))
})

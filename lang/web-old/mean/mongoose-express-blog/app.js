var express  = require('express')
  , posts    = require('./routes/posts')
  , staticy  = require('./routes/static')
  , mongoose = require('mongoose')
  , http     = require('http')
  , path     = require('path')
  , app      = express()
  , port     = 3000

app.engine('.html', require('ejs').__express)

app.configure(function(){
  app.set('port', process.env.PORT || port)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'html')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))
})

app.configure('development', function(){
  app.use(express.errorHandler())
})

mongoose.connect('mongodb://127.0.0.1:27017/blog')

var CommentSchema = new mongoose.Schema({
  comment: String
})

var PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [CommentSchema]
})

var Post = mongoose.model('Post', PostSchema)

app.get('/', function(req, res){
  Post.find({}, function(err, data){
    res.render('posts/index', {posts: data})
  })
})

app.get('/newpost', posts.new)

app.post('/newpost', function(req, res){
  var newpost = new Post({
    title: req.body.title,
    content: req.body.content
  })

  newpost.save(function(err, data){
    if (err) res.json(err)
    res.redirect('/')
  })

})

app.param('post', function(req, res, next, title){
  Post.find({title: title}, function(err, docs){
    req.post = docs[0]
    next()
  })
})

app.get('/p/:post', function(req, res){
  console.log('data : ', req.post)
  res.render('posts/show', {post: req.post})
})

app.post('/p/:post', function(req, res){
  Post.find({title: req.post.title}, function(err, docs){
    var post = docs[0]
    var comment = post.comments.create({comment: req.body.comment})
    post.comments.push(comment)
    post.save(function (err) {
      res.redirect('/p/' +
        req.post.title.toString('utf8'))
    })
  })
})

app.get('/about', staticy.about)

app.get('/p', function(req, res){
  Post.find({}, function(err, data){
    res.render('static/archive', {posts: data})
  })
})

http.createServer(app).listen(app.get('port'), function () {
  console.log('up and listening over at ' + app.get('port'))
})

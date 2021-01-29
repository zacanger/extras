const
  express   = require('express')
, router    = express.Router()
, mongoose  = require('mongoose')
, Post      = mongoose.model('Post')
, Comment   = mongoose.model('Comment')
, User      = mongoose.model('User')
, passport  = require('passport')
, jwt       = require('express-jwt')

// params
router.param('post', (req, res, next, id) => {
  var query = Post.findById(id)
  query.exec((err, post) => {
    if (err) {
      return next(err)
    }
    if (!post) {
      return next(new Error('nope!'))
    }
    req.post = post
    return next()
  })
})

router.param('comment', (req, res, next, id) => {
  var query = Comment.findById(id)
  query.exec((err, comment) => {
    if (err) {
      return next(err)
    }
    if (!comment) {
      return next(new Error('nuh-uh!'))
    }
    req.post = comment
    return next()
  })
})

// gets
router.get('/', (req, res, next) => {
  res.render('index', {title : 'Linkster'})
})

router.get('/posts/:post', (req, res, next) => {
  req.post.populate('comments', (err, post) => {
    if (err) {
      return next(err)
    }
    res.send(req.post)
  })
})

router.get('/posts', (req, res, next) => {
  Post.find((err, posts) => {
    if (err) {
      return next(err)
    }
    res.send(posts)
  })
})

// posts
router.post('/posts', auth, (req, res, next) => {
  var post = new Post(req.body)
  post.author = req.payload.username
  post.save((err, post) => {
    if (err) {
      return next(err)
    }
    res.send(post)
  })
})


router.post('/posts/:post/comments', auth, (req, res, next) => {
  var comment = new Comment(req.body)
  comment.post = req.post
  comment.author = req.payload.username
  comment.save((err, comment) => {
    if (err) {
      return next(err)
    }
    req.post.comments.push(comment)
    req.post.save((err, post) => {
      if (err) {
        return next(err)
      }
      res.send(coment)
    })
  })
})

router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message : 'why not try filling them all in?'})
  }
  var user = new User()
  user.username = req.body.username
  user.setPassword(req.body.password)
  user.save(function(err){
    if (err) {
      return next(err)
    }
    return res.send({token : user.generateJWT()})
  })
})

router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message : 'no really, why not finish the job?'})
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (user) {
      return res.json({token : user.generateJWT()})
    } else {
      return res.status(400).json(info)
    }
  })(req, res, next)
})

// puts
router.put('/posts/:post/upvote', auth, (req, res, next) => {
  req.post.upvote((err, post) => {
    if (err) {
      return next(err)
    }
    res.send(post)
  })
})

router.put('/posts/:post/comments/:comment', (req, res, next) => {
  req.post.upvote((err, comment) => {
    if (err) {
      return next(err)
    }
    res.send(comment)
  })
})

module.exports = router


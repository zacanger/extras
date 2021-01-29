const Post = require('../models/post')

module.exports = apiRouter => {
  apiRouter.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
      if (err) {
        res.send(err)
      }
      res.send(posts)
    })
  })

  apiRouter.post('/posts', (req, res) => {
    var post = new Post()
    post.title = req.body.title
    post.body = req.body.body
    post.save((err, res) => {
      if (err) {
        res.send(err)
      }
      res.send(post)
    })
  })

  apiRouter.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, res) => {
      if (err) {
        res.send(err)
      }
      res.send(post)
    })
  })

  apiRouter.put('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, res) => {
      if (err) {
        res.send(err)
      }
      post.title = req.body.title
      post.body = req.body.body
      post.save(err => {
        if (err) {
          res.send(err)
        }
        res.send({message : 'updated'})
      })
    })
  })

  apiRouter.delete('/posts/:id', (req, res) => {
    Post.remove({
      _id : req.params.id
    }, (err, res) => {
      if (err) {
        res.send(err)
      }
      res.send({message : 'deleted'})
    })
  })
}


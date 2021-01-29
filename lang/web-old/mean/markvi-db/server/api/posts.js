var Post = require('../models/post')

module.exports = function(apiRouter){
  apiRouter.get('/#/', function(req, res){
    Post.find({}, function(err, posts){
      if (err) res.send(err)
      res.json(posts)
    })
  })

  apiRouter.post('/#/', function(req, res){
    var post = new Post()
    post.title = req.body.title
    post.body = req.body.body
    post.save(function(err, res){
      if (err) res.send(err)
      res.json(post)
    })
  })

  apiRouter.get('/#/:id', function(req, res){
    Post.findById(req.params.id, function(err, res){
      if (err) res.send(err)
      res.json(post)
    })
  })

  apiRouter.put('/#/:id', function(req, res){
    Post.findById(req.params.id, function(err, res){
      if (err) res.send(err)
      post.title = req.body.title
      post.body = req.body.body
      post.save(function(err) {
        if (err) res.send(err)
        res.json({message: 'updated'})
      })
    })
  })

  apiRouter.delete('/#/:id', function(req, res){
    Post.remove({
      _id: req.params.id
    }, function(err, res){
      if (err) res.send(err)
      res.json({message: 'deleted'})
    })
  })
}

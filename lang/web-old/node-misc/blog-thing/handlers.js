const
  fs          = require('fs')
, querystring = require('querystring')
, nodeStatic  = require('node-static')
, directory   = new nodeStatic.Server('./public')
, util        = require('./util.js')

const serveStaticFiles = (req, res) => {
  directory.serve(req, res)
}

const getPosts = (req, res) => {
  util.getFileData(res, data => {
    const posts = JSON.parse(data)

    if (util.isEmpty(posts)) {
      util.respondError(res, 204)
    } else {
      res.writeHead(200)
      res.write(data)
      res.end()
    }
  })
}

const createPost = (req, res) => {
  util.parseData(req, data => {
    util.getFileData(res, blogData =>  {
      let existingPosts = JSON.parse(blogData)
      let newPost = querystring.parse(data)
      let time = Date.now()
      existingPosts[time] = newPost.post

      fs.writeFile('./blog.json', JSON.stringify(existingPosts, null, 4), err => {
        if (err) {
          util.respondError(res, 503)
        }
        res.writeHead(302, {'Location' : '/'})
        res.end()
      })
    })
  })
}

module.exports = {
  serveStaticFiles
, getPosts
, createPost
}


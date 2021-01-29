'use strict'

const
  fs   = require('fs')
, path = require('path')

router.post('/upload', (req, res){
  fs.readFile(req.files.image.path, (err, data) => {
    let
      dirname = path.resolve('.') + '/uploads'
    , newPath = dirname + req.files.image.originalFileName
    fs.writeFile(newPath, data, (err) => {
      if(err){
        res.json('upload failed')
      }
      else {
        res.json('upload successful')
      }
    })
  })
})

router.get('/uploads/:file', (req, res) => {
  file = req.params.file
  let
    dirname = path.resolve('.') + '/uploads'
  , img     = fs.readFileSync(dirname + file)
  res.writeHead(200, {'Content-Type' : 'image/jpeg'})
  res.end(img, 'binary')
})

router.get('/download', (req, res) => {
  let dir = path.resolve('.') + '/uploads/'
  fs.readdir(dir, (err, list) => {
    if(err){
      return res.json(err)
    }
    else {
      res.json(list)
    }
  })
})

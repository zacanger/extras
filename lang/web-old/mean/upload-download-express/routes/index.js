'use strict'

const
  express = require('express')
, router  = express.Router()
, path    = require('path')

router.get('/:file(*)', (req, res, next) => {
  let
    file     = req.params.file
  , filePath = path.resolve('.') + '/uploads/' + file
  res.download(filePath)
})

module.exports = router


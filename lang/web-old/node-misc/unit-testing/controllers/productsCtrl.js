'use strict'

const
  mongojs = require('mongojs')
, config = require('../_config')
, db = mongojs(config[process.env.NODE_ENV])
, Products = db.collection('products')
, ObjectId = mongojs.ObjectId

module.exports = {
  create(req, res, next){
    Products.insert(req.body, (err, r) => {
      if (err) {
        console.trace(err)
        res.status(500).send()
      }
      res.status(200).json(r)
    })
  }

, index(req, res, next){
    Products.find((err, r) => {
      if (err) {
        console.trace(err)
        res.status(500).send()
      }
      res.status(200).json(r)
    })
  }

, show(req, res, next){
    Products.find({_id: ObjectId(req.params.id)}, (err, r) => {
      if (err) {
        console.trace(err)
        res.status(500).send()
      }
      res.status(200).json(r)
    })
  }

, update(req, res, next){
    delete(req.body._id)
    Products.update({_id: ObjectId(req.params.id)}, {$set: req.body}, (err, r) => {
      if (err) {
        console.trace(err)
        res.status(500).send()
      } else {
        res.status(200).json(r)
      }
    })
  }

, delete(req, res, next){
    Products.remove({_id: ObjectId(req.params.id)}, (err, r) => {
      if (err) {
        console.trace(err)
        res.status(500).send()
      }
      res.status(200).json(r)
    })
  }
}


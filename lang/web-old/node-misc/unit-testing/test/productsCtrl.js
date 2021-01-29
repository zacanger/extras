'use strict'

const
  chai     = require('chai')
, config   = require('../_config')
, chaiHttp = require('chai-http')
, expect   = chai.expect
, server   = require('../server')
, mongojs  = require('mongojs')
, db       = mongojs(config[process.env.NODE_ENV])
, Products = db.collection('products')
, ObjectId = mongojs.ObjectId
, faker    = require('faker')

chai.use(chaiHttp)

const testProduct = {
  name        : faker.commerce.productName()
, price       : faker.commerce.price()
, description : faker.lorem.paragraph()
}

describe('ProductsCtrl', () => {

  before(d => {
    Products.drop(() => {
      d()
    })
  })

  afterEach(d => {
    Products.drop(() => {
      d()
    })
  })

  it('should know that true is true', () => {
    expect(true).to.equal(true)
    expect(true).not.to.equal(false)
    expect(2 + 2).to.equal(4)
  })

  it('should make and save a new product', (d) => {
    chai.request(server)
    .post('/products')
    .send(testProduct)

    .end((e, r) => {
      expect(r).to.have.status(200)
      expect(r.body).to.be.ok
      expect(r.body.name).to.equal(testProduct.name)
      expect(r.body._id).to.be.ok

      let id = r.body._id

      Products.find({_id : id}, (e, p) => {
        expect(p).to.be.ok
        expect(p[0]).to.be.a('object')
        expect(p[0]).to.have.property('description')
        expect(p[0].name).to.equal(testProduct.name)
        d()
      })

    })
  })

})


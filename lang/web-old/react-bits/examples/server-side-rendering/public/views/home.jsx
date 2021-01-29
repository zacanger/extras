'use strict'

const
  React  = require('react')
, Layout = require('./layout')

module.exports = React.createClass({
  render(){
    return (
      <Layout {...this.props}>
        <h2>home</h2>
        <p>example text</p>
      </Layout>
    )
  }
})

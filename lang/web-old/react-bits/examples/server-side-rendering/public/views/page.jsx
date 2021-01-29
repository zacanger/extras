'use strict'

const
  React  = require('react')
, Layout = require('./layout')

module.exports = React.createClass({
  render(){
    return (
      <Layout {...this.props}>
        <h2>page</h2>
        <p>this is a page. it is rendered on the server.</p>
      </Layout>
    )
  }
})

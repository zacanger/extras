'use strict'

const
  React  = require('react')
, Router = require('react-router')
, Layout = require('./layout')
, Nav    = require('./nav')

module.exports = React.createClass({
  render(){
    return (
      <Layout {...this.props} addBundle='true'>
        <Nav {...this.props} />
        <Router.RouteHandler {...this.props} />
      </Layout>
    )
  }
})

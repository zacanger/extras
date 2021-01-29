'use strict'

const
  React    = require('react')
, Router   = require('react-router')
, Route    = Router.Route
, SPA      = require('./views/spa')
, Section1 = require('./views/section1')
, Section2 = require('./views/section2')
, Section3 = require('./views/section3')
, routes   = module.exports = (
  <Route path='/spa' handler={SPA}>
    <Route name='section1' handler={Section1} />
    <Route name='section2' handler={Section2} />
    <Route name='section3' handler={Section3} />
    <Router.DefaultRoute   handler={Section1} />
  </Route>
)

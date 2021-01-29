'use strict'

import React    from 'react'
import {
  Router
, Route
, IndexRoute
, Redirect
}               from 'react-router'
import Layout   from './views/layout.jsx'
import ListPage from './views/list.jsx'

const routes = module.exports = (
  <Router>
    <Route path='/' component={Layout}>
      <IndexRoute component={ListPage} />
      <Redirect from='/gohome' to='/' />
    </Route>
  </Router>
)


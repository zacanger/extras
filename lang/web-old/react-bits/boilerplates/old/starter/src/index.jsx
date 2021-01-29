import React         from 'react'
import ReactDOM      from 'react-dom'
import {
  browserHistory
, ReactRouter
, Router
, Route
}                    from 'react-router'
import createHistory from 'history/lib/createHashHistory'
import App           from './components/App'

let history = createHistory({queryKey : false})

ReactDOM.render((
  <Router history={history}>
    <Route path="/app" component={App} />
  </Router>
), document.getElementById('root'))


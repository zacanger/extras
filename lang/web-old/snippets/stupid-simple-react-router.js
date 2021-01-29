import React from 'react'
import { render as domRender } from 'react-dom'
import Foo from './foo'
import Bar from './bar'

const handleLinkClick = (to) => (event) => {
  event.preventDefault()
  window.history.pushState(null, null, to)
  window.dispatchEvent(new window.PopStateEvent('popstate'))
}

export const Link = ({ to, children, ...rest }) => (
  <a href={to} onClick={handleLinkClick(to)} {...rest}>{children}</a>
)

export const render = (App) => {
  const renderApp = (path) => {
    domRender(
      <App path={path} />,
      document.querySelector('main')
    )
  }

  window.addEventListener('popstate', () => {
    renderApp(window.location)
  })

  // initial render
  renderApp(window.location)
}

const routes = {
  foo: () => <Foo />,
  bar: ({ params, search }) => <Bar params={params} search={search} />
}

const queryToObject = (search) => {
  const ps = {}
  search
    .substring(1)
    .split('&')
    .forEach((p) => {
      const [ k, v ] = p.split('=')
      ps[k] = decodeURIComponent(v)
    })
  return ps
}

export const parsePath = (location) => {
  const [ route, ...params ] = location.pathname.split('/').filter(Boolean)
  const search = location.search ? queryToObject(location.search) : {}
  return { route, params, search }
}

export const router = (props) => {
  const { route, params, search } = parsePath(props)
  return routes[route]({ params, search })
}

export const App = (props) => (
  <div>
    {router(props)}
  </div>
)

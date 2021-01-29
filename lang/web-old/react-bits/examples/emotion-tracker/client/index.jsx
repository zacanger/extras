const
  React                 = require('react/addons')
, Router                = require('react-router')
, {Route, DefaultRoute} = Router
, Immutable             = require('immutable')
, Cursor                = require('immutable/contrib/cursor')
, App                   = require('./components/app')
, NewHappyTrack         = require('./components/new-happy-track')
, EditHappyTrack        = require('./components/edit-happy-track')

let cursor, handler

const entries = Immutable.fromJS([
  {why : 'Someone told me I had a big nose', emotion : 0, date : new Date()}
, {why : 'I got to talk about React!'      , emotion : 3, date : new Date()}
])

const cursorChanged = (newState, oldState, path) => {
  cursor = Cursor.from(newState, cursorChanged)
  render(handler, cursor)
}
cursor = Cursor.from(entries, cursorChanged)

const Empty = React.createClass({
  render() {
    return (
      <p>Select an entry or create a new one.</p>
    )
  }
})

const routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Empty} />
    <Route name="new" path="entries/new" handler={NewHappyTrack} />
    <Route name="show" path="entries/:id" handler={EditHappyTrack} />
  </Route>
)

Router.run(routes, (h, state) => {
  handler = h
  render(handler, cursor)
})

const render = (Handler, cursor) => {
  React.render(<Handler cursor={cursor} />, document.body.querySelector('.app'))
}

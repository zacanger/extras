'use stict'

const
  Dispatcher    = require('flux').Dispatcher
, AppDispatcher = new Dispatcher()

AppDispatcher.handleViewAction = action => {
  this.dispatch({
    source : 'VIEW_ACTION'
  , action : action
  })
}

module.exports = AppDispatcher

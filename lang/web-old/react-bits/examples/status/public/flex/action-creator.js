'use strict'

const
  AppDispatcher    = require('./dispatcher')
, ServiceConstants = require('./action-constants')

const ServiceActions = {
  fetchItems(data){
    AppDispatcher.handleViewAction({
      actionType : ServiceConstants.FETCH_ITEMS
    , data       : data
    })
  }
, serviceStatusUpdate(data){
    AppDispatcher.handleViewAction({
      actionType : ServiceConstants.SERVICE_STATUS_UPDATE
    , data       : data
    })
  }
}

module.exports = ServiceActions

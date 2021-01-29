'use strict'

const
  Constants     = require('./action-constants')
, EventEmitter  = require('events').EventEmitter
, AppDispatcher = require('./dispatcher')
, XhrUtils      = require('./xhr-util')
, EVENT_CHANGE  = 'items'
, emitter       = new EventEmitter()

let
  listeningForSocket = false
, items

const ItemStore = {
  getItems(type){
    return items
  }
, emitChange(data){
    emitter.emit(EVENT_CHANGE, data)
  }
, addChangeListener(callback){
    emitter.on(EVENT_CHANGE, callback)
  }
, removeChangeListener(callback){
    emitter.removeListener(EVENT_CHANGE, callback)
  }
}

module.exports = ItemStore

function fetchItems(url){
  if (!url) {
    console.warn('Cannot fetch items - no URL provided')
    return
  }

  XhrUtils.doXhr({url : url, json : true}, [200], (err, result) => {
    if (err) {
      console.warn('Error fetching assets from url: ' + url)
      ItemStore.emitChange(Constants.STATE_ERROR)
      return
    }

    items = result
    ItemStore.emitChange(Constants.ITEMS)
  })
}

function serviceStatusUpdate(data){
  for (let i in data) {
    let s = data[i]
    _updateStatus(s)
  }
  ItemStore.emitChange(Constants.ITEMS)
}

function _updateStatus(s){
  for (let i in items) {
    let item = items[i]
    if (item.id === s.id) {
      item.status = s.status
      break
    }
  }
}

AppDispatcher.register(payload => {
  let action = payload.action
  switch (action.actionType) {
    case Constants.SERVICE_STATUS_UPDATE:
      serviceStatusUpdate(action.data)
      break
    case Constants.FETCH_ITEMS:
      fetchItems(action.data)
      break
    default:
      return true
  }
  return true
})


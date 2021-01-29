var Firebase = require('firebase')
  , api = new Firebase('https://hacker-news.firebaseio.com/v0')
  , storiesPerPage = 30
  , cachedIds = []
  , Emitter = require('events').EventEmitter
  , store = module.exports = new Emitter()

api.child('topstories').on('value', function (snapshot){
  cachedIds = snapshot.val()
  store.emit('update')
})

store.fetchItem = function(id, cb){
  api.child('item/' + id).once('value', function(snapchot){
    cb(snapchot.val())
  })
}

store.fetchUser = function(id, cb){
  api.child('user/' + id).once('value', function(snapshot){
    cb(snapshot.val())
  })
}

store.fetchItems = function(ids, cb){
  if (!ids || !ids.length) return cb([])
  var items = []
  ids.forEach(function(id){
    store.fetchItem(id, addItem)
  })
  function addItem(item){
    items.push(item)
    if (items.length >= ids.length){
      cb(items)
    }
  }
}

store.fetchItemsByPage = function(page, cb){
  var start = (page - 1) * storiesPerPage
    , end = page * storiesPerPage
    , ids = cachedStoryIds.slice(start, end)
  store.fetchItems(ids, cb)
}

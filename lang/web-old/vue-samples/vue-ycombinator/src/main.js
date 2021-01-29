var Vue = require('vue')
  , Router = require('director').Router
  , app = new Vue(require('./app.vue'))
  , router = new Router()

router.on('/news/:page', function(page){
  window.scrollTo(0, 0)
  app.view = 'news-view'
  app.params.page = +page
})

router.on('/user/:id', function(id){
  window.scrollTo(0, 0)
  app.view = 'user-view'
  app.params.userId = id
})

router.on('/item/:id', function(id){
  window.scrollTo(0, 0)
  app.view = 'item-view'
  app.params.itemId = id
})

router.configure({
  notfound: function(){
  router.setRoute('/news/1')
  }
})

router.init('/news/1')

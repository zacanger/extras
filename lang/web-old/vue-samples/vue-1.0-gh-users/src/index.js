import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Users from './components/Users.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  '/users': {
    component: Users
  },
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')

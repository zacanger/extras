import Vue      from 'vue'
import Resource from 'vue-resource'
import Router   from 'vue-router'
import App      from './components/App.vue'
import Home     from './components/Home.vue'
import About    from './components/About.vue'
import Quote    from './components/Quote.vue'
import scss     from './stylesheets/app.scss'

Vue.use(Router)
Vue.use(Resource)

const router = new Router()

router.map({
  '/home'  : {
    name      : 'home'
  , component : Home
  }
, '/about' : {
    name      : 'about'
  , component : About
  }
, '/quote' : {
    name      : 'quote'
  , component : Quote
  }
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

router.redirect({'*' : '/home'})

router.start(App, '#app')


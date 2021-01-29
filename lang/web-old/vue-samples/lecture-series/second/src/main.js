import Vue from 'vue'
import App from './App.vue'
import store from './index.js'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})

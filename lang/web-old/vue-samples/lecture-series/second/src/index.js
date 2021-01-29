import Vue from 'vue'
import Vuex from 'vuex'
import count from './count'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    count
  }
})

export default store

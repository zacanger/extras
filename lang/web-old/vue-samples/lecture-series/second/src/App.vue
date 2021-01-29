<template>
  <div id="app">
    <div> {{ msg }} </div>
    <button @click="increment">+</button>
    <button @click="reset">0</button>
    <button @click="decrement">-</button>
    <hr>
    <input type="text" v-model="number" placeholder="0">
    <button @click="setExact"></button>
    <hr>
    <second></second>
  </div>
</template>

<script>
import Second from './Second.vue'
import { mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    Second
  },
  data () {
    return {
      msg: 'click the things',
      number: 1
    }
  },
  computed: {
    count () {
      return this.$store.state.count.count
    }
  },
  methods:
    Object.assign({}, mapActions([
      'increment',
      'reset',
      'decrement',
      'setExact'
    ]))
    /*
    increment () {
      this.$store.dispatch('increment')
    },
    reset (_) {
      this.$store.dispatch('reset')
    },
    decrement (_) {
      this.$store.dispatch('decrement')
    },
    setExact (_) {
      this.$store.dispatch('setExact', this.number)
    }
    */

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

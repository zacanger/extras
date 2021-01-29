<template>
  <div>
    <span>yo, {{ group }}</span>
    <button v-on:click="changeGroup">
      change group
    </button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      group: '',
      groups: [
        'WA$$UP',
        'SNSD',
        'Loona',
        'Blackpink'
      ]
    }
  },

  mounted () {
    this.changeGroup()
  },

  methods: {
    changeGroup () {
      this.group = this.groups[this.getRand()]
    },
    getRand () {
      return Math.floor(Math.random() * this.groups.length)
    }
  }

}
</script>

<template>
  <div>second component: {{ count }}</div>
</template>

<script>
export default {
  name: 'second',
  computed: {
    count () {
      return this.$store.state.count.count
    }
  }
}
</script>

<style>
</style>

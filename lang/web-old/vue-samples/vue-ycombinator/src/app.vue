<style lang="stylus">

@import "src/shared.styl"
html, body
  font-family monospace
  font-size 14px
  margin 0
  height 100%
  background-color $bg

ul
  list-style-type none
  padding 0
  margin 0

a
  color #000
  cursor pointer
  text-decoration none

#header
  background-colour #f60
  height 24px
  position relative
  h1
    font-weight bold
    font-size 14px
    display inline-block
    vertical-align middle
    margin 0
  .source
    color #fff
    font-size 12px
    position absolute
    top 4px
    right 4px
    a
      color #fff
      &:hover
        text-decoration underline

#yc
  border 1px solid #fff
  margin 2px
  display inline-block
  vertical-align middle
  img
    viertical-align middle

.view
  position absolute
  width 100%
  transition opacity .1s ease
  box-sizing border-box
  padding 8px 20px
  &.v-enter, &.v-leave
    opacity 0

</style>


<template>

<div id="header">
  <a id="yc" href="http://www.ycombinator.com">
    <img src="https://news.ycombinator.com/y18.gif">
  </a>
  <h1><a href="#">Hacker News</a></h1>
  <span class="source">
    This clone built with <a href="http://vuejs.org">Vue</a>
  </span>
</div>

<div v-component="{{view}}" v-with="params:params" v-transition></div>

</template>


<script>

module.exports = {
    el: '#app'
  , data: {
      view: ''
    , params: {
        page: 1
      , userId: null
      , itemId: null
      }
    },
    filters: {
      fromNow: require('/filters/from-now')
    , domain: require('/filters/domain')
    },
    components: {
      'news-view': require('./views/news-view.vue')
    , 'item-view': require('./views/item-view.vue')
    , 'user-view': require('./views/user-view.vue')
    }
}

</script>
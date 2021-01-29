var apiUrl = 'https://api.github.com/repos/pharaoh-js/pharaoh-desktop/commits?per_page=8&sha='

var gh = new Vue({

  el : '#gh',

  data : {
    branches      : ['master', 'nwjs', 'refspropswhatsits']
  , currentBranch : 'nwjs'
  , commits       : null
  },

  created : function(){
    this.fetchData()
  },

  watch : {
    currentBranch : 'fetchData'
  },

  filters : {
    truncate : function(v){
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate : function(v){
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods : {
    fetchData : function(){
      var xhr  = new XMLHttpRequest()
        , self = this
      xhr.open('GET', apiUrl + self.currentBranch)
      xhr.onload = function(){
        self.commits = JSON.parse(xhr.responseText)
      }
      xhr.send()
    }
  }

})


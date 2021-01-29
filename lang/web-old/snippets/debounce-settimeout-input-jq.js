// it's been forever since i've even touched jquery,
// or even used the function keyword, wow.
$(document).ready(function(){
  $('input').keypress(function(){
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId)
    }
    this.timeoutId = window.setTimeout(function(){
      $.ajax({
        // do things
      }, 100)
    })
  })
})

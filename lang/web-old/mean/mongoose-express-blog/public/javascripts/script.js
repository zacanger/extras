;(function($){
  $(document).ready(function(){
    console.log('jquery ready')
    $('#comment').hide()
    $('.toggle-comments').click(function(){
      $('.post-comments').toggle()
    })
  })
  $('.toggle-form').click(function(){
    $('#comment').toggle()
  })
})(jQuery)

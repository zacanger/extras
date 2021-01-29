$document.ready(function(){
  checkSize()
  $(window).resize(checkSize)
})

function checkSize(){
  if ('.someClass').css('color') != 'thing'){
    $('#initial').detach().appendTo('#eventual')
  }
}

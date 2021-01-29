// assumes :
// <div><textarea></textarea>
// <span>140</span>
// </br>
// <button class="pic">pic</button>
// <button class="yay" disabled>yay</button>
// </div>

// disabled button
// $('button').prop('disabled', true)

// enabled when there's text
// $('textarea').on('input', function () {
//
  // if ($('.pic').hasClass('on')) {
    // $('span').text(140 - 23 - $(this).val().length)
  // } else {
    // $('span').text(140 - $(this).val().length)
  // }
//
  // if ($(this).val().length > 0 || $('.pic').hasClass('on')) {
    // $('.yay').prop('disabled', false)
  // } else {
    // $('.yay').prop('disabled', true)
  // }
// })
//
// $('.pic').on('click', function(){
  // if ($(this).hasClass('on')) {
    // $(this).removeClass('on').text('.add')
    // $('span').text(140 - $('textarea').val().length)
    // if ($('textarea').val().length === 0) {
      // $('.yay').prop('disabled', true)
    // }
  // } else {
    // $(this).addClass('on').text('added')
    // $('span').text(140 - 23 - $('textarea').val().length)
    // $('.yay').prop('disabled', false)
  // }
// }
//

$('textarea').on('input', update)

$('.pic').on('click', function(){
  if ($(this).hasClass('on')) {
    $(this).removeClass('on').text('add')
  } else {
    $(this).addClass('on').text('added')
  }
  update()
})

function update(){
  var extra = ($('.pic').hasClass('on') ? 23 : 0)
  $('span').text(140 - extra - $('textarea').val().length)

  var disabled = !($('textarea').val().length > 0 || $('.pic').hasClass('on'))
  $('.yay').prop('disabled', disabled)
}


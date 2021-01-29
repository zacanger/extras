// if we have some elements like this:
// <div id="some-view" class="view"></div>
// <div id="what-view" class="view"></div>
// we can do something like this:
function showView(selected){
  window.location.hash = '#' + selected
  $('.view').hide().filter('#' + selected + '-view').show()
}
// which can be called with something like this:
showView('some-view')
// . and to make this work on manual url change, we should add:
$(window).on('hashchange', function(event){
  var view = (window.location.hash || '').replace(/^#/, '')
  if ($('#' + view + '-view').length) {
    showView(view)
  }
})


// <a href="#" onclick="toggle_visibility('foo');">Click here to toggle visibility of element #foo</a>
// <div id="foo">This is foo</div>

function toggle_visibility (id) {
  var e = document.getElementById(id)
  if (e.style.display == 'block') {
    e.style.display = 'none'
  } else {
    e.style.display = 'block'
  }
}


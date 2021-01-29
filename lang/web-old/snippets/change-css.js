(function(){
  // assumes an element like `<div id="theme-select"></div>`
  // and that the theme will be the first `link` element in the page
  var
    themes      = ['nameoftheme', 'another', 'etc', 'whatever']
  , themeSelect = document.getElementById('theme-select')
  , ss          = document.head.getElementsByTagName('link')[0]
  , a           = themeSelect.appendChild(document.createElement('a'))
  , select      = themeSelect.appendChild(document.createElement('select'))

  for(var i = 0; i < themes.length; i++){
    var opt = select.appendChild(document.createElement('option'))
    opt.innerHTML = themes[i]
  }

  function change(val){
    var theme = val
    a.innerHTML = a.href = ss.href = theme + '/default.css'
  }

  select.onchange = function(){
    change(select.value)
  }

  change('nameoftheme')

})


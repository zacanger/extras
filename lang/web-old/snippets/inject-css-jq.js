function injectStyles(rule) {
  var div = $('<div />', {
    html : '&shy;<style>' + rule + '</style>'
  }).appendTo('body')
}

// example
injectStyles('a:hover {color : red;}')


var HTMLVal = HTMLVal || {}

HTMLVal.validHTMLElements = [
  'a'
, 'abbr'
, 'acronym'
, 'address'
, 'applet'
, 'area'
, 'article'
, 'aside'
, 'audio'
, 'b'
, 'base'
, 'basefont'
, 'bdi'
, 'bdo'
, 'bgsound'
, 'big'
, 'blink'
, 'blockquote'
, 'body'
, 'br'
, 'button'
, 'canvas'
, 'caption'
, 'center'
, 'cite'
, 'code'
, 'colgroup'
, 'del'
, 'details'
, 'dfn'
, 'dir'
, 'div'
, 'dl'
, '!doctype'
, 'dt'
, 'em'
, 'embed'
, 'fieldset'
, 'figcaption'
, 'figure'
, 'font'
, 'footer'
, 'form'
, 'frame'
, 'h1'
, 'h2'
, 'h3'
, 'h4'
, 'h5'
, 'h6'
, 'head'
, 'header'
, 'hgroup'
, 'hr'
, 'html'
, 'i'
, 'iframe'
, 'img'
, 'input'
, 'ins'
, 'kbd'
, 'keygen'
, 'label'
, 'legend'
, 'li'
, 'link'
, 'listing'
, 'main'
, 'map'
, 'mark'
, 'marquee'
, 'menu'
, 'meta'
, 'meter'
, 'nav'
, 'noscript'
, 'object'
, 'ol'
, 'optgroup'
, 'option'
, 'output'
, 'p'
, 'param'
, 'plaintext'
, 'pre'
, 'progress'
, 'q'
, 'ruby'
, 's'
, 'samp'
, 'script'
, 'section'
, 'select'
, 'small'
, 'source'
, 'span'
, 'strike'
, 'strong'
, 'style'
, 'sub'
, 'summary'
, 'sup'
, 'table'
, 'tbody'
, 'td'
, 'textarea'
, 'tfoot'
, 'th'
, 'thead'
, 'time'
, 'title'
, 'tr'
, 'track'
, 'tt'
, 'u'
, 'ul'
, 'var'
, 'video'
, 'wbr'
, 'xmp'
]

HTMLVal.missingClosingBracket = {
  'regex'   : new RegExp('(<[^>]+<)', 'g')
, 'message' : 'no matching closing bracket'
}

HTMLVal.invalidHTMLElement = {
  'regex'   : new RegExp('(<(?!/\?' + HTMLVal.validHTMLElements.join('\\b|/\?') + '\\b)[^ \n>]+)', 'gi')
, 'message' : 'opening tag without valid element name'
}

HTMLVal.missingEquals = {
  'regex'   : new RegExp('(<[^=>]+[\'"]\\S+[\'"]([^>]*>)?)', 'g')
, 'message' : 'attribute missing equals sign'
}

HTMLVal.missingQuoteAfterEquals = {
  'regex'   : new RegExp('( [^"\']+=[^\'"]+[\'"])[ >]', 'g')
, 'message' : 'equals sign on attr missing quote'
}

HTMLVal.missingQuoteAtEndOfAttribute = {
  'regex'   : new RegExp('(\\S+=[\'"][^\'">]+(>|[\'"][^ />]))', 'g')
, 'message' : 'attr missing ending quote'
}

HTMLVal.errors = [
  HTMLVal.missingQuoteAtEndOfAttribute
, HTMLVal.missingQuoteAfterEquals
, HTMLVal.missingClosingBracket
, HTMLVal.missingEquals
, HTMLVal.invalidHTMLElement
]

HTMLVal.getPageSource = function (callback) {
  return $.get(window.location.href, function (data) {
    callback(data)
  })
}

HTMLVal.insertErrorDiv = function () {
  var list = $("<ul id='HTMLVal-errors-list'></ul>").css({
    padding : 0
  , margin  : 0
  })
  var $div = $("<div id='HTMLVal-errors'/>").css({
    backgroundColor : '#431D1D'
  , padding         : '8px 16px'
  , border          : '1px solid #121212'
  , borderRadius    : '4px'
  , color           : '#F95027'
  , fontFamily      : 'monospace'
  , fontSize        : '16px'
  , marginBottom    : '4px'
  })
  $div.append(list)
  $('body').prepend($div)
}

HTMLVal.htmlEscapes = {
  '&' : '&amp;'
, '<' : '&lt;'
, '>' : '&gt;'
, '"' : '&quot;'
, "'" : '&#x27;'
, '/' : '&#x2F;'
}

HTMLVal.htmlEscaper = /[&<>"'\/]/g

// escape str for HTML interpolation
HTMLVal.escapeHTML = function (unsafe) {
  return ('' + unsafe).replace(HTMLVal.htmlEscaper, function (match) {
    return HTMLVal.htmlEscapes[match]
  })
}

HTMLVal.appendError = function (error) {
  $('#HTMLVal-errors-list').append($('<li>' + error.errorString +
      ': <code>' + HTMLVal.escapeHTML(error.error) +
      '</code> on line ' + error.line + '</li>'))
}

HTMLVal.showErrors = function (errorsList) {
  if (errorsList.length === 0) {
    return
  }
  HTMLVal.insertErrorDiv()
  for (var i = 0; i < errorsList.length; i++) {
    HTMLVal.appendError(errorsList[i])
  }
}

HTMLVal.getErrorLines = function (idx, html) {
  var lines = html.split('\n')
    , count = 0

  for (var i = 0; i < lines.length; i++) {
    count = count + lines[i].length
    if (idx <= count) {
      return i + 1
    }
  }
  return lines.length

}

HTMLVal.stripComments = function (html) {
  return html.replace(/<!--([\s\S]*)--(\s*)>/g, '')
}

// dumb... won't get dynamically inserted scripts or anything.
HTMLVal.stripTag = function (html, tagName) {
  return html.replace(new RegExp(
    '<' + tagName + '[^>]*>([\\s\\S]*)</' + tagName + '>', 'g'), '')
}

// this should return errorsList & delegate to another fn to render
HTMLVal.evaluateHTML = function (html) {
  var result
    , errorsList      = []
    , noScripts       = HTMLVal.stripTag(html, 'script')
    , noStyles        = HTMLVal.stripTag(noScripts, 'style')
    , commentFreeHtml = HTMLVal.stripComments(noStyles)

  for (var i = 0; i < HTMLVal.errors.length; i++) {
    var error = HTMLVal.errors[i]
    while ((result = error.regex.exec(commentFreeHtml)) !== null) {
      errorsList.push({
        'errorString' : error.message
      , 'error'       : result[1]
      , 'line'        : HTMLVal.getErrorLines(html.indexOf(result[1]), html)
      , 'html'        : html
      })
    }
  }
  HTMLVal.showErrors(errorsList)
}

$(function () {
  if (!HTMLVal.test) {
    HTMLVal.getPageSource(HTMLVal.evaluateHTML)
  }
})


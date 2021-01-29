function addLinksNumber (html, links, linkCounter) {
  var tree = $('<div>' + html + '</div>')
  tree.find('a').each(function (i) {
    var href = $(this).attr('href')
    var text = $(this).text()
    text = text.replace(/\t+/g, '\n')
    if (isAlphanumeric(text)) {
      if (links[linkCounter].indexOf(href) === -1) {
        links[linkCounter].push(href)
      }
      $(this).html('[' + linkCounter + '] ' + text)
      linkCounter++
      links[linkCounter] = []
    }
  })
  return tree
}

function isEmpty (str) {
  if (str === undefined || str === null) {
    return true
  }
  return (/^[ \t\s]*$/).test(str)
}

function isAlphanumeric (str) {
  return (/[0-9a-zA-Z]+/).test(str)
}

function inlineString (str) {
  str = str.replace(/(\r\n|\n|\r)/gm, ' ')
  return str.replace(/[\s]+/gm, ' ')
}

function extractPlainText (obj) {
  var ni = document.createNodeIterator(obj[0], NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, false)
  var nodeLine = ni.nextNode() // go to first node of our NodeIterator
  var plainText = ''
  var tabbed = false
  while (nodeLine) {
    var text = nodeLine.nodeValue
    var isDiv = nodeLine.nodeName === 'DIV' || nodeLine.nodeName === 'TR' || nodeLine.nodeName === 'BR'

    if (!isEmpty(text)) {
      plainText += inlineString(nodeLine.nodeValue) + ' '
    }
    if (isDiv) {
      plainText += '\n'
    }
    nodeLine = ni.nextNode()
  }
  plainText = plainText.replace(/(\r\n|\n|\r){2,}/g, '\n\n')
  return plainText
}

function addLinks (str, links, linkCounter) {
  var linkCount = 1
  var strBuf = ''
  var i = 0
  while (i < str.length) {
    var j = str.indexOf('\n', i)
    if (j == -1) j = str.length
    var line = str.substr(i, j - i)
    var hasLink = true
    var linkLines = []
    while (hasLink) {
      hasLink = line.indexOf('[' + linkCount + ']') != -1
      if (hasLink) {
        linkLines.push(linkCount)
        linkCount++
      }
    }
    strBuf += line
    if (linkLines.length > 0) {
      strBuf += '\n Links\n'
      for (var k = 0; k < linkLines.length; k++) {
        var linksUrl = links[linkLines[k]]
        for (var l = 0; l < linksUrl.length; l++) {
          strBuf += '  ' + linkLines[k] + ' - ' + linksUrl[l] + '\n'
        }
      }
    }
    strBuf += '\n'
    i = j + 1
  }

  return strBuf
}

function getTextFromHTML (html, links, linkCounter) {
  var links = []
  var linkCounter = 1
  links[linkCounter] = []
  var treeHtml = addLinksNumber(html, links, linkCounter)
  var text = extractPlainText(treeHtml)
  text = addLinks(text, links, linkCounter)
  return text
}

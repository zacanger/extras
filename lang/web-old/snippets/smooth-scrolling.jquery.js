/** =smooth scrolling for same-page links.
************************************************************/

$(document).ready(function () {
  var locationPath = filterPath(location.pathname)
  $('body').click(function (event) {
    var $link = $(event.target).closest('a')

    // stop if it's not a link
    if (!$link.length || $link.parent().is('.reply')) { return; }

    var link = $link[0]
    var thisPath = filterPath(link.pathname) || locationPath
    if (locationPath == thisPath
      && (location.hostname == link.hostname || !link.hostname)
      && link.hash.replace(/#/, '')) {
      event.preventDefault()
      var $target = $(link.hash), target = link.hash
      if ($target.length) {
        var targetOffset = $target.offset().top

        rootScroller().animate({scrollTop: targetOffset}, 400, function () {
          location.hash = target
        })
      }
    }

  })

  function filterPath (string) {
    return string.replace(/^\/|(index|default).[a-zA-Z]{3,4}$|\/$/g, '')
  }

  function rootScroller () {
    var $html = $('html')
    if ($html.scrollTop() > 0) {
      return $html
    }
    var $body = $('body')
    if ($body.scrollTop() > 0) {
      return $body
    }

    if ($html.scrollTop(1) && $html.scrollTop() === 1) {
      $html.scrollTop(0)
      return $html
    } else if ($body.scrollTop(1) && $body.scrollTop() === 1) {
      $body.scrollTop(0)
      return $body
    } else {
      return $({})
    }
  }

})

// search form label thing 
$(document).ready(function () {
  var $s = $('#s')
  var searchLabel = $('#searchform label').hide().text()

  function restoreSearch () {
    if ($s.val() == '') {
      $s.val(searchLabel)
    }
    if ($s.val() == searchLabel) {
      $s.addClass('faded')
    }
  }

  restoreSearch()

  $s.focus(function () {
    $s.removeClass('faded')
    if ($s.val() == searchLabel) {
      $s.val('')
    }
  })
    .blur(restoreSearch)

})

/** ===reply to comment
************************************************************
************************************************************/

$(document).ready(function () {
  var $respond = $('#respond'),
    $closeReply = $('<a href="#" id="close-reply">close and cancel</a>'),
    $respondPlaceholder = $('<div id="respond-placeholder"></div>')

  $(document).click(function (event) {
    var $eventTarget = $(event.target)
    if ($eventTarget.parent().is('.reply')) {
      var replytocom = event.target.search.split('=')
      if ((/replytocom/).test(replytocom[0])) {
        var $parentDiv = $eventTarget.parent().parent(),
          replytoname = $parentDiv.find('cite.fn').text(),
          rHeight = $respond.height(),
          rWidth = $respond.width()
        if (!$eventTarget.data('position')) {
          $eventTarget.data('position', {
            left: event.pageX,
            top: event.pageY + 10,
            width: rWidth + 'px'
          })
        }

        $respondPlaceholder.height(rHeight)
        $respond
          .hide()
          .addClass('replying').css($eventTarget.data('position'))
          .fadeIn(200)
        $closeReply
          .appendTo($respond)
          .attr('title', 'close and cancel reply to ' + replytoname)
          .click(function () {
            $(this).remove()
            $respondPlaceholder.remove()
            $respond.removeClass('replying').children('h3:first').text('Leave a Reply')
            $('#comment_parent').val('')
            return false
          })
        $respondPlaceholder.insertAfter('#respond')
        $respond.children('h3:first').text('Leave a Reply to ' + replytoname)
        $('#comment_parent').val(replytocom[1])
        if (document.getElementById('author')) {
          $('#author')[0].focus()
        } else {
          $('#comment')[0].focus()
        }
        return false
      }
    }
  })

})

// Add social bookmark links to each entry
$(document).ready(function () {
  if (typeof $.fn.socialize != 'undefined') {
    $('div.post').first().socialize()
  }

  if ($('a.iframe').length) {
    $('a.iframe').each(function (index) {
      var $iframe = $('<iframe></iframe>', {
        src: this.href,
        style: $(this).attr('data-style')
      })
      $(this).replaceWith($iframe)
    })
  }
})

// auto page contents
// $(document).ready(function() {
//   var $h2links = $('#content h2:has(a)')
//   if ( $h2links.length > 1) {
//     $('<div id="page-contents"></div>')
//       .prepend('<h3>Page Contents</h3>')
//       .append('<div></div>')
//       .prependTo('body')
//       
//     var thisId = ''
//     $h2links.each(function(index) {
//       $this = $(this)
//       thisId = this.id
//       $this
//         .clone()
//         .find('a')
//           .attr({
//             'title': 'jump to ' + $this.text(), 
//             'href': '#' + thisId
//           })
//         .end()
//         .attr('id', 'pc-' + index)
//         .appendTo('#page-contents div')
//     })
//       
//     $('#page-contents h3').click(function() {
//       $(this).toggleClass('arrow-down')
//         .next().slideToggle('fast')
//     })
//   }
// })

var refreshButton          = document.querySelector('.refresh')
  , refreshClickStream     = Rx.Observable.fromEvent(refreshButton, 'click')
  , close1Button           = document.querySelector('.close1')
  , close1ClickStream      = Rx.Observable.fromEvent(close1Button, 'click')
  , close2Button           = document.querySelector('.close2')
  , close2ClickStream      = Rx.Observable.fromEvent(close2Button, 'click')
  , close3Button           = document.querySelector('.close3')
  , close3ClickStream      = Rx.Observable.fromEvent(close3Button, 'click')

// var startupRequestStream   = Rx.Observable.just('https://api.github.com/users')
// var requestOnRefreshStream = refreshClickStream
// .map(function(){
//   var randomOffset = Math.floor(Math.random()*500)
//   return 'https://api.github.com/users?since=' + randomOffset
// })
// var requestStream = Rx.Observable.merge(
//   requesetOnRefreshStream, startupRequestStream
// )
// the above can be replaced by:

// var requestStream = refreshClickStream
//   .map(function(){
//     var randomOffset = Math.floor(Math.random()*500)
//     return 'https://api.github.com/users?since=' + randomOffset
//   })
//   .merge(Rx.Observable.just('https://api.github.com/users'))
// oh wait! we can replace THIS with:

// var requestStream = refreshClickStream
//   .map(function(){
//     var randomOffset = Math.floor(Math.random()*500)
//     return 'https://api.github.com/users?since=' + randomOffset
//   })
//   .startWith('https://api.github.com/users')
// omfg but we can do this better, hold on

var requestStream = refreshClickStream.startWith('startup click')
  .map(function(){
    var randomOffset= Math.floor(Math.random()*500)
    return 'https://api.github.com/users?since=' + randomOffset
  })

var responseStream = requestStream
  .flatMap(function(requestUrl){
    return Rx.Observable.fromPromise($.ajax({url: requestUrl}))
})

// var suggestion1Stream = responseStream
  // .map(function(listUsers){
  //   return listUsers[Math.floor(Math.random()*listUsers.length)]
  // })
  // .merge(
  //   refreshClickStream.map(function(){
  //     return null
  //   })
  // )
  // .startWith(null)
// we're gonna go ahead and replace this bit, because now we know
// about combineLatest()

function createSuggestionStream(closeClickStream){
  return closeClickStream.startWith('startup click')
    .combineLatest(responseStream,
      function(click, listUsers){
        return listUsers[Math.floor(Math.random()*listUsers.length)]
      }
    ).merge(
    refreshClickStream.map(function(){
      return null
    })
  ).startWith(null)
}

var suggestion1Stream = createSuggestionStream(close1ClickStream)
  , suggestion2Stream = createSuggestionStream(close2ClickStream)
  , suggestion3Stream = createSuggestionStream(close3ClickStream)

function renderSuggestion(suggestedUser, selector){
  var suggestionEl = document.querySelector(selector)
  if (!suggestedUser){
    suggestionEl.style.visibility = 'hidden'
  } else {
    suggestionEl.style.visibility = 'visible'
    var usernameEl = suggestionEl.querySelector('.username')
    usernameEl.href = suggestedUser.html_url
    usernameEl.textContent = suggestedUser.login
    var imgEl = suggestionEl.querySelector('img')
    imgEl.src = ''
    imgEl.src = suggestedUser.avatar_url
  }
}

suggestion1Stream.subscribe(function(suggestedUser){
  renderSuggestion(suggestedUser, '.suggestion1')
})

suggestion2Stream.subscribe(function(suggestedUser){
  renderSuggestion(suggestedUser, '.suggestion2')
})

suggestion3Stream.subscribe(function(suggestedUser){
  renderSuggestion(suggestedUser, '.suggestion3')
})

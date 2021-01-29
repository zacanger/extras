// right from the docs:
// stream of nums at 100ms interval
var num1 = Kefir.sequentially(100, [1, 2, 3])
// stream based on above, produces 2, 4, 6
var num2 = num1.map(x => x * 2)
// and filters out...
var num3 = num2.filter(x => x !== 4)
// to subscribe:
num3.onValue(x => {
  logger.log(x)
})
// creating event-based stream:
var clicks = Kefir.fromEvents(document.querySelector('#btn'), click)
var inpval = Kefir.fromEvents(document.querySelector('#input'), 'keyup')
  .map(event => event.target.value)
var clickNum = clicks.scan(sum => sum + 1, 0)
var inputNum = inpval.map(text => parseInt(text, 10))
// using the built-in error-handling:
var fixedInpNum = inpval.flatMap(
  x => isNaN(x)
    ? Kefir.constantError('foo?')
    : Kefir.constant(x)
)
// i like that way of writing out conditionals! much nicer than in-line, why didn't i ever think of that?
var result = Kefir.combine([fixedInpNum, clickNum], (a, b) => a * b)
var output = document.querySelector('#output')
result.onValue(x => {output.innerHTML = x}).onError(error => {output.innerHTML = '<span>' + error + '</span>'})

// and bits from examples:
// draggable div thingy
function eventsPositionDiff(prevEvent, nextEvent){
  return {
    x : nextEvent.clientX - prevEvent.clientX
  , y : nextEvent.clientY - prevEvent.clientY
  }
}
function applyMove(currentPosition, move){
  return {
    x : currentPosition.x + move.x
  , y : currentPosition.y + move.y
  }
}
var mouseDowns = Kefir.fromEvents(document.querySelector('#divvy'), 'mousedown')
  , mouseUps   = Kefir.fromEvents(document, 'mouseup')
  , mouseMoves = Kefir.fromEvents(document, 'mousemove')
var moves = mouseDowns.flatMap(function(downEvent){
  return mouseMoves.takeUntilBy(mouseUps).diff(eventsPositionDiff, downEvent)
})
var position = moves.scan(applyMove, {x : 0, y : 0})
  , el       = document.querySelector('#divvy')
position.onValue(function(pos){
  el.style.top  = pos.y + 'px'
  el.style.left = pos.x + 'px'
})
// and in the css, something like:
// width:50px;height:50px;position:absolute;cursor:move;padding:10px;
// and in the markup:
// <div id="divvy">helllooo!</div>
//
// a little github search thingy
// kefir takes jquery.ajax options
function ajax(options){
  return Kefir.stream(function(emitter){
    var jqXHR = $.ajax(options)
    jqXHR.done(emitter.emit)
    jqXHR.fail(function(jqXHR, textStatus, errorThrown){
      emitter.error(jqXHR.status === 0 ? 'Connection problem' : jqXHR.responseText)
    })
    return function(){
      jqXHR.abort()
    }
  }).take(1).takeErrors(1).toProperty()
}
function inputValue(input){
  function getValue(){
    return input.value
  }
  return Kefir.fromEvents(input, 'input', getValue).toProperty(getValue)
}
function search(queryStr){
  return ajax({
    url  : 'https://api.github.com/search/repositories'
  , data : {
      q     : queryStr
    , sort  : 'stars'
    , order : 'desc'
    }
  }).map(function(data){
    return data.items
  })
}
// rendering
function renderLoading(){
  return '<span>loading</span>'
}
function renderError(error){
  return '<span>' + error + '</span>'
}
function renderResults(items){
  return '<ul>' + items.map(function(item){
    return '<li><a href="' + item.html_url + '">' + item.full_name + '</a>(' + item.stargazers_count + ')</li>'
  }).join('') + '</ul>'
}
// actual app bit
var searchQuery = inputValue(document.querySelector('#search'))
var searchResult = searchQuery.flatMapLatest(function(queryStr){
  return queryStr.length > 0 ? search(queryStr) : Kefir.constant([])
})
var resultHtml = Kefir.merge([
  searchQuery.map(renderLoading)
, searchResult.map(renderResults)
, searchResult.ignoreValues().flatMapErrors(Kefir.constant).map(renderError)
]).toProperty()
// side effect
var resultEl = document.querySelector('#result')
resultHtml.onValue(function(html){
  resultEl.innerHTML = html
})
// for markup that looks like:
// <input type="text" id="search">
// <div id="result"></div>


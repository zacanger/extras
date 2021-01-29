//
// POSITIONING
//

var size = new Pos(20, 20)

function Pos(x, y){
  this.x      = x
  this.y      = y
  this.equals = function(p){
    return this.x === p.x && this.y === p.y
  }
  this.add    = function(p){
    return new Pos(
      (this.x + p.x + size.x) % size.x,
      (this.y + p.y + size.y) % size.y)
  }
}

randomPos = function(){
  return new Pos(
    Math.floor(Math.random() * size.x),
    Math.floor(Math.random() * size.y))
}

function rotateLeft(pos){
  return new Pos(pos.y, -pos.x)
}

function rotateRight(pos){
  return new Pos(-pos.y, pos.x)
}

//
// DRAWING
//

function drawGame(size){
  var game = $('#game')
  for (var i = 0; i < size.x; i++){
    var row = $('<div class="row" />')
    for (var j = 0; j < size.y; j++){
      row.append('<span class="cell" />')
    }
    game.append(row)
  }
}

function fillCells(fooBar){
  var game = $('#game')
  return function(ps){
    game.find('.cell').removeClass(fooBar)
    for (var i in ps){
      game.find('.row:eq('+ps[i].y+')')
          .find('.cell:eq('+ps[i].x+')')
          .addClass(fooBar)
    }
  }
}

var drawApple = fillCells('apple')
  , drawSnake = fillCells('snake')

function logRestart(){
  console.log('press')
  $('#log').html('hit the spacebar to restart')
}

function logClear(){
  $('#log').html('use ← and → to drive this thing')
}

$score = $('#score')
function setScore(score){
  $score.html(score)
}

// MAKING OUR OWN COMBINATOR BY EXTENDING BACON'S PROTOTYPE
// AND ALSO THIS IS THE BIT WHERE WE MAKE THINGS CHANGE SIZE
// GOD, I'M SO LOUD. WHY AM I SO LOUD?

Bacon.Observable.prototype.slidingWindowBy = function(lengthObs){
  var self = this
  return new Bacon.EventStream(function(sink){
    var buf    = []
      , length = 0

    lengthObs.onValue(function(n){
      length = n
    })
    self.onValue(function(x){
      buf.unshift(x)
      buf = buf.slice(0, length)
      sink(new Bacon.Next(buf))
    })
    return function(){}
  })
}

Bacon.seperateBy = function(sep, obs){
  return obs().changes().concat(sep.take(1).flatMap(function(){
    return Bacon.seperateBy(sep, obs)
  }))
}

function contains(arr, x){
  for (var i in arr)
    if (arr[i].equals(x)) return true
  return false
}

//
// SSSSSSSSSSSSSNAKE
//


// polyfill bind, taken straight up from someone else's code, because really, fuck all that shit
Function.prototype.bind=Function.prototype.bind||function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}var a=Array.prototype.slice,f=a.call(arguments,1),e=this,c=function(){},d=function(){return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)));};c.prototype=this.prototype;d.prototype=new c();return d;};

_ = Bacon._ // haha, i love that he does this in the example, because watch how often we actually use this xD

function bindInputs(){
  var keys      = $(document).asEventStream('keydown').map('.keycode')
    , lefts     = keys.filter(function(x){return x === 37})
    , rights    = keys.filter(function(x){return x === 39})
    , restart   = keys.filter(function(x){return x === 32})
    , tick      = Bacon.interval(100)
  return {left: lefts, right: rights, tick: tick, restart: restart}
}

function getPosition(input, tick){
  var actions =
    input.left.map(function(){return rotateLeft}).merge(
   input.right.map(function(){return rotateRight}))

  var startDirection = new Pos(0,1)
    , startPosition  = new Pos(0,0)
    , direction      = actions.scan(startDirection, function(x, f){return f(x)})

  return direction
    .sampledBy(input.tick)
    .scan(startPosition, function(x, y){return x.add(y)})
}

function apple(position){
  var applePos = randomPos()
  return position
    .filter(function(p){return p.equals(applePos)})
    .take(1)
    .flatMapLatest(apple.bind(null, position))
    .toProperty(applePos)
}

function game(position){
  var pos    = position()
    , app    = apple(pos)
    , length = app.map(1).scan(10, function(x, y){return x + y})
    , score  = app.map(1).scan(0,  function(x, y){return x + y})
    , snake  = pos.slidingWindowBy(length)
    , dead   = snake.filter(function(snake){return contains(_.tail(snake, _.head(snake)))})
    , game   = Bacon.combineTemplate({snake: snake, apple: app, score: score})
  return game.takeUntil(dead)
}

var repeated = function(game, restart){
  var gm = function(){
    var tmp = game()
    tmp.onEnd(logRestart)
    return tmp
  }
  restart.onValue(logClear)
  return Bacon.seperateBy(restart, gm)
}

drawGame(size)

var inputs   = bindInputs()
  , position = getPosition.bind(null, inputs)
  , newGame  = game.bind(null, position)

repeated(newGame, inputs.restart).onValue(function(e){
  drawSnake(e.snake)
  drawApple([e.apple])
  setScore(e.score)
})


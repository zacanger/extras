// two buttons, for rotating left and right
// getting their click event streams

function rotateLeft(pos){
  return new Vector2(pos.y, -pos.x)
}

function rotateRight(pos){
  return new Vector2(-pos.y, pos.x)
}

var lefts   = $('button.left').asEventStream('click')
  , rights  = $('button.right').asEventStream('click')
  , actions =
      lefts.map(() => rotateLeft).merge(
     rights.map(() => rotateRight)) // so wait, is typescript's lambda just an es6 arrow function?

var startDirection   = new Vector2(0,1)
  , direction        = actions.scan(startDirection, (x, f) => f(x)) // fuck yeah, love that band
  , tick             = $('#tick').asEventStream('click')
  , currentDirection = direction.sampledBy(tick)
  , startPosition    = new Vector2(0, 0)
  , position         = currentDirection.scan(
      startPosition, (x, y) => x.add(y)) // i could really get used to this! the
  , snake            = position.slidingWindow(3) // not-putting-closing-parens-on-new-lines thing. i dig it.

snake.onValue(drawSnake)

position.map(Array).onValue(drawSnake)

// var applePos = new Vector2(3, 3) // snakey is hungry
//   , apple    = position
//       .filter(p => p.equals(applePos))
//       .take(1) // so, here's the first event where the snake's position is the same as the apple's position

function apple(){
  var applePos = randomPos()
  return position // so, this is basically the same as the above, but now when snake and apple are in same
    .filter(p => p.equals(applePos)) // position, we switch to new event stream. that stream is exactly
    .take(1) // the same as it was, except now the apple's at a new random position.
    .flatMapLatest(apple) // toProperty here just starts the stream (with apple's new position).
    .toProperty(applePos) // without it, we'd have a stream with no values.
}

Bacon.prototype.slidingWindowBy(lengthObs) = function(){
  var self = this                         // we're returning a new event stream.
  return new Bacon.EventStream(sink => {  // constructor's argument is function 'sink()'
    var buf    = []                       // new events are sent by invoking this with
      , length = 0                        // the _next_ value.
                                          // bacon has three _types_ of events:
    self.onValue(x => {                   // Next, End, and Error.
      buf.unshift(x)                      // That sounds like it's going to be pretty standard
      buf = buf.slice(length)             // in FRP. Anyway, that's why we have this nice little
      sink(new Bacon.Next(buf))           // Bacon.Next here.
    })
    lengthObs.onValue(n => {
      length = n
    })
  })
}

// UGH THIS IS ALL SO SLOPPY HOLD ON
// check snake-game.js instead; we'll rename this one to snake-game.bak.js

module.exports = function(Bacon){
  var bus = new Bacon.bus()
  setTimeout(function(){
    bus.push('Bacon')
  }, 100)
  setTimeout(function(){
    bus.push('is')
  }, 200)
  setTimeout(function(){
    bus.push('delicious')
    bus.end()
  }, 300)
  return bus
}


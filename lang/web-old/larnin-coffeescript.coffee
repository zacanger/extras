# learnxiny is the BEST.

# Comments are as in shells, rb, py
###
block comments are
like this
###
#

thingy = 32 # var thingy = 32
opposite = true # var opposite = true

thingy = -32 if opposite # if(opposite){thingy = -32}

square = (x) -> x * x # var square = function(x){return x * x}

fill = (container, liquid = "coffee") ->
	"filling the #{container} with #{liquid}..."

###
var fill
fill = function(container, liquid){
if (liquid == null){
liquid = "coffee"
}
	return "filling the " + container + " with " + liquid + "..."
}
###

list = [1..5] # like in bash kinda

math =
	root: Math.sqrt
	square: square
	cube: (x) -> x * square x
###
var math = {
"root": Math.sqrt,
"square": square,
"cube": function(x){erturn x * square(x)}
}
###

race = (winner, runners...) ->
	print winner, runners
###
race = function(){
var runners, winner
winner = arguments[0], runners = 2 <=arguments.length ? __slice.call(arguments, 1) : []
return print(winner, runners)
}
###

alert 'hey!' if elvis? # if (typeof elvis !== 'undefined' && elvis !== null){alert('hey!')}

cubes = (math.cube num for num in list)
###
cubes = (function(){
var _i, _len, _results
_results = []
for (_i = 0, _len = list.length; _i < _ len; _i++){
num = list[_i]
_results.push(math.cube(num))
}
return _results
})()
###

foods = ['pizza', 'beer', 'ice cream']
eat food for food in foods when food isnt 'ice cream'
###
that's pretty clear to me! maybe that means i get it. :D
###


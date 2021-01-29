// some other stuff not really covered here:
// async/await
// decorators
// observables
// proxies/meta-programming
// improved unicode support (str, regex)
// TCO: http://stackoverflow.com/questions/310974/what-is-tail-call-optimization
// symbols: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol





// const
const foo = 2
foo // => 2
foo = false // ERROR!




// let
if(true){var asdf = 'hi'}
console.log(asdf) // this works

if(true){let ghjkl = 'hullo'}
console.log(ghjkl) // this does not!

let something = 'this is something!'
something = 0 // this is okay, just like with `var`

while (true) {
  let something = 'this is a new thing'
  console.log(something)
  break
}
console.log(something)

// that's not a function, it's a block.
function asdf() {
  for (let i = 0; i < 100; i++) {
    let j = 'string'
    console.log(j)
  }
  console.log(j)
}
asdf() // woahhhh




// arrow functions
var numbers = [1,2,3,4,5]
numbers.map(function(x) {
  return x * x
})
$('.btn').click(function(e) {
  e.preventDefault()
  this.toggle()
})
// vs
let numbers = [1,2,3,4,5]
numbers.map(x => x * x)
$('.btn').click(e => {
  e.preventDefault()
  this.toggle()
})


var fs = require('fs')
function add(x, y){
  return x + y
}
var nums = [1,2,3,4,5]
var newNums = nums.map(function(n){
  return n * 2
})
console.log(add(4, 12))
console.log(nums, newNums)
fs.readFile('./package.json', 'utf-8', function(err, data){
  if(err){
    console.error(err)
  }
  console.log(data)
})
// vs
const
  fs   = require('fs')
, add  = (x, y) => x + y
, nums = [1,2,3,4,5]
, newNums = nums.map(n => n * 2)
console.log(add(32, 32))
console.log(nums, newNums)
fs.readFile('./package.json', 'utf-8', (err, data) => {
  if(err){
    console.error(err)
  }
  console.log(data)
})




// arrow functions bind 'this' when defined, rather than when called!
// new kind of methods!
var obj = {
  name      : 'z'
, age       : 26
, friends   : ['g', 'e', 'r']
, hiFriends : function() {
    this.friends.forEach(function(friend) {
      console.log(this.name + ' is friends with ' + friend)
    })
  }
} // undefined is friends with g (etc.)

// vs
const obj = {
  name    : 'z'
, age     : 26
, friends : ['g', 'e', 'r']
, hiFriends(){
    this.friends.forEach(friend => {
      console.log(this.name + ' is friends with ' + friend)
    })
  }
} // z is friends with e (etc)

// another example of lexical binding
function SomeComponent() {
  var that   = this
  var button = document.getElementById('btn')
  button.addEventListener('click', function() {
    console.log('clicked!')
    that.handleClick()
  })
}
SomeComponent.prototype.handleClick = function() {
  // etc
}
// vs
function NewComponent() {
  let button = document.getElementById('btn')
  button.addEventListener('click', () => {
    console.log('clicked!')
    this.handleClick()
  })
}



// method assignment:
let me = {
  get name() {
    return this._name
  }
, set name(val) {
  console.log('setting name: ' + val)
  this._name = val
  }
}
// person.name = 'z'
// person.name




// template strings
const greetz = 'hello'
console.log(`${greetz}, world`)

// multiline strings (using one backtick)
var thing = 'this is a multi-line string\ndoing things the old way.\nkinda gross, huh?'
let stuff = `here's a multi-line string
doing things the new way.
much nicer, i think.`

var htmlSkeleton = '\
  <!doctype html>\n\
  <html lang="en">\n\
    <head>\n\
      <meta charset="utf-8"
'
// or
var htmlSkel =
  '<!doctype html>\n' +
  '<html lang="en">\n' +
  ' <head>\n' +
// etc...
// vs
const hSkel = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
`
// etc



// computed property names:
const whatever = {
  [foo + bar] : 'hi!'
, quux        : 'oh, hello'
, baz         : 'asdfghjl'
}
console.log(whatever.foobar) // => 'hi!'



// named parameters:
function us({a: x, b: y}){
   console.log(x, y)
}
us({a : 'me', b : 'you'})

function selectEntries(options) {
  var start = options.start || 0
  var end   = options.end   || -1
  var step  = options.step  || 1
  // stuff
}
// vs
function selectEntries({start = 0, end=-1, step=1}){
  // stuf`^f
}



// defaults:
// only triggered by `undefined` (not any falsey value)
function add(x, y) {
  if ((typeof x == 'undefined') || (typeof y == 'undefined')) {
    console.error('invalid arguments')
  } else {
    return x + y
  }
}

// vs
function add(x = 0, y = 0) { return x + y }
add(2, 2)
add()




// destructuring:
var peeps = ['scott', 'josh', 'erin', 'sam', 'nick', 'cole', 'geordyn']
,  first  = peeps[0]
,  second = peeps[1] // etc
// vs
const peeps = ['scott', 'josh', 'erin', 'sam', 'nick', 'cole', 'geordyn']
const [first, second, third, fourth, fifth, sixth, seventh] = peeps

// also:
var self = {
  name : 'zac'
, age  : 26
, does : 'stuff'
}
var nom  = self.name
  , old  = self.age
  , does = self.does
// vs
const self = {
  name : 'zac'
, age  : 26
, does : 'stuff'
}
const {nom, old, things} = self
let
  foo    = 'foo'
, bar    = 'bar'
, fooBar = {foo, bar}
console.log(fooBar)
let
  nonsense = {key : 'value', newKey : 'newValue'}
, {key, newKey} = senseless
console.log(key, newKey)
console.log(senseless)

// also
function personFactory(name, age, eyes, hair){
  return {
    name : name
  , age  : age
  , eyes : eyes
  , hair : hair
  }
}
// vs
function personFactory(name, age, eyes, hair){
  return {name, age, eyes, hair}
}

let [x, y] = [1, 2]
console.log(x, y)
[x, y] = [y, x]
console.log(x, y)

let foo = () => [10, 20, 30]
let [, q, r] = foo()
console.log(q, r)




// putting some things together:
const eliteBook = {
  brand     : 'hp'
, overheats : 'rarely'
, ram       : 16
, cores     : 4
}
const toshy = {
  brand     : 'toshiba'
, overheats : 'frequently'
, ram       : 4
, cores     : 2
}
function laptopInfo({brand}, {overheats}, {ram}, {cores}){
  console.log(`my ${brand} laptop has ${ram} of RAM, a ${cores} CPU, and it overheats ${overheats}.`)
}




// rest:
var nums = [1,2,3,4,5]
function vals(list){
  var first  = nums[0]
    , second = nums[1]
    , rest   = list.slice(2)
  console.log(first, second, rest)
}

// vs
const nums = [1,2,3,4,5]
function vals([first, second, ...rest]){
  console.log(first, second, rest)
}
function logThings(...stuff){
  console.log(stuff)
}
logThings('thing one', 'thing two', false, 2)

// or
function format() {
  var pattern = arguments[0]
  var args    = [].slice.call(arguments, 1)
}
// vs
function format(pattern, ...args){}


// spread:
var a = [1,2,3]
  , b = [4,5,6]
  , c = [7,8,9]
  , x = [].concat(a,b,c)

// vs
let y = [...a, ...b, ...c]

let arr = [2, 3, 4]
console.log(1, ...a, 5, 6)

let fn = (a, b, c) => {
  console.log(a + b + c)
}
fun(...arr)

// or
var arr1 = [1, 2]
  , arr2 = [3, 4]
arr1.push.apply(arr1, arr2)
// vs
arr1.push(...arr2)




// MODULES! http://www.2ality.com/2014/09/es6-modules-final.html
// browser: <script type="module">

// a module:
export function add(list){
  return [...list].reduce((acc, x) => acc + x, 0)
}
export function square(val){
  return val * val
}
const Math = {add, square}
export default Math
// using that module:
import Math          from 'math' // because it's the default
import {add, square} from 'math' // because we can
let
  total = Math.add(1,2,3,4,5)
, twice = square(16)


// old way
var sqrt = Math.sqrt
function square(x) {
  return x * x
}
function diag(x, y) {
  return sqrt(square(x) + square(y))
}
module.exports = {
  sqrt   : sqrt
, square : square
, diag   : diag
}
// importing it
var square = require('./file').square
  , diag   = require('./file').diag
console.log(square(8))
console.log(diag(2, 4))

// vs

export const sqrt = Math.sqrt
export function square(x) {
  return x * x
}
export function diag(x, y) {
  return sqrt(square(x) + square(y))
}
// and importing
import {square, diag} from './file'




// classes:
// NO.
// JUST DON'T.
// https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a
// https://medium.com/javascript-scene/how-to-fix-the-es6-class-keyword-2d42bb3f4caf
// https://medium.com/javascript-scene/inside-the-dev-team-death-spiral-6a7ea255467b
// http://www.johndcook.com/blog/2011/07/19/you-wanted-banana/
// http://harmful.cat-v.org/software/OO_programming/

class Mammal {
  constructor(name, limbs) {
    this.name  = name
    this.limbs = limbs
  }
  details() {
    console.log(`${this.name} has ${this.limbs} limbs`)
  }
}
let cat = new Mammal('kitten', 4)
class Human extends Mammal {
  constructor(name, limbs, skillz) {
    super(name, limbs)
    this.skillz = skillz
  }
  skilled() {
    console.log(`${this.name} has ${this.skillz} skills`)
  }
}
let me = new Mammal('Zac', 4)
me.detail()
me.skilled()


// old way
var Car = function(odometer = 0){
  this.odometer = odometer
}
Car.prototype.drive = function(distance){
  this.odometer += distance
}
var beetle = new Car()
beetle.drive(10)
console.log(beetle)

// new way
class Car {
  constructor(odometer = 0){
    this.odometer = odometer
  }
  drive(distance){
    this.odometer += distance
  }
}
let jetta = new Car()
jetta.drive(20)
console.log(jetta)

// or
function Person(name){
  this.name = name
}
Person.prototype.describe = function(){
  return 'Person, called' + this.name + '.'
}
// vs
class Person {
  constructor(name) {
    this.name = name
  }
  describe() {
    return 'Person, called ' + this.name + '.'
  }
}

// an error-handling example
function NewError() {
  var superInst = Error.apply(null, arguments)
  copyOwnPropertiesFrom(this, superInst)
}
NewError.prototype = Object.create(Error.prototype)
NewError.prototype.constructor = NewError
// vs
class NewError extends Error {}


// sets
// collections of values
// no duplicates
let s = new Set()
s.add(1)
s.add(1)
console.log(s.size)
s.add(2)
s.delete(2)
s.clear()
console.log(s.haz(1))
let set = new Set(['foo', 'bar', 'quux', 'baz'])
// for...of works on sets _in order_!
for (let x of set) {
  console.log(x)
}
// spread works with sets, so you can make a set an array!
let arr = [...set]
// which means you can easily remove duplicates from an array
let newArr = [1, 1, 2, 1, 4, 2, 4, 6, 9, false, NaN]
let newSet = [...new Set(newArr)]
// also new: WeakSet. see other example code for this.




// maps
// arbitary values : arbitary values
// a _dictionary_ rather than object in the es5 sense
let m = new Map()
let [x, y] = [{id : 1}, {id : 2}]
m.set(x, 'foo')
m.set(y, 'bar')
let xVal = m.get(x)
console.log(xVal)
for (let i of m) {
  console.log(i)
}
let keys = m.keys()
m.delete(y)
console.log(keys.next())
console.log(keys.next())
m.clear()
console.log(keys.next())

let map = new Map([
  [1, 'one']
, [2, 'two']
, [3, 'tre']
])

let newMap = new Map()
.set(1, 'one')
.set(2, 'two')
.set(3, 'tre')

for (let val of map.values()) {
  console.log(val)
}

for (let key of newMap.keys()) {
  console.log(key)
}

for (let ent of map.entries()) {
  console.log(ent[0], ent[1])
}
// OR:
for (let [key, value] of map.entries()) {
  console.log(key, value)
}
// but since `entries()` is the default way of iterating:
for (let [key, value] of map) {
  console.log(key, value)
}
// as with sets, maps can be easily converted to and from arrays
// also see: WeakMap.




// tag functions
// let [a, b] = [13, 17];
// let myTagFunction = function (words, ...values) {
//     // does stuff
// };
// let result = myTagFunction `I have ${a} brothers and ${b} sisters`;


// iterators
let it = ['a', 'b', 'c', 'd'][Symbol.iterator]()
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().value)
let anotherIt = 'Provo'[Symbol.iterator]()
console.log(anotherIt.next().value)
console.log(anotherIt.next().value)
console.log(anotherIt.next().value)
console.log(anotherIt.next().value)
console.log(anotherIt.next().value)
console.log(anotherIt.next().value)

let obj = [7, 14, 21]
for (let v of obj) {
  console.log(v)
}
let str = 'javascript'
for (let ch of str) {
  console.log(ch)
}




// object.assign()
Object.assign(target, source1, source2)
// merges source1 and source2 into target
// returns target
let someObj = {foo : 4}
Object.assign(someObj, {bar : 8})
// someObj => {foo : 4, bar : 8}

// cloning objects
function clone(originalObject) {
  return Object.assign({}, originalObject)
}




// string methods
'foo'.repeat(4)
// 'foofoofoofoo'
'foo'.startsWith('bar') // => false
'bar'.endsWith('ar') // => true
'hello'.includes('ll') // => true




// array methods
[1, 4, 9].find(x => x % 2 === 0) // => 4
[1, 4, 9].findIndex(x => x % 2 === 0) // => 1
[1, 3, 9].findIndex(x => x % 2 === 0) // => -1
// es2016:
[1, 2, 3, 4].includes('a') // => false
[1, 2, 3, 4].includes(3) // => true




// for...of
// goodbye, for-in, .forEach!
let arr = ['foo', 'bar']
for (let el of arr) {
  console.log(el)
}
for (let [index, elem] of arr.entries()) {
  console.log(index, elem)
}




// generators:
// functions that can be exited and re-entered. context is saved across entrances.
// not executed immediately; iterator is returned, instead. when `next()` is called,
// executes until the next `yield` expression. can delegate to another generator
// using `yield*`. `next()` returns object with value (returned from the yield expression)
// and a done property (if it's yielded last value or not).
// suspend with `yield` (it's like return, but you can resume after it)
// start and resume with `next()`
function* generatorThing() {
  yield 0
  yield 1
  yield 2
  yield 3
}
let genObj = generatorFunction()
genObj.next() // {value : 0, done : false}
genObj.next() // {value : 1, done : false}
genObj.next() // {value : 2, done : false}
genObj.next() // {value : 3, done : false}
genObj.next() // {value : undefined, done : true}

function* iterEntries(obj) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    yield [ley, obj[key]]
  }
}
let myObj = {foo : 2, bar : 4}
for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value)
}

function* dataConsumer() {
  console.log('started')
  console.log(`1. ${yield}`)
  console.log(`2. ${yield}`)
  return result
}
let newObj = dataConsumer()
newObj.next()
newObj.next('a')
newObj.next('b')
// foo 2
// bar 4

// example to iterate through all yields in a generator:
gen = someGenerator()
let item = {"done" : false}
while (!item.done) {
  item = gen.next()
  console.log(item)
}
// or
for (let g of someGenerator()) {
  console.log(g)
}
// or
let arr = [...someGenerator()]
console.log(arr)
// or
let [a, b] = someGenerator()
console.log(a)
console.log(b)






// async generator fun
'use strict'
const
  fs       = require('fs')
, fileName = process.argv[2]

readFile(fileName, chain(splitLines, numberLines, printLines))

function readFile(fileName, target) {
  let readStream = fs.createReadStream(fileName, {encoding : 'utf8', bufferSize: 1024})
  readStream.on('data', buffer => {
    let str = buffer.toString('utf8')
    target.next(str)
  })
  readStream.on('end', () => {
    target.return()
  })
}

function* splitLines(target) {
  let previous = ''
  try {
    while (true) {
      previous += yield
      let eolIndex
      while ((eolIndex = previous.indexOf('\n')) >= 0) {
        let line = previous.slice(0, eolIndex)
        target.next(line)
        previous = previous.slice(eolIndex + 1)
      }
    }
  } finally {
    if (previous.length > 0) {
      target.next(previous)
    }
    target.return()
  }
}

function* numberLines(target) {
  try {
    for (let lineNo = 0; ; lineNo++) {
      let line = yield
      target.next(`$lineNo} : $line`)
    }
  } finally {
    target.return()
  }
}

function* printLines() {
  while (true) {
    let line = yield
    console.log(line)
  }
}




// exponents!
x ** y // same as Math.pow(x, y)
num **= 2 // same as num = num ** 2




// proposed : string padding:
'8'.padStart(4, '0') // '0008'
'4'.padEnd(2, '3') // '43'
'x'.padEnd(4) / 'x   '




// proposed : trailing commas in objects, arrays, parameters.
// don't use : will break things still.




// promises:
let prom = new Promise((resolve, reject) => {
  if (true) {
    resolve('passed!')
  } else {
    reject(Error('failed!'))
  }
})
prom.then(result => {
  console.log(result)
}, err => {
  console.trace(err)
})


console.log('promise started')
function myPromise(random){
  return new Promise(
    function(resolve, reject){
      console.log('promise started')
      function decideStatus(){
        // resolve with fulfilled if random number > 0.5
        // reject otherwise
        (random > 0.5) ? resolve('fulfilled') : reject('rejected')
      }
      setTimeout(decideStatus, random * 3000)
    }
  )
}
// resolve -- then; reject -- catch
myPromise(math.random())
.then(
  function(status){console.log('promise ' + status)
})
.catch(function(status){
  console.log(status)
})
console.log('promise finished')




// symbols
const Cat = (function () {
  let nameSymbl = Symbol('name')
  function Cat (name) {
    this[nameSymbl] = name
  }
  Cat.prototype.getName = function () {
    return this[nameSymbl]
  }
  return Cat
}())

let c = new Cat('percy')
console.log("Cat's name: " + c.getName()) // percy
delete c.name // even after deleting
console.log("Cat's name is still: " + c.getName() + ' is private.') // so percy




// unicode regex!
let string = 'foo𝌆bar'
let match = string.match(/foo(.)bar/u)
console.log(match[1]) // → '𝌆'





// direct proxy:
let NegativeIndices = (array) => {
  return new Proxy(array, {
    get: (receiver, name) => {
      let index
      console.log('Proxy#get', array, name)
      index = parseInt(name)
      if (!isNaN(index) && index < 0) {
        return array[array.length + index]
      } else {
        return array[name]
      }
    }
  })
}
// Negative array indices:
// array = NegativeIndices [4, 420, 42]
// array[-1] is 42




// binary and octal literals!
// lots of nice new methods for strings, arrays, objects, math, etc!
// other things!
// stuff!
// fun times!


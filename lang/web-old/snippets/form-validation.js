'use strict'
// assume we know just what kind of data we'll be getting in each field
const template = {
  'firstname' : 'string'
, 'lastname'  : 'string'
, 'email'     : 'string'
, 'password'  : 'string'
}

function validater(data, template){
  let result = {'isValid' : true}
  function validate(data, template){
    for(var key in template){
      if(template.hasOwnProperty(key)){
        if(typeof data[key] === 'object' && typeof template[key] == 'object'){
          validate(data[key], template[key])
        } else {
          if(typeof data[key] !== template[key]){
            result.isValid = false
            result.msg     = key + ' doesn\'t exist, or is invalid'
            return
          }
        }
      }
    }
  }
  validate(data, template)
  return result
}

// so now if we had an object like the following:
const userInput = {
  'firstname' : 'asdf'
, 'lastname'  : 'ghjkl'
, 'email'     : null
}
// we could do the following:
console.log(validater(userInput, template))
// and find out what's wrong. yay!
// note: this will stop on the first invalid item, and not report any others.
// i'll fix that later, i guess.

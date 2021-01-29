// const greetz = person: string => `yo ${person}`
// okay evidently this kind of syntax does not work. let's try...
function greetz(person: string){
  return `yo ${person}`
}
console.log(greetz('z'))
// okay, that worked...

// with an interface (rly? i feel like es6 default params makes this totally redundant)
interface Person {
  firstName : string
  lastName  : string
}
function greety(person: Person){
  return `hello, ${person.firstName} ${person.lastName}`
}
let user = {
  firstName : 'z'
, lastName  : 'a'
}
console.log(greety(user))

class Foo {
  fullName : string
  constructor(public firstName, public lastName){
    this.fullName = `${firstName} ${lastName}`
  }
}
interface PersonNew {
  firstName : string
  lastName  : string
}
function greeter(person : PersonNew){
  return `howdy, ${person.firstName} ${person.lastName} `
}
let newUser = new Foo('zac', 'anger')
console.log(greeter(newUser))


// commments are as in js
var isThing: boolean = true;
var whatever: number = 4;
var hello: string = "Hello!";

var whatIsThis: any = 16; // if we don't know ahead of time what it will be
whatIsThis = "i don't know!";
whatIsThis = true;

var myArr: number[] = [0, 1, 2, 3, 4];
var someArr: Array<number> = [5, 6, 7, 8, 9, 10];

enum Foo {Bar, Quux, Baz};
var f: Foo = Foo.Bar;

function thisReturnsNothing(): void {
  // do stuff but don't return anything, mmkay?
}

// i'm just going to go ahead and assume i can use modern js
// and lose the extraneous semicolons, for now

const x = (a: number): number => a * a
const y = (b: number) => b + b

// interfaces

interface Human {
  name : string
  age? : number // this means age is optional
  foo() : void  // method, i guess
}

const me: Human = {name : 'Zac', foo: () => {}}

interface Search {
  (src : string, sub : string): boolean
}

const searchy: Search
searchy = (source : string, subString : string) => source.search(subString) = 'whatever idk'

// classes
class Foo {
  a : string

  constructor(a: number, public b: number = 0){
    this.a = a
  }

  asdf(){
    return this.a + this.b // i assume this will break, because string plus num?
  }
  static foo = 'what is even going on right now'
}

class Bar extends Foo {
  // here we can do the usual es6 class stuff i guess
}

// modules
// really? this couldn't just be as straightforward as just using ecmascript modules?
module Baz {
  export class Quux {
    // stuff
  }
}

// alias
import B = Baz
// okay whatever. i'm so over this.


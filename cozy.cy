##
Goals:
* Simple, human-readable, high level
* Dynamic, strong
* Functional ideas but Python/Go/Shell/Ruby-ish syntax
* No classes or other OOP-specific constructs (just functions and data)
* Compiled, but with a dev-time interpreter (like `runhaskell` or `go run`) and a REPL (like `ghci` or `gore`)

Basics:
* Shell style comments
* Multi-line comments start and end with two hash marks
* No null, no undefined
* All functions must return a value
* All variables must be initialized to something
* Block scope, file scope, and application scope (export)
* All variables are immutable unless 1. in a function and 2. ending with !
* Indentation has no semantic impact, but two
  spaces is the recommendation
* Line lengths should not exceed 80 chars
* camelCase is preferred but PascalCase or snake_case also work

TODO:
* dictionary iteration/utils
* curry, memo, and other FP utils (probably depends on varargs)
* properly define && and || (and ?? ?)
* operator precedence and grouping
* includes or contains function (dicts, arrays, strings)
* regex
* ++ vs append, do we need both?
* docstrings, embedded markdown?
* comment syntax, is this good or not?
* errors/exceptions: values or not?
* simple built-in testing library
  (more like tape/unittest than rspec/jest,
   depends on exceptions/errors vs error values)
* package management (git based?)
* can vim and other syn files be generated from a formal grammar?
* timers, async and concurrency models

TODO, Native/Builtin Packages:
* cryptography, random
* network (tcp, http, http2, dns, tls, anything else? more than one
  namespace?)
* process-related
* argv, argument/flag parsing?
* stdin, stdout, tty
* filesystem, path
* constants, os info
* module/package-related
* how much should be stdlib, how much should be in modules?
  should stdlib be a module?
##

# Assignment, types, and operators
1 + 1 == 2
# One number type
1 + 1.1 == 2.1
a = 1
# Single quotes for characters and strings
# No seperate types, a character is just a
# little string.
b = 'a'
longString = 'a \
b \
c'
multilineString = 'a \n\
b \n\
c \n\
d'
c = 1.1
d = -1
e = -1.1
e != d
a >= b # TypeError
d <= c == true
d >= c == false
d != c == true
d == c == false
d < c == true
d > c == false

# Vectors, not lists
f = [1, 2]
g = ['i', '9']
h = [1, '2']
g[0] == 'i'
g[-1] == '9'
# ++ operator works for strings and arrays
concat = 'foo' ++ ' ' ++ 'bar'
concat == 'foo bar'

# Double quotes to allow interpolation
templated = "concat {f[0]}"
# String interpolation works with different types
templated == 'concat 1'
templatedMultiline = "foo
bar
{g[0]}
"
# Interpolation is the only way to use
# a non-string inside a string
x = 1 + 'asdf' # TypeError
# Interpolation will fail on non-primitives
x = [1]
y = "{x[0]}" # '1'
z = "{x}" # TypeError

# Dictionaries
# No need for quote marks around keys, they're
# automatically strings. h['3'] == 3.
# No dot notation, and no computed keys.
h = { a : 1, b : 2, 3 : 3 }
# No dot notation
h['a'] == 1

# If/else expressions
# No switch or pattern matching
return if a == b then c else d
foo = if something(x) then y else z
bar = if a then b else if c then d else e
# An if expression that results in assignment
# or a return can't ever evaluate to undefined,
# since there's no such thing in this language.
# This would be invalid, since there's no
# default case
quux = if a then b else if c then d # Error
# Multiline also works; then should be
# on the same line as if, but works either way.
baz = if a then
  b
else if c
  then
    if foo bar
    else x
  else y
# This would probably be more clear written as a function
# so it could use a mutable variable

# Functions are defined as expressions, not declarations
# No way to immediately invoke a function,
# just define it and then call it instead.
id = fn (x) x
# No need for return statement or braces
add = fn (a, b) a + b
# If using braces, need a return statement
mul = fn (a, b) {
  return a + b
}

# First class functions
reduce = fn (f, xs, init) {
  # If ident ends with !, it's mutable.
  # Mutable variables can only be used in a local
  # function scope, not globally
  acc! = init
  # No C-style loops
  for x in xs {
    acc! = f(x, acc!)
  }
  return acc!
}
append = fn (xs, x) {
  ret! = xs ++ x
  return ret!
}
# TODO: no braces, no return statement,
# the newline here doesn't break that,
# but it might not be clear, so should it
# be kept?
appendIf = fn (f, xs, x)
  if f(x) then append(xs, x) else xs
filter = fn (f, xs) {
  ret! = []
  for x in xs {
    ret! = appendIf(f, xs, x)
  }
  return ret
}
map = fn (f, xs) {
  ret! = []
  for x in xs {
      ret! = append(ret!, f(x))
  }
  return ret!
}
flip = fn (f) fn (a, b) f(b, a)
# TODO: does this satisfy this need?
# Each could also be defined in terms of reduce,
# and return the zero-value (0, "", {}, []), but that
# means we'd have to get rid of mixed-type arrays.
# No need for a separate each/foreach, because
# there's no such thing as a function that only
# performs side effects and doesn't return.
each = flip(map)
# Anonymous inline callbacks work
each([1, 2, 3], fn (x) {
  print x
  return 0
})

# Closures, anonymous functions, partial application
thing = fn (s) {
  return fn (ss) {
    return s + ss
  }
}
# This could also be written as
thing = fn (s) fn (ss) s + ss
# Or
thing = fn (s) {
  return fn (ss) s + ss
}
# Or
thing = fn (s) fn (ss) {
  return s + ss
}
# But the first way is clearer

# Recursion
fib = fn (n) if n <= 1 then 1 else fib(n - 1) + fib(n - 2)

# Void function. Note the !. This indicates
# a function that doesn't return anything. Because there's no
# real concept of undefined or void, assigning to a function call
# from a fn! would be an error. Since this one doesn't do
# anything at all, we just have empty braces (leaving out the
# braces would be a syntax error).
foo = fn! () {}
f = foo() # Error
foo = fn! () # Error
foo = fn! () {
  # do something effectful where a return value isn't important,
  # like writing to stdout.
  system.stdout.write('howdy\n')
}

join = fn (s, xs) reduce(append, xs, s)
# TODO: not sure if this is right; should it be an operator?
mod = fn (a, b) {
  x = a / b
  return a - x * b
}
fizzbuzz = fn (n) {
  ret! = []
  for i in range(0, n) {
    # Block scope, so s is re-initialized on each iteration.
    # If we defined it above the for, it would need to be s!.
    s =
      if mod(n, 3) && mod(n, 5) then 'Fizzbuzz'
      else if mod(n, 3) then 'Fizz'
      else if mod(n, 5) then 'Buzz'
      else "{n}"
      # Mixed type arrays are valid, but we're using a
      # string because we'd get a TypeError when
      # joining if we passed a number.
      ret! = append(ret!, s)
  }
  return join('\n', ret!)
}
# See below for print implementation
print(fizzbuzz(100))

# Variadic functions use the ... operator. Convention is to use the name
# `args`, but it's not enforced.
example = fn (...args) {
  # args is an array
  for arg in args {
    # do stuff
  }
}
# If you want to use named paramaters as well,
# varargs obviously need to come last.
exampleWithOtherArgs = fn (foo, bar, ...args) {}
# Length should work with strings, arrays, and dictionaries
# TODO:
# This might make more sense to implement in the host language
length = fn (iterable) {
  ret! = 0
  for i in interable {
      ret! = ret! + 1
  }
  return ret!
}
# TODO:
# This might make more sense to implement in the host language
range = fn (...args) {
  start! = args[0]
  end! = args[1]
  step! = if length(args) == 3 then args[2] else 1
  # TODO: ...
}
# Modules
# All imports are qualified, no need to specify a qualifier. No destructured
# imports, but you can use assignment if you need to.
# TODO: import aliasing to avoid potential conflicts (import system as sys)?
# I think that will depend on how package management works. If it's git-based,
# aliasing would be necessary. If there's a centralized repo, it wouldn't.
import system
sys = system
out = sys.stdout
# Print implementation used above.
print = fn! (x) system.stdout.write(x ++ '\n')
# TODO: I'm not so sure about this syntax.
import ./foo # Import from local file foo
import ./foo/bar # Import bar from the directory foo
# Assume a file in the same directory called bar.cy:
a = 1
b = 2
export c = a + 1
f = fn () a
export g = fn () f
# Back in the main file
import ./bar
bar.a # Error
bar.b # error
bar.c # 3
bar.f() # Error
f = bar.g() # function
f() # 1

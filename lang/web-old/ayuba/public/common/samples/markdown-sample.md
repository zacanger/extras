# welcome to markvi!

First things first... if you're typing and nothing seems to be happening, try hitting `i` (for _insert_) first. If you're trying to use your keys for other things but not having any luck, try hitting `esc` to enter 'normal' (or 'command') mode.

Now that that's out of the way...

## welcome to markvi (again!)

This is a simple, but hopefully very useable and enjoyable, Markdown writing app. What sets **markvi** apart is that little _vi_ bit--generally speaking, one doesn't find a Markdown-dedicated in-browser editor with esoteric Unix-y sort of keybinds, I expect. If you're not familiar with vi commands and keybinds, don't worry--no one is, at first--and anyway, you can use **markvi** without keybinds as well!

So, here's a tiny guide, just to get you started using **markvi**. Some of the most useful vi commands are in the table below, but not all commands are implemented in **markvi**.

| Key           | Action				| Markvi  |
| ------------- |:-------------:|------------:|
| :x | Exit (and save) | No |
| :q | Exit (no changes) | No|
| :q! | Exit (ignore changes | No |
| ZZ | (Exit, save if changes) | No |
| i | Enter insert mode (before cursor) | Yes |
| I | Enter insert mode (before line) | Yes |
| esc | Enter normal mode | Yes |
| a | Append (after cursor) | Yes |
| A | Append (after line) | Yes |
| o | Open new line (after current) | Yes |
| O | Open new line (before current) | Yes |
| r | Replace current character | Yes |
| R | Replace characters (overwriting) | Yes |
| h | Left | Yes |
| j | Right | Yes |
| k | Up | Yes |
| l | Right | Yes |
| w | Next word | Yes |
| b | Beginning of word | Yes |
| e | End of word | Yes |
| $ | End of line | Yes |
| 0 | Beginning of line | Yes |
| x | Delete current character | Yes |
| y | Yank (used with other keys) | Yes |
| yy | Yank current line | Yes |
| d | Delete (used with other keys) | Yes |
| dd | Delete current line | Yes |
| p | Put (opposite of Yank) | Yes |
| u | Undo last change | Yes |
| U | Undo changes to current line | Yes |

These are the tiniest bit of the barest basics, but used in combination these keybinds can do some pretty powerful stuff. For example, `d7e` would delete the next seven words, `y4k` would yank the preceeding four lines, and `:q!` would lose all your changes (in standard vi or vim; **markvi** autosaves to your local storage). For some much more detailed resources, try this [Vi Cheatsheet](http://www.lagmonster.org/docs/vi.html), or [this one for Vim](http://vim.rtorr.com/).

--------

# Markdown


This is intended as a quick reference and showcase. For more complete info, see [John Gruber's original spec](http://daringfireball.net/projects/markdown/), the [Github-flavored Markdown info page](http://github.github.com/github-flavored-markdown/), or the [Markdown-Here Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

# H1: the Basics.

_Emphasis_ (*italics*).
__Strong__ (**bold**).
**Combined _emphasis and strong_**
__Combined emphasis and *strong*__
~~We done did this task, aww yiss.~~

> Once upon a time a thing happened.
> It was pretty swell.
> Blockquotes are nifty.

1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses

Horizontal rules can be hyphens,

----

or asterisks,

****

or underscores.

____


## H2: Links

[I'm an inline-style link](https://www.google.com)
[I'm an inline-style link with title](https://www.google.com "Google's Homepage")
[I'm a reference-style link][Arbitrary case-insensitive reference text]
<http://www.example.com>

[arbitrary case-insensitive reference text]: https://www.mozilla.org


### H3: Code, Syntax Highlighting

Inline `code` only needs one backtick (grave accent); blocks of code take three:

```javascript
const max = process.argv[2]
let FizzBuzz = function* (){
  let num = 1
  while (num <= max){
    let value = num
    num++
    if (value % 15 === 0) {
      value = 'FizzBuzz'
    } else if (value % 3 === 0) {
      value = 'Fizz'
    } else if (value % 5 === 0) {
      value = 'Buzz'
    }
    yield value
  }
}()

for (var n of FizzBuzz){
  console.log(n)
```

```python
def fizz_buzz(num):
    if num % 15 == 0:
        print("FizzBuzz")
    elif num % 5 == 0:
        print("Buzz")
    elif num % 3 == 0:
        print("Fizz")
    else:
        print(num)

for i in range(1, 101):
    fizz_buzz(i)
```

#### H4: Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


##### H5: Images

Small images are shown at size.

![](https://www.placecage.com/gif/300/500)

Large images are scaled to fit.

![](http://placekitten.com/g/1200/800/)


###### H6: Line Breaks.

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.

Traditional markdown needs two spaces at the end of a line to start a newline (like so: `  `).

We find that a bit hard to remember.

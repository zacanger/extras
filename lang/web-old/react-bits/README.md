# REACT BITS

I put this repo together for folks looking to learn React, primarily at
DevMountain but really for anyone else too.

This repo doesn't address learning ES2015 (aka ES6; current JavaScript which you
should be using). I have another repo for that purpose,
[here](https://github.com/zacanger/es6-and-builds).

## READ THIS FIRST

[This. Read this.](https://facebook.github.io/react/docs/thinking-in-react.html)

--------

### Editors

You may want to take a moment to get your editor comfortable with JSX.
* For vim, use your plugin manager to get
  [this](https://github.com/mxw/vim-jsx) and don't forget to set `let g:jsx_ext_required = 0` in your .vimrc/init.vim.
* For Atom, `apm install react language-babel` or search for it in the Install Packages thing.
* For Sublime Text, search for `Babel` in Package Control.
* For VS Code, `tsd install react-global` or `typings install --ambient react-global`
* For WebStorm, do the thing that it suggests that you do, something about harmony or babel, don't remember.
* In general, switch from using JSHint to ESLint. JSHint doesn't do JSX very
  well. I recommend using the `standard` eslintrc, with `standard-react`.

--------

### DevTools Extensions

* [Official React DevTools Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Official Tools Addon for Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
* [Redux DevTool Extensions](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Show Me The React](https://chrome.google.com/webstore/detail/show-me-the-react/iaebolhfcmodobkanmaahdhnlplncbnd)

--------

### JSX Gotchas

* Don't try to comment your JSX with line comments
  * `// Comments like this don't work.`
  * `{/* Comments like this do work. */}`
* Don't try `if` statements in your JSX.
  * Instead, use ternaries or logical or. `{foo ? <Bar /> : <Baz />}` or `{thing && <Stuff />}`
* All tags must be closed (including void tags like `hr` and `img`).
  * But, all tags can be _self_ closing (eg `<div />`), which is nice.

--------

### Learn Things

Before you start in on tutorials, keep in mind that React is still young, and changes quickly.
Make sure any resources you're using are relatively recent (I'd say within 6 months or so). That
includes the stuff below, because I don't have time to check if all of these are kept up to date.
Easy wasy to tell if the thing you're reading is outdated:

* `React.createClass()`: we use ES2015 classes now.
* No mention of pure components (functions).
* Using JSPM, Duo, or some other funky build tool or package manager (stick with NPM and Webpack or Browserify).
* Using ES5.1. Just don't. There's no reason to. If you see a `var`, close the tab and find a different tutorial.

#### Tutorials

These are in approximate recommended reading/watching order.

* [This](https://www.gorkahernandez.com/blog/build-wikipedia-viewer-react-way) is a good **short** first-time React project.
* [A good bunch of tips](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know) for React beginners.
* [React Sans Tooling](https://www.youtube.com/watch?v=PEQYb7K2QEc) is a talk on React without all the stuff around React.
* [Learn Raw React](http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack) is in the same vein.
* To get started learning React, I _highly_ recommend [this course](http://survivejs.com).
* I have some React-related cheatsheets over [here](https://github.com/zacanger/doc.git).
* [How-To for Beignners](https://github.com/petehunt/react-howto).
* [a short guide on transitioning from angular to react](https://reactjsnews.com/an-angular-developers-first-react-app).
  * [and additional materials on the same](http://angulartoreact.com/).
* [Here's a book](https://www.fullstackreact.com), plus an awesome very in-depth [Yelp clone tutorial](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp).
* Webpack is awesome, but it's a huge pain. Really. A giant pain. [So consider using this](https://github.com/HenrikJoreteg/hjs-webpack).
  * Or just `npm i -g create-react-app`, `create-react-app MyProject` to get started. It's fantastic.
* A [Build Your Own (React) Starter Kit](http://andrewhfarmer.com/build-your-own-starter/#0-intro).
* [This is another very good beginner's course](http://reactjsprogram.teachable.com/courses/reactjsfundamentals).
* [Full Stack Redux Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html).
* [TodoMVC tutorial](https://www.theodo.fr/blog/2016/03/getting-started-with-react-redux-and-immutable-a-test-driven-tutorial-part-1)
  with React, Redux, Immutable, and unit testing.

--------

### Some Additional React Resources

* `npm i -g thinking-in-react` is a workshopper (interactive somewhat gamified tutorial in the terminal)
* `npm i -g learnyoureact` is another one of these.
* `npm i -g mern-cli` will get you a MERN (Mongo/Express/React/Node) stack generator
* [lifecycle demo](http://plnkr.co/edit/JrdxRs?p=preview)
* [official react jsfiddle](http://jsfiddle.net/reactjs/69z2wepo)
* [unofficial react jsbin](http://jsbin.com/yafixat/edit?js,output)
* [so many great demos](https://github.com/BinaryMuse/react-primer)
* [live links to the above demos](http://binarymuse.github.io/react-primer/build):
  * [components and properties](http://binarymuse.github.io/react-primer/build/index.html?1)
  * [jsx](http://binarymuse.github.io/react-primer/build/index.html?2)
  * [state](http://binarymuse.github.io/react-primer/build/index.html?3)
  * [composition, proptypes, & event handlers](http://binarymuse.github.io/react-primer/build/index.html?4)
  * [mixins](http://binarymuse.github.io/react-primer/build/index.html?5)
  * [top-down data flow & shouldComponentUpdate](http://binarymuse.github.io/react-primer/build/index.html?6)
  * [this.props.children](http://binarymuse.github.io/react-primer/build/index.html?2)
* [Awesome React](https://github.com/enaqx/awesome-react)
* [Awesome React Native](https://github.com/jondot/awesome-react-native)
* [React Modules](https://js.coach/react)
* [Awesome Redux](https://github.com/xgrommx/awesome-redux)
* [React Components List](http://dvemac.github.io/react-component-list)
* [Built With React](http://builtwithreact.io)
* [Twitter list of React influencers](https://twitter.com/oguzbilgic/lists/react-influencers)
* [Official create-react-app generator](https://github.com/facebookincubator/create-react-app)
* [List of other good React app generators](https://github.com/facebookincubator/create-react-app#alternatives)
* [Workshop/challenges](https://github.com/jesstelford/react-workshop)
* [A blog with a bunch of short React lessons](https://medium.com/@learnreact)
* [Redux Ecosystem Links](https://github.com/markerikson/redux-ecosystem-links)
* [React/Redux Links](https://github.com/markerikson/react-redux-links)

--------

### Tips

Instead of using ternary operators in your JSX, use the `&&` operator:
```jsx
{isLoggedIn ? <UserInfo /> : null}
// vs
{isLoggedIn && <UserInfo />}
```

Rather than doing a bunch of manual binding of your methods in classes, use arrow functions.
This will need `babel-plugin-transform-class-properties`.

```jsx
_handleEvent (e) {}
this.handleEvent = this._handleEvent.bind(this)
// vs
handleEvent = e => {}
```

Just use Webpack and npm. If someone tells you to use JSPM or Browserify or Duo, walk away.
Browserify is awesome, but Webpack makes working with React so much easier. Gulp and Grunt are great
task runners, but not so great for working with React specifically. Yes, Webpack's docs will make
you want to cry sometimes, and its source code is really hairy and it seems really difficult to get
changes into its plugins and things. It's still worth using. Use
[hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack) to get an easy and very complete setup,
if you want. Or use [create-react-app](https://www.npmjs.com/package/create-react-app), and when
you're ready for more control, run `npm run eject`.

Writing React is writing JavaScript. This might come as a bit of a blow after doing something like
Angular, but it turns out to be really convenient, especially if you're using JS elsewhere (a Node
server, JS to handle API calls, a JS ORM, etc.). Still, you might miss some handy directives or
whatever the equivalent is in whatever framework you're coming from. Just think about what those
things are really doing, and you'll be able to reimplement them in React. For example, `ng-repeat`:

```html
<div ng-repeat="thing in things">{{thing.foo}} &middot; {{thing.bar}}</div>
```

```jsx
things.map((thing) => <div>{thing.foo} &middot; {thing.bar}</div>)
// or even better
things.map(({ foo, bar }) => <div>{foo} &middot; {bar}</div>)
```

See [here](https://github.com/zacanger/react-bits/tree/master/examples/ng-equivs) for some other
Angular things but in React.

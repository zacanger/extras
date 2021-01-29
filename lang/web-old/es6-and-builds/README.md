examples, sorta-kinda slides, and a whole bunch of other stuff for a
mini-lecture on es6 for dm9 (kept sort of updated for 10 and 11 as well).

very simple es5.1 vs es2015 example (with react; es5 from omniscient's docs):

```javascript
// es5
var App = component(function (props) {
  var change = function () {
    props.cursor.update(function () { return 'Hello'; });
  }
  return <button onClick={change}>{props.cursor.deref()}</button>
})
var structure = immstruct({message: 'Foo'})
function render () {
  React.render(<App cursor={structure.cursor('message')} />, document.body)
}
structure.on('swap', render)
render()

// and in es6
const App = component(props => {
  const change = () => {
    props.cursor.update(() => 'Hello')
  }
  return <button onClick={change}>{props.cursor.deref()}</button
})
const structor = immstruct({message : 'Foo'})
const render = () => ReactDOM.render(
  <App cursor={structure.cursor('message')} />
, document.body
)
structure.on('swap', render)
render()
```

another example:

```javascript
// es5
function someFunc(param) {
  return {
    param : param
  }
}
// es6
const someFunc = param => ({ param })
// whaaaat
```

`cd` into the example subdirectories, run `npm i`, and play around!

## notes:
* `webpack --profile --json > stats.json` and then http://webpack.github.io/analyse/#modules
* `browserify src/entrypoint.js -o dist/dist.js -d`
  * the `-d` gives you sourcemaps
* `npm i -g babel-repl` gives you the node repl with esnext
* babel-cli
  * docs recommend installing per-project
    * avoid version conflicts
    * avoid depending on environment
  * -o to outfile
  * --source-maps
  * babel inputdirectory -o file.js
  * babel inputdirectory --out-dir outputdirectory

## links
* es6 stuff
  * [The official Technical Committee 39 GitHub](https://github.com/tc39)
  * [list of all tc39 members](https://github.com/zacanger/es6-and-builds/blob/master/tc39-members.json)
  * [ES6 in 350 Bullet Points](https://ponyfoo.com/articles/es6)
  * [How To Learn ES6](https://medium.com/javascript-scene/how-to-learn-es6-47d9a1ac2620) — everything Eric Elliot writes is worth reading. In Depth. At least twice.
  * [Getting Started With ES6](http://www.2ality.com/2015/08/getting-started-es6.html) and every other article this guy has ever written.
  * [Exploring JS](http://exploringjs.com/) free ebook by Dr. Rauschmayer, definitely read this if/when you have time.
  * [ES6 Equivalents in ES5](https://github.com/addyosmani/es6-equivalents-in-es5)
  * [ES6 In Depth](https://ponyfoo.com/articles/tagged/es6-in-depth) (series of articles, _highly_ recommended)
  * [ES6 Katas](http://es6katas.org/)
  * [ES6 Learning Resources](https://github.com/ericdouglas/ES6-Learning)
  * [List of ES6 Features](https://github.com/lukehoban/es6features)
  * [Another List of ES6 Features](http://es6-features.org/)
  * [Another list of features](http://jsfeatures.in/) in ES5, ES2015, ES2016, and ES2017
  * [Mozilla's Blog Series on ES6](https://hacks.mozilla.org/category/es6-in-depth/) (may be somewhat out of date)
  * [ES2015 (and 2016, and 2017) Support Table](https://kangax.github.io/compat-table/es6/)
  * [How to Use ES6 for Universal JavaScript Apps](https://medium.com/javascript-scene/how-to-use-es6-for-isomorphic-javascript-apps-2a9c3abe5ea2)
  * [A good starter project in ES6](https://github.com/r-walsh/es6-profiles) from the Dallas campus, similar to projects we've done here.
  * [babel's online repl](https://babeljs.io/repl/)
  * [Good reading on classes in JS](https://github.com/joshburgess/not-awesome-es6-classes)
* build systems
  * [browserify handbook](https://github.com/substack/browserify-handbook)
  * [gulp plugin directory](http://gulpjs.com/plugins/)
  * [list of languages that compile to js](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS)
  * [gulp setup example](https://github.com/zacanger/gulp-tests/tree/master/dm9-styl-ng-serv-lr)
  * [gulp react es6 setup](https://github.com/zacanger/react-tidbits/tree/master/es6-boiler)
  * [gulp with browserify](https://github.com/zacanger/gulp-tests/blob/master/browserify.js)
  * [npm scripts example](https://github.com/pharaoh-js/pharaoh-desktop/blob/master/package.json#L8)
  * [webpack config with external server](https://github.com/zacanger/examples/blob/master/webpack-react-setup-with-lots-of-stuff.js)
  * [in-depth webpack config](https://github.com/zacanger/react-samples/blob/master/webpack-react-kanban%2Fwebpack.config.js)
  * [project using jspm](https://github.com/zacanger/react-samples/tree/master/sorta-slackish)
  * [jspm notes](https://github.com/zacanger/examples/blob/master/jspm-example.js)
  * [makefile](https://github.com/zacanger/examples/blob/master/example-javascript-makefile)
  * [gruntfile for es6](https://github.com/zacanger/examples/blob/master/gruntfile-es6.js)
  * [very basic gruntfile example](https://github.com/zacanger/examples/blob/master/example-gruntfile.js)

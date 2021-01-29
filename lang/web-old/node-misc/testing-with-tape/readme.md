`npm i -g babel-cli tape faucet browserify browser-run`

to test in node:
`babel-node test.js | faucet`

to test in browser:
`browserify -t babelify test.js | browser-run -p 2222`

to test in both:
`browserify -t babelify test.js | browser-run -p 2222 | faucet`


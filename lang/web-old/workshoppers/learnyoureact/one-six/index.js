const
  express = require('express')
, eViews  = require('express-react-views')
, app     = express()
, port    = process.argv[2] || 3000

app
.set('port', port)
.set('view engine', 'jsx')
.set('views', `${__dirname}/components`)
.engine('js', eViews.createEngine({transformViews : false}))

require('babel-register')({ignore : false})

app
.use('/', (req, res) => res.render('index', ''))
.listen(port, () => console.log(`listening on ${port}`))

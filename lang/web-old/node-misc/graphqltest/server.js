import express    from 'express'
import schema     from './schema'
import {graphql}  from 'graphql'
import bodyParser from 'body-parser'

const
  app  = express()
, port = process.env.PORT || 3000

app
.use(bodyParser.text({type : 'application/graphql'}))
.post('/graphql', (req, res) => {
  graphql(schema, req.body)
  .then(result => res.send(JSON.stringify(result, null, 2)))
})

.listen(port () => console.log(`listening on ${port}`))


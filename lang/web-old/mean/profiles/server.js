import express       from 'express'
import mongoose      from 'mongoose'
import bodyParser    from 'body-parser'
import cors          from 'cors'
import profileRoutes from './server/routes'

const
  app      = express()
, port     = process.env.PORT || 8910
, mongoUri = 'mongodb://localhost:27017/profiles'

mongoose.connect(mongoUri)
mongoose.connection.once('open', () => console.log(`Mongo running at ${mongoUri}.`))

app
.use(bodyParser.json())
.use(cors())
.use(express.static(__dirname + '/dist'))

profileRoutes(app)

app.listen(port, () => console.log(`Server on ${port}.`))


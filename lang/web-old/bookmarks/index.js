const path = require('path')
const slug = require('slug')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PouchDB = require('pouchdb')
const port = process.env.PORT || 5555

const db = PouchDB('db')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride())
app.use(bodyParser.json())
app.use(morgan('dev'))

const sendError = (res, err) => res.status(500).send(err)

app.get('/api', (req, res) => { res.send('hello') })

app.get('/api/bookmarks', (req, res) => {
  const allBookmarks = (doc, emit) => {
    if (doc.type === 'bookmark') {
      emit(doc._id, null)
    }
  }

  db.query(allBookmarks, { include_docs: true }, (err, data) => {
    if (err) sendError(res, err)
    else res.send({ rows: [ ...data.rows ] })
  })
})

app.post('/api/bookmarks', (req, res) => {
  const bookmark = req.body
  if (!bookmark || !bookmark.link) {
    res.status(400).send('Malformed bookmark.')
  } else {
    const id = slug(bookmark.link)
    db.get(id, (err, doc) => {
      if (err && err.status !== 404) {
        sendError(res, err)
      } else if (doc) {
        res.status(400).send('Bookmark already exists.')
      } else {
        bookmark.type = 'bookmark'
        bookmark._id = id
        db.put(bookmark, (err, bm) => {
          if (err) sendError(res, err)
          else res.send(bm)
        })
      }
    })
  }
})

app.delete('/api/bookmarks/:id', (req, res) => {
  const { id } = req.params
  db.get(id, (err, doc) => {
    if (err) sendError(res, err)
    if (err) res.status(500).send(err)
    else if (doc === null) res.status(400).send('Bookmark does not exist.')
    else {
      db.remove(doc, (err) => {
        if (err) sendError(res, err)
        else res.sendStatus(204)
      })
    }
  })
})

app.listen(port, () => { console.log(`listening on ${port}`) })

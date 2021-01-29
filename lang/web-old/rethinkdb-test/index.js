const r   = require('rethinkdb')
let   cxn = null

r.connect({host : '127.0.0.1', port : 28015}, (err, conn) => {
  if (err) {
    throw err
  }
  cxn = conn
})

r.db('test').tableCreate('people').run(cxn, (err, result) => {
  if (err) {
    throw err
  }
  console.log(JSON.stringify(result, null, 2))
})

// this will return a tables_created (1) and config_changes (metadata about the new table)

r.table('people').insert([
  {
    name       : 'Z'
  , occupation : 'student'
  , posts      : [
      {title : 'foo'  , content : 'so muchblahblahblah'}
    , {title : 'bar'  , content : 'words words words'}
    , {title : 'quux' , content : 'baz'}
    ]
  },{
    name       : 'asdf'
  , occupation : 'god'
  , posts      : [
      {title : 'let there be' , content : 'stuff'}
    , {title : 'and i said'   , content : 'it was aight'}
    ]
  }
]).run(cxn, (err, result) => {
  if (err) {
    throw err
  }
 console.log(JSON.stringify(result, null, 2))
})
// if no database is set, it defaults to 'test' here.
// `insert` takes a single document, or an array of documents.

// retrieving _all_ in a table
r.table('people').run(cxn, (err, cursor) => {
  if (err) {
    throw err
  }
  cursor.toArray((err, result) => {
    if (err) {
      throw err
    }
    console.log(JSON.stringify(result, null, 2))
  })
})

// filtering
r.table('people').filter(r.row('name').eq('god'))
.run(cxn, (err, cursor) => {
  if (err) {
    throw err
  }
  cursor.toArray((err, result) => {
    if (err) {
      throw err
    }
    console.log(JSON.stringify(result, null, 2))
  })
})

// another example would be
// ....filter(r.row('posts').count().gt(2))

// to get by key (uniq):
// .get('asdf-4834983948-klasdfjf8-8234234').run--etc.

// this is the exciting bit--the realtime shiz.
// rethink can continuously be pushing updated results to an app

r.table('people').changes().run(cxn, (err, cursor) => {
  if (err) {
    throw err
  }
  cursor.each((err, row) => {
    if (err) {
      throw err
    }
    console.log(JSON.stringify(row, null, 2))
  })
})

// new fields
r.table('people').update({type : 'awesome'})

// ...all together, now!
r.table('people')
  .filter(r.row('name')
  .eq('Z'))
  .update({awesomenesslevel : 'over 9000'})
  .run(cxn, (err, result) => {
    if (err) {
      throw err
    }
    console.log(JSON.stringify(result, null, 2))
  })

// and finally, get rid of that other dude
// r.table('people').filter(r.row('posts').count().lt(2))
//   .delete().run(cxn//etc


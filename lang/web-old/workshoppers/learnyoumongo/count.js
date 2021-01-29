var mongo = require('mongodb').MongoClient
	, url = 'mongodb://127.0.0.1:27017/learnyoumongo'
	, age = process.argv[2]

mongo.connect(url, function(err, db){
  if (err) throw err
  var parrots = db.collection('parrots')
  parrots.count({
    age: {
      $gt: +age
    }
  }, function(err, count){
  if (err) throw err
  console.log(count)
  db.close()
  })
})


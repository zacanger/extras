var mongo = require('mongodb').MongoClient
	, firstName = process.argv[2]
	, lastName = process.argv[3]
	, url = 'mongodb://127.0.0.1:27017/learnyoumongo'
	, doc = {
			firstName: firstName
		,	lastName: lastName
}

mongo.connect(url, function(err, db){
	if (err) throw err
	var collection = db.collection('docs')
	collection.insert(doc, function(err, data){
		if (err) throw err
		console.log(JSON.stringify(doc))
		db.close()
	})
})


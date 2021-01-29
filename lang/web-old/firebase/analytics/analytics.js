var analytics				 = new Firebase('https://dm7.firebaseio.com/')
  , activeVisitors   = analytics.child('activeVisitors')
  , totalVisitors    = analytics.child('totalVisitors')

var visitor = {
	path			: window.location.pathName
, arrivedAt : Firebase.ServerValue.TIMESTAMP
, userAgent : navigator.userAgent
}

var activeVisitorRef  = activeVisitors.push(visitor, function(){
	activeVisitors.child(visitorId).once('value', function(snapshot){
		visitor.arrivedAt = snapshot.child('arrivedAt').val()
		var pastVisitors  = analytics.child('pastVisitors')
		visitor.leftAt    = Firebase.ServerValue.TIMESTAMP
		pastVisitors.child(visitorId).onDisconnect().set(visitor)
	})
})

// .TIMESTAMP-better than new Date() because of inconsistencies
// in client-side clocks-Firebase will replace with internal time
// activeVisitors.push({
// 	path: window.location.pathname
// , arrivedAt: Firebase.ServerValue.TIMESTAMP
// , userAgent: navigator.userAgent
// })

// .once-new listener, only receives once, then stops listening
// cb is called with a 'DataSnapshot', which is immutable
// copy of FB data. val returns data at snapshot, name returns
// key.
// totalVisitors.once('value', function(snapshot){
//   totalVisitors.set(snapshot.val() + 1)
// })

// this is better, though-transaction is literally like a
// transaction in a real db. reference's value is the arg,
// and we return the new value it should be
totalVisitors.transaction(function(currentData){
	return currentData + 1
})



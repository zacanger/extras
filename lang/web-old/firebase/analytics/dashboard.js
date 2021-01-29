$(document).on('ready', function(){
	var $totalVisitors = $('#totla-visitors')
	analytics.child('totalVisitors').on('value', function(snapshot){
		$totalVisitors.text(snapshot.val())
	})
})


var $activeVisitors = $('#active-visitors')
  , activeVisitors  = analytics.child('activeVisitors')
  , pastVisitors    = analytics.child('pastVisitors').endAt().limit(5)

activeVisitors.on('child_added', function(snapshot){
	var n = snapshot.name()
	  , v = snapshot.val()
	$activeVisitors.prepend(
		'<li id="active-visitor' + n + '">' + n + ':' +
			'<ul>' +
				'<li>arrived: ' + new Date(v.arrivedAt) + '</li>' +
				'<li>path: ' + v.path '</li>' +
				'<li>user agent: ' + v.userAgent + '</li>' +
			'</ul>' +
		'</li>'
	)
})

activeVisitors.on('child_removed', function(snapshot){
	$('#active-visitor' + snapshot.name()).remove()
})

pastVisitors.on('child_added', function(snapshot){
	var n = snapshot.name
	  , v = snapshot.val()
	$pastVisitors.prepend(
	  '<li id="past-visitor' + n + '">' + n + ':' +
      '<ul>' +
        '<li>arrived: ' + new Date(v.arrivedAt) + '</li>' +
        '<li>left: ' + new Date(v.leftAt) + '</li>' +
        '<li>spent: ' + ((v.leftAt - v.arrivedAt) / 1000) + ' seconds </li>' +
        '<li>path: ' + v.path + '</li>' +
        '<li>user agent: ' + v.userAgent + '</li>' +
      '</ul>' +
    '</li>'
	)
})

pastVisitors.on('child_removed', function(snapshot){
	$('#past-visitor' + snapshot.name()).remove()
})

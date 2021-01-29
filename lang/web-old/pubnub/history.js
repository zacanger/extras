function pub(){
  for (var i = 0; i < 100; i++){
    pubnub.publish({
      channel: 'history'
    , message: 'ho'
    })
  }
}
fubnub.subscribe({
  channel: 'history'
, message: function(m){console.log(JSON.stringify(m))}
,connect: pub()
})

pubnub.history({
  channel    : 'history'
, callback   : function(m){console.log(JSON.stringify(m))}
, count      : 5
, start      : 1451563140
, end        : 1451606490
, reverse    : false
})

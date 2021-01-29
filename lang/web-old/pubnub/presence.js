// so, this is how we set a uuid
var pubnub = PUBNUB({
  publish_key   : 'demo'
, subscribe_key : 'demo'
, uuid          : 'Yyoouuuu'
})

// and this is how we track the basic (provided) events
pubsub.subscribe({
  channel  : 'fooey_bari'
, presence : function(m){console.log(m)}
, message  : function(m){console.log(m)}
})

pubnub.here_now({
  channel  : 'fooey_bari'
, callback : function(m){console.log(m)}
})

// here's one that's global! just skip that'channel' bit!
pubnub.here_now({callback:function(m){console.log(m)}})

pubnub.where_now({
  uuid     : 'Yyoouuuu'
, callback : function(m){console.log(m)}
, error    : function(m){console.log(m)}
})

// setting state
pubnub.state({
  channel    : 'fooey_bari'
, uuid       : 'Yyoouuuu'
, state: {'mah_nemm' : 'zerk ernger'}
})

// subscribe()
pubnub.subscribe({
  channel    : 'fooey_bari'
, message    : function(message){console.log('message)')}
, state      : {
    age      :  20
  , full     : 'Geordyn Ader'
  , country  : 'this_one'
  , appstate : 'forground'
  , latlog   : 'random coordinaates here!'
  }
})

// in the above case the 'join' would include state information, something like:
{
  "action"   : "join",
  "timestamp": 1345546797,
  "occupancy": 2,
  "uuid"     : "sdfasdf545--sdf56asd4f-sd5fa3s5df4asd53f4sdf32dfs--352sdf45fw5a84894889483434",
  data"      : {
    "age": 20,
    "full": "Geordyn Ader",
    "country": "this_one",
    "appstate": "foreground",
    "latlog": "random coordinates here!"
  }
}

// using `here_now()` and `where_now()` to customise our reponse
{
  "status": 200,
  "message": "OK",
  "service" : "things",
  "uuids": {
    
  }

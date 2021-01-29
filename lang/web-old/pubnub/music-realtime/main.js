var SoundArray = []
  , record     = false
  , play       = false
  , startTime  = 0

function playSound(buton){
  new Audio(button + '.mp3').play()
}

$(document).ready(function(){
  $('#record').click(function(){
    if (record){
      $(this).css('background','none')
      record = false
      play   = false
      updateBeats()
      saveToPase()
    } else {
      $(this).css('background','red')
      record    = true
      play      = true
      startTime = Date.now()
      playBack()
    }
  })
  $('#play').click(function(){
    if (play){return}
    play = true
    playBack()
  })
  $('#stop').click(function(){
    if (play || record){
      if (record){
        $('#record').css('background','none')
        record = false
        updateBeats()
      }
      play = false
    }
  })
})
function playBack(){
  if (!record){
    startTime = Date.now()
  }
  function playItBack(idx){
    setTimeout(function(){
      var item = SoundArray[idx]
      if (!play || idx >= SoundArray.length){
        play = false
        return
      }
      while(Date.now() - startTime < item.time){
        playItBack(idx)
        return
      }
      playSound(item.button)
      playItBack(idx+1)
    }, 5)
  }
  playItBack(0)
}
function soundClick(button){
  if (record){
    var elapsed = Date.now() - startTime
    publishBeat(elapsed, button)
    updateBeats()
  }
  playSound(button)
}
function playSound(button){
  new Audio(button + '.mp3').play()
}
function compare(a, b){
  if (a.time < b.time)
    return -1
  if (a.time > b.time)
    return 1
  return 0
}
function updateBeats(){
  SoundArray.sort(compare)
  var html = '<tr><th>time</th><th>button</th></tr>'
  for (var i = 0; i < SoundArray.length; i++){
    html+='<tr><td>' + SoundArray[i].time + ':</td><td>' + SoundArray[i].button + '</td></tr>'
  }
  $('#beats').html(html)
}

pubnub = PUBNUB({
    publish_key   : 'pub-c-cad51dff-d9a7-4916-b0f3-a56ea34f689a'
  , subscribe_key : 'sub-c-d01e5bea-af75-11e5-ae71-02ee2ddab7fe'
})

function subscribeTo(){
  pubnub.subscribe({
    channel: 'demo',
    message: function(m){
      // data button and time set to received message
      var data = {button: m.button, time: m.time}
      SoundArray.push(data)
      updateBeats()
    },
    connect: function(m){
      // on sub, load a song from parse
      loadFromParse()
    },
    conect: function(error){
      console.log(JSON.stringify(error))
    }
  })
}

function pubInit(){
  subscribeTo()
}
pubInit()

function publishBeat(time, button){
  pubnub.publish({
      channel: 'demo'
    , message: {time:time, button:button}
    , callback : function(m){console.log(m)}
  })
}

function loadFromParse(){
  SoundArray.length = 0
  var SoundObject = Parse.Object.extend('Sounds')
    , query = new Parse.Query(SoundObject)
  query.find({
    success: function(song){
      if (song.length){
        for (var i = 0; i < song.length; i++){
          SoundArray = song[i].get('SoundAndTime')
        }
      }
      updateBeats()
    }
  })
}

function saveToParse(){
  var SoundObject = Parse.Object.extend('Sounds')
    , query = new Parse.QUery(SoundObject)
    query.first({
      success: function(song){
        if (song){
          song.save(null, {
            success: function(songSave){
              songSave.set('SoundAndTime', SoundArray)
              songSave.save()
            }
          })
        }
        else {
          var soundObject = new soundObject()
          soundObject.set('SoundAndTime', SoundArray)
          soundObject.save()
        }
      }
    })
}

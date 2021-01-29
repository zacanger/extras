var meta = document.getElementsByTagName('meta')
var i

if(navigator.userAgent.match(/iPhone/i)){
  for(i = 0; i < meta.length; i++){
    if(meta[i].name == 'viewport'){
      meta[i].content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0'
    }
  }
  document.addEventListener('gesturestart', gestureStart, false)
}

function gestureStart(){
  for(i = 0; i < meta.length; i++){
    if(meta[i].name == 'viewport'){
      meta[i].content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6'
    }
  }
}

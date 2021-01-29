console.log('promise started')
function myPromise(random){
  return new Promise(
    function(resolve, reject){
      console.log('promise started')
      function decideStatus(){
        // resolve with fulfilled if random number > 0.5
        // reject otherwise
        (random > 0.5) ? resolve('fulfilled') : reject('rejected')
      }
      setTimeout(decideStatus, random * 3000)
    }
  )
}

// resolve -- then; reject -- catch
myPromise(math.random())
.then(
  function(status){console.log('promise ' + status)
})
.catch(function(status){
  console.log(status)
})
console.log('promise finished')


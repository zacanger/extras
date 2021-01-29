const saveData = (() => {
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  return function (data, fileName) {
    let
      json = JSON.stringify(data)
    , blob = new Blob([json], {type : 'octet/stream'})
    , url  = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
}())

// test
let
  data     = {x : 42, s : 'yo', d : new Date()}
, fileName = 'sup.json'

saveData(data, fileName)

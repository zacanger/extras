function bytesToSize(bytes){
  var size = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if(bytes === 0){return '0 Bytes'}
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes
}

// or...

function formatBytes(bytes, decimals){
  if(bytes === 0){return '0 Bytes'}
  var k     = 1000
    , dm    = decimals + 1 || 3
    , sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    , i     = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i]
}


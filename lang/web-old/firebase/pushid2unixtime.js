// converting firebase push id into unix timestamp

// functional version
var getTimestampFromId = (function(){
  var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  return function getTime(id){
    return id.substr(0, 8)              // Only the first 8 bytes are deterministic
      .split('')                        // We're going to operate on each index and combine the result
      .map(function(cur){               // Convert each character to it's numeric value
        return PUSH_CHARS.indexOf(cur);
      })
      .reduce(function(prev, cur){      // Combine all numeric values into a single integer (timestamp)
        return prev * 64 + cur;
      });
  }
})();

// a bit more imperative -- significantly faster. like _significantly_.
var getPushIdTimestamp = (function getPushIdTimestamp(){
  var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  return function getTimestampFromId(id) {
    var time = 0;
    var data = id.substr(0, 8);
    for(var i = 0; i < 8; i++){
      time = time * 64 + PUSH_CHARS.indexOf(data[i]);
    }
    return time;
  }
})();


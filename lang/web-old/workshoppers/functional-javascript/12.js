const spy = function(tar, met){
  let
    o   = tar[met]
  , res = {c : o}

  tar[met] = function() {
    res.c++
    return o.apply(this,arguments)
  }
  return res
}
module.exports = spy


// simplest templating system EVAR.
// it's also kinda gross. so. yeah.

String.prototype.tmpl = function(dic, parentKey){
  var src = this
  for(var key in dic){
    var _key = (parentKey ? parentKey + '.' : '') + key
    if (typeof dic[key] == 'object') src = src.tmpl(dic[key], _key)
    else src = src.replace(new RegExp('{' + _key + '}', 'g'), dic[key])
  }
  return src
}


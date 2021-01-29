// gh:stolksdorf/bling.js

window.$ = document.querySelectorAll.bind(document)

Node.prototype.on = function(name, fn){
  this.addEventListener(name, fn)
  return this
}

Node.prototype.find = function(query){
  return this.querySelectorAll(query)
}

NodeList.prototype.__proto__ = Array.prototype

NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn){
  this.forEach(function(elem, i){
    elem.on(name, fn)
  })
  return this
}

// classes
Node.prototype.addClass = function(cn){
  this.classList.add(cn)
  return this
}
Node.prototype.removeClass = function(cn){
  this.classList.remove(cn)
  return this
}
Node.prototype.toggleClass = function(cn){
  this.classList.toggle(cn)
  return this
}
Node.prototype.hasClass = function(cn){
  return this.classList.contains(cn)
}

// ajax
$.get = function(url, onSuccess, onError){
  onError = onError || function(){}
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange=function(){
    if (xhr.readyState==4){
      if(xhr.status==200){ onSuccess(xhr.responseText) }
      else{ onError(xhr.statusText) }
    }
  }
  xhr.open("GET",url,true)
  xhr.send()
}

$.post = function(url, data, onSuccess, onError){
  data = data || {}
  onError = onError || function(){}
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange=function(){
    if (xhr.readyState==4){
      if(xhr.status==200){ onSuccess(xhr.responseText) }
      else{ onError(xhr.statusText) }
    }
  }
  xhr.open("POST",url,true)
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  xhr.send(JSON.stringify(data))
}

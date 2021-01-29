#!/usr/bin/env node

'use strict'

// npm i -S mustache

const
  fs            = require('fs')
, url           = require('url')
, http          = require('http')
, qs            = require('querystring')
, moustache     = require('mustache')
, template      = '<html><head><title>{{title}}</title></head><body>{{{content}}}</body></html>'
, port          = process.env.PORT || 3000
, index_view    = {title : 'time', content : form}
, add_time_view = {title : 'time', content : 'success'}
, router = {'/' : indexAction, '/addTime' : addTimeAction}

function form(){
  return '<div id="container"> \
    <form method="post" action="/addTime"> \
      <ul> \
        <li> \
          <label for="element_1"></label> \
          <div><input name="activity" type="text" value=""></div> \
        </li> \
        <li><input type="submit" name="submit" value="Submit"></li> \
      </ul> \
    </form> \
  </div>'
}

function indexAction(req){
  return moustache.render(template, index_view)
}

function addTimeAction(req){
  var formData = null
  req.addListener('data', (post) => {
    formData = qs.parse(post.toString())
  })

  fs.open('timesheet.txt', 'a', (er, fd) => {
    let timeStamp = Math.round(new Date().getTime() / 1000)
    fs.write(fd, timeStamp + ':' + formData['activity'] + '\n', null)
  })

  return moustache.render(template, add_time_view)
}

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html'})
  let
    reqPath = url.parse(req.url).pathname
  , html    = router[reqPath](req)
  res.end(html)
}).listen(port, () => {console.log('listening on', port)})


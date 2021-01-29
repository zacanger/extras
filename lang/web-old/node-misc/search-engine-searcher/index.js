const
  http    = require('http')
, url     = require('url')
, request = require('request')
, cheerio = require('cheerio')
, async   = require('async')
, port    = process.env.PORT || 9999

const fetch = (url, cb) => {
  request.get(url, (err, response, body) => {
    if (err) {
      cb(err)
    } else {
      cb(null, body)
    }
  })
}

const handleRequest = (req, res) => {
  const search = {
    google : []
  , ddg    : []
  , bing   : []
  }
  const path = url.parse(req.url).path
  const query = path.split('/')[1]
  const urls = [
    `https://www.google.com/search?q=${query}`
  , `https://duckduckgo.com/search?q=${query}`
  , `https://www.bing.com/search?q=${query}`
  ]

  async.map(urls, fetch, (err, results) => {
    if (err) {
      res.end(err)
    } else {
      const google = results[0]
      const $google = cheerio.load(google)
      $google('.r a').each((i, link) => {
        let url = $google(link).attr('href')
        url = url.replace('/url?q=', '').split('&')[0]
        if (url.charAt(0) === '/') {
          return
        }
        search.google.push(url)
      })

      const ddg = results[1]
      const $ddg = cheerio.load(ddg)
      $ddg('h2 a').each((i, link) => {
        var url = $ddg(link).attr('href')
        if (url.charAt(0) === '/') {
          return
        }
        search.ddg.push(url)
      })

      const bing = results[2]
      const $bing = cheerio.load(bing)
      $bing('h2 a').each((i, link) => {
        const url = $bing(link).attr('href')
        search.bing.push(url)
      })

      res.end(JSON.stringify(search))
    }
  })
}

const server = http.createServer(handleRequest)
server.listen(port, () => console.log(`listening on ${port}`))

// modified from gh:noidontdig
// npm i -S trello
const http = require('http')
const Trello = require('trello')
// To get a new token (2nd param), use the following with the key (1st param)
// https://trello.com/1/connect?key=[KEY]&name=[APP]&response_type=[TOKEN]
const trello = new Trello('5432cca712663538d2919e8eb8f85177', '0b08460f3e00c9bacaf4085e6969dfaf0b4b57932e0b6373f56f77263aa0961c')
const port = process.env.PORT || 9999

const handleRequest = (req, res) => {
  const boardId = '4eca8bb6ed3e63a2d111784a'

  trello.getListsOnBoard(boardId, (error, lists) => {
    const listId = lists[7].id

    trello.getCardsOnList(listId, (error, cards) => {
      const sorted = []
      cards.forEach((card) => {
        sorted.push(card.name)
      })

      sorted.sort()

      let html = ''
      sorted.forEach((shipped) => {
        html += shipped + '</br>'
      })

      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(html)
    })
  })
}

const server = http.createServer(handleRequest)

server.listen(port, () => console.log(`listening on ${port}`))

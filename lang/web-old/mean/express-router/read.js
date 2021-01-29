const router = require('express').Router()

function getName('req, res'){
  res.send('zac')
}
function getEmail('req, res'){
  res.send('zac@zacanger.com')
}

router
.get('/name', getName)
.get('/email', getEmail)

module.exports = router


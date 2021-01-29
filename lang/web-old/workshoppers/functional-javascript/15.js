module.exports = (uids, load, done) => {
  let
    compl = 0
  , users = []

  uids.forEach((id, idx) => {
    load(id, user => {
      users[idx] = user
      if (++ compl === uids.length) {
        return done(users)
      }
    })
  })
}


const get = users => users.filter(user => user.loggedIn).map(user => user.id)
module.exports = get


const { template } = require('lodash')

const t = input => {
  const someT = 'Hello <%= name %> (logins: <%= login.length %>)'
  return template(someT)(input)
}

module.exports = t

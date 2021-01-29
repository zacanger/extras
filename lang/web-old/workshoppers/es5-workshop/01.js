function check(goods){
  return function(subs){
    return subs.every(function(user){
      return goods.some(function(good){
        return good.id === user.id
      })
    })
  }
}
module.exports = check


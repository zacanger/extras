// from nicholas c zakas's blog

const newProxiedObj = tar => {
  return new Proxy(tar, {
    get (tar, prop) {
      if (prop in tar) {
        return tar[prop]
      } else {
        throw new ReferenceError(`Property '${prop}' does not exist!`)
      }
    }
  })
}

// usage example
const
  me  = {name : 'z', age : 26}
, moi = newProxiedObj(me)
console.log(moi.name)
console.log(moi.age)
console.trace(moi.locale)

// and to keep it basically immutable
Object.preventExtensions(me)
let z = newProxiedObj(me)
z.locale = 'ut' // err

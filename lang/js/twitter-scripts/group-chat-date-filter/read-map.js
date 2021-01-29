const fs = require('fs')
const betterMap = Object.assign(...fs.readFileSync('./usernames-map.txt').toString()
  .split('\n')
  .map((pair) => {
    const [id, username] = pair.split(' ')
    return { [id]: username }
  }))

fs.writeFileSync('./ids-by-username.json', JSON.stringify(betterMap, null, 2))

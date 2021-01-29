const map = require('./final')

const sortable = []
for (const m in map) {
  sortable.push([m, map[m]])
}

sortable.sort((a, b) => new Date(a[1]) - new Date(b[1]))

const obj = {}
sortable.forEach((i) => {
  obj[i[0]] = i[1]
})

require('fs').writeFileSync('./final-sorted.json', JSON.stringify(obj, null, 2))

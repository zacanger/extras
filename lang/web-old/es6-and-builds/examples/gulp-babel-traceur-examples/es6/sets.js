class Departments {

  constructor() {
    this._depts = new Set()
  }

  addDepartment(dept) {
    if (!this._depts.has(dept)) {
      this._depts.add(dept)
    }
    else {
      console.log('duplicate was blocked: ' + dept)
    }
  }

  removeDepartment(dept) {
    this._depts.delete(dept)
  }

  clearDepartments() {
    this._depts.clear()
  }

  getSet() {
    return this._depts
  }
}

// example
var set = new Set()
set.add('HR')
set.add('Finance')
set.add('Finance') // duplicate
set.add({name : 'GIS', desc : 'Mapping'})
console.log(set.size)
if (set.has('Finance')) {
  console.log('found')
}
set.delete('Finance') // delete single item
set.clear()           // clear all items


// which wrapping a set
var depts = new Departments()
depts.addDepartment('HR')
depts.addDepartment('Finance')
depts.addDepartment('Finance')

let allDepts = depts.getSet()

//Iterate through the set
allDepts.forEach(function(dept) {
  console.log('found department using forEach ' + dept)
})

console.log('\n')

allDepts.forEach(dept => console.log('Found department using forEach ' + 'with arrow function: ' + dept))

console.log('\n')
for (let dept of allDepts) {
  console.log('found department using for of loop: ' + dept)
}

let val = allDepts.values().next().value
console.log(val)

// add current set to new one using value
console.log('\n')
var values = allDepts.values
var depts2 = new Set(allDepts)
depts2.forEach(function(dept) {
  console.log('iterating through depts2 values: ' + dept)
})

depts.clearDepartments()
console.log('\nclearing all departments. size is now: ' + depts.getSet().size)

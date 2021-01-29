const _ = require('underscore')

module.exports = Tree = () => {
  this.data = {
    type  : null
  , value : null
  }
  this.children = []
}

Tree.prototype.setType = val => {
  this.data.type = val
}

Tree.prototype.setValue = (val) => {
  this.data.value = val
}

Tree.prototype.get = attr => this.data[attr]


Tree.prototype.insert = tree => {
  this.children.push(tree)
}

Tree.prototype.toStr = () => {
  let val = this.get('value')
  switch(this.get('type')){
  case 'number':
    return parseFloat(val)
    break
  case 'string':
  case 'keyword':
    return val
    break
  case 'array':
    let args = _.map(this.children, child => child.toStr())
    return JSON.stringify(args)
  case 'function':
    var args = _.map(this.children, child =>  child.toStr())
    return '('+ val + ' ' + args.join(' ') + ')'
    break
  }
}


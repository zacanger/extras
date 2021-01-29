// provides cj.stringify() and cj.parse(), which do what you'd expect
// a rewrite of http://stevehanov.ca/blog/index.php?id=104

// keep track of object types that we have seen in a tree.
class Node {
  constructor (parent, key) {
    this.parent = parent
    this.key = key
    this.children = []
    this.templateIndex = null
    this.links = []
  }

  follow (key) {
    if (key in this.children) {
      return this.children[key]
    }
    this.children[key] = new Node(this, key)
    return this.children[key]
  }
}

// Given the root of the key tree, process the value possibly adding to the key tree.
const process = (root, value) => {
  let result
  let i
  let key
  let node

  if (typeof value === 'object') {
    // if it's an array,
    if (Object.prototype.toString.apply(value) === '[object Array]') {
      // process each item in the array.
      result = []
      for (i = 0; i < value.length; i++) {
        result.push(process(root, value[i]))
      }
    } else {
      node = root
      result = { '': [] }
      // it's an object. For each key,
      for (key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
          // follow the node.
          node = node.follow(key)

          // add its value to the array.
          result[''].push(process(root, value[key]))
        }
      }

      node.links.push(result)
    }
  } else {
    result = value
  }

  return result
}

// Given the root of the key tree, return the array of template arrays.
const createTemplates = (root) => {
  let templates = []
  let queue = []
  let node
  let template
  let cur
  let i
  let key
  let numChildren

  root.templateIndex = 0

  for (key in root.children) {
    if (Object.hasOwnProperty.call(root.children, key)) {
      queue.push(root.children[key])
    }
  }

  // while queue not empty
  while (queue.length > 0) {
    // remove a ode from the queue,
    node = queue.shift()
    numChildren = 0

    // add its children to the queue.
    for (key in node.children) {
      if (Object.hasOwnProperty.call(node.children, key)) {
        queue.push(node.children[key])
        numChildren += 1
      }
    }

    // if the node had more than one child, or it has links,
    if (numChildren > 1 || node.links.length > 0) {
      template = []
      cur = node

      // follow the path up from the node until one with a template id is reached
      while (cur.templateIndex === null) {
        template.unshift(cur.key)
        cur = cur.parent
      }

      template.unshift(cur.templateIndex)

      templates.push(template)
      node.templateIndex = templates.length

      for (i = 0; i < node.links.length; i++) {
        node.links[i][''].unshift(node.templateIndex)
      }
    }
  }

  return templates
}

const stringify = (value) => {
  let root
  let templates
  let values

  root = new Node(null, '')
  values = process(root, value)
  templates = createTemplates(root)

  return templates.length > 0
    ? JSON.stringify({ f: 'cjson', t: templates, v: values })
    : JSON.stringify(value) // no templates so no compression is possiblw
}

const getKeys = (templates, index) => {
  let keys = []

  while (index > 0) {
    keys = templates[index - 1].slice(1).concat(keys)
    index = templates[index - 1][0]
  }

  return keys
}

const expand = (templates, value) => {
  let result
  let i
  let keys

  // if it's an array, then expand each element of the array.
  if (typeof value === 'object') {
    if (Object.prototype.toString.apply(value) === '[object Array]') {
      result = []
      for (i = 0; i < value.length; i++) {
        result.push(expand(templates, value[i]))
      }
    } else {
      // if it's an object, then recreate the keys from the template and expand.
      result = {}
      keys = getKeys(templates, value[''][0])
      for (i = 0; i < keys.length; i++) {
        result[keys[i]] = expand(templates, value[''][i + 1])
      }
    }
  } else {
    result = value
  }

  return result
}

const parse = (s) => {
  const value = JSON.parse(s)
  return (typeof value !== 'object' || !('f' in value) || value['f'] !== 'cjson')
    ? value // not cjson; return as is
    : expand(value['t'], value['v'])
}

module.exports = { parse, stringify }

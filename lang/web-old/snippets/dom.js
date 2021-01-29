class Node {
  constructor (name, attrs) {
    this.name = name
    this.attrs = attrs
    this.children = []
  }

  append (node) {
    node.parent = this
    this.children.push(node)
  }

  * traverse (node = this) {
    yield node
    for (let child of node.children) {
      yield * this.traverse(child)
    }
  }

  toString (node = this) {
    let out = '<' + node.name
    let attrs = []

    for (let key in node.attrs) {
      if (node.attrs.hasOwnProperty(key)) {
        attrs.push(` ${key}="${node.attrs[key]}"`)
      }
    }

    out += attrs.join('') + '>'

    for (let child of node.children) {
      out += this.toString(child)
    }

    out += `</${node.name}>`
    return out
  }
}

const html = new Node('html')
const body = new Node('body', { style: 'background-color: black; color: white;' })
html.append(body)

console.log(html.toString())

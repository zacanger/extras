/** @jsx h */

const render = (node) => {
  if (typeof node === 'string') {
    document.createTextNode(node)
    return
  }

  let n = document.createElement(node.nodeName)

  Object.keys(node.attributes || {}).forEach((k) => {
    n.setAttribute(k, node.attributes[k])
  })

  ;(node.children || []).forEach((c) => {
    n.appendChild(render(c))
  })

  return n
}

// eslint-disable-next-line no-unused-vars
const h = (nodeName, attributes = {}, ...children) => ({
  nodeName, attributes, children
})

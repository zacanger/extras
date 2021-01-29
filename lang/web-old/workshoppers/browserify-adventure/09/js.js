const { readFileSync } = require('fs')
const domify = require('domify')
const insertcss = require('insert-css')
const inherits = require('inherits')
const EE = require('events').EventEmitter
const html = readFileSync(__dirname + '/html.html', 'utf8')
const css = readFileSync(__dirname + '/css.css', 'utf8')

insertcss(css)
module.exports = W

inherits(W, EE)

function W () {
  const self = this

  if (!(this instanceof W)) {
    return new W
  }

  const form = this.element = domify(html)

  form.addEventListener('submit', e => {
    e.preventDefault()
    const msg = form.querySelector('textarea[name="msg"]').value
    self.emit('message', msg)
  })
}

W.prototype.appendTo = function (t) {
  t.appendChild(this.element)
}

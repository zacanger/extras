const domify = require('domify')
const markup = '<div>Hello <span class="name"></span>!</div>'

function Widget () {
  if (!(this instanceof Widget)) {
    return new Widget
  }
}

Widget.prototype.setName = function (name) {
  this.element.querySelector('.name').textContent = name
}

Widget.prototype.appendTo = function (tgt) {
  tgt.appendChild(this.element)
}

module.exports = Widget

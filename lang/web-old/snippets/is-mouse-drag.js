// assumes jq or somesuch
let isMouseDrag
const element = document.getElementsByTagName('body')
element('body').on('mousedown', (e) => {
  element('body').on('mouseup mousemove', function h(e) {
    if (e.type === 'mouseup') {
      isMouseDrag = false
    } else {
      isMouseDrag = true
    }
    element('body').off('mouseup mousemove', h)
  })
})

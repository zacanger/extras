document.querySelector('.some-selector').onclick = (ev) => {
  const range = window.document.createRange()
  range.selectNode(ev.target)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)
  const success = window.document.execCommand('copy')
}

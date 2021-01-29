// adapted from code in npm's site's source
// thanks, devtools
import React, { PureComponent } from 'react'
import { node } from 'prop-types'

// NOTE: selecting on mouse enter will overwrite X primary selection!

export default class Copy extends PureComponent {
  static propTypes = {
    children: node.isRequired
  }

  select = (ev) => {
    const range = window.document.createRange()
    range.selectNode(ev.target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
  }

  deselect = () => {
    window.getSelection().removeAllRanges()
  }

  copy (ev) {
    this.select(ev)
    const success = window.document.execCommand('copy')
    if (success) {
      console.log('copied!')
    }
  }

  render () {
    return (
      <span
        onMouseEnter={this.select}
        onMouseLeave={this.deselect}
        onClick={this.copy}>
        {this.props.children}
      </span>
    )
  }
}
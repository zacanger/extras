// mostly working
// fork of https://gist.github.com/saifelse/a7bae208737b283a21aa7b25565f4df1
// which was in coffeescript using old react (createClass)
// import into your thing and invoke

import React, { createElement, Component } from 'react'
import Perf from 'react-addons-perf'
import { render } from 'react-dom'

export default class RecordPerfButton extends Component {
  state = { recording: false }
  hasRendered = false

  static attachToDOM () {
    if (this.hasRendered) return
    this.hasRendered = true
    document.addEventListener('DOMContentLoaded', () => {
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.top = 0
      container.style.zIndex = 9999
      const node = document.body.appendChild(container)
      render(createElement(RecordPerfButton), container)
    })
  }

  toggleRecord = () => {
    if (!this.state.recording) {
      Perf.start()
      window.Perf = Perf
      this.setState({ recording: true })
    } else {
      Perf.stop()
      Perf.printWasted()
      this.setState({ recording: false })
    }
  }

  mouseDownHandler = (e) => {
    e.preventDefault()
  }

  handleKeyDown = (e) => {
    if (e.altKey) {
      this.toggleRecord()
    }
  }

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  render () {
    return (
      <div
        onMouseDown={this.mouseDownHandler}
        onClick={this.toggleRecord}
        style={{
          backgroundColor: this.state.recording ? 'red' : 'grey'
        , borderRadius: 15
        , display: 'inline-block'
        , height: 30
        , marginLeft: 13
        , marginTop: 13
        , width: 30
        }}
      />
    )
  }
}

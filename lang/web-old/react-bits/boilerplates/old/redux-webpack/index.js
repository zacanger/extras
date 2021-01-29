import React, { Component } from 'react'
import { render } from 'react-dom'

export class App extends Component {
  render() {
    return (
      <div className="foo">
        Hello!
      </div>
    )
  }
}

const root = document.getElementById('root')

render(<App />, root)

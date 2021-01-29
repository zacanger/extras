import React, { Component } from 'react'

export default class Click extends Component {
  state = { clickCount: 0 }
  handleClick = () => {
    this.setState({ clickCOunt: this.state.clickCount + 1 })
  }
  render () {
    return (
      <button onClick={this.handleClick}>
        clicked {this.state.clickCount} times
      </button>
    )
  }
}

import React, { Component } from 'react'

export default class AddItem extends Component {
  constructor (props) {
    super(props)
    this.state = { item: '' }
    this.handleChange = this._handleChange.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChange (e) {
    this.setState({ item: e.target.value })
  }

  _handleSubmit (e) {
    if (e.keyCode === 13) {
      this.props.add(this.state.item)
      this.setState({ item: '' })
    }
  }

  render () {
    return (
      <div>
        <input
          type="text"
          value={this.state.item}
          placeholder="do a thing!"
          onKeyDown={this.handleSubmit}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

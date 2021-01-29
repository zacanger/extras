import React, { Component } from 'react'
import Input from './Input'
import marked from 'marked'
import markdownString from './gfm'

export default class Display extends Component {
  constructor (props) {
    super(props)
    this.state = { value: markdownString }
    this.updateValue = this._updateValue.bind(this)
    this.rawMarkup = this._rawMarkup.bind(this)
  }

  _updateValue (newValue) {
    this.setState({ value: newValue })
  }

  _rawMarkup (val) {
    const markup = marked(val, {
      gfm: true
    , sanitize: true
    , tables: true
    })
    return { __html: markup }
  }

  render () {
    return (
      <div>
        <Input
          value={this.state.value}
          onChange={this.updateValue}
        />
        <span
          dangerouslySetInnerHTML={this.rawMarkup(this.state.value)}
          className='preview'
        />
      </div>
    )
  }
}

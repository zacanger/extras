import React, { Component } from 'react'
import AddItem from './AddItem'
import List from './List'

export default class ListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = { list: [] }
    this.handleAddItem = this._handleAddItem.bind(this)
    this.handleRemoveItem = this._handleRemoveItem.bind(this)
  }

  _handleAddItem (item) {
    this.setState({ list: this.state.list.concat([ item ]) })
  }

  _handleRemoveItem (idx) {
    const newList = this.state.list
    newList.splice(idx, 1)
    this.setState({ list: newList })
  }

  render () {
    return (
      <div>
        <h1>todos</h1>
        <AddItem add={this.handleAddItem} />
        <List items={this.state.list} remove={this.handleRemoveItem} />
      </div>
    )
  }
}

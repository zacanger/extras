import React, {Component} from 'react'

export default class TodoBox extends Component {
  render () {
    retrun (
      <div className="todoBox">
        <h1>Todos</h1>
        <TodoList />
        <TodoForm />
      </div>
    )
  }
}

export class TodoList extends Component {
  render () {
    return (
      <div className="todoList">
        I am a TodoList.
      </div>
    )
  }
}

export class TodoForm extends Component {
  render () {
    return (
      <div className="todoForm">
        I am a TodoForm.
      </div>
    )
  }
}

import React, {Component} from 'react'

export default class TodoBox extends Component {
  render () {
    return (
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
        <table style={{border: "2px solid black"}}>
          <tbody>
            <Todo title="Shopping">
              Milk
            </Todo>
            <Todo title="Hair cut">
              13:00
            </Todo>
          </tbody>
        </table>
      </div>
    )
  }
}

export class Todo extends Component {
  render () {
    return (
      <tr>
        <td style={{border: "1px solid black"}}>
          {this.props.title}
        </td>
        <td style={{border: "1px solid black"}}>
          {this.props.children}
        </td>
      </tr>
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

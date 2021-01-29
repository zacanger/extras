import React, {Component, PropTypes} from 'react'

export default class TodoBox extends Component {
  render () {
    return (
      <div className="todoBox">
        <h1>Todos</h1>
        <TodoList data={this.props.data} />
        <TodoForm />
      </div>
    )
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date   : this.props.data
    , title  : ''
    , detail : ''
    }
    this.changeTitle  = this.changeTitle.bind(this)
    this.changeDetail = this.changeDetail.bind(this)
    this.addTodo      = this.addTodo.bind(this)
    this.removeTodo   = this.removeTodo.bind(this)
  }

  changeTitle(e) {
    this.setState({title : e.target.value})
  }

  changeDetail(e) {
    this.setState({detail : e.target.value})
  }

  addTodo() {
    const data = this.state.data
    data.push({
      title  : this.state.title
    , detail : this.state.detail
    })
    this.setState({data})
    this.setState({title : ''})
    this.setState({detail : ''})
  }

  removeTodo(title) {
    const data = this.state.data.filter(todo =>
      todo.title !== title
    )
    this.setState({data})
  }

  render () {
    const todo = this.state.data.map(obj =>
      <Todo
        title={obj.title}
        key={obj.title}
        onRemove={this.removeTodo}>
        {obj.detail}
      </Todo>
    )

    return (
      <div className="todoList">
        <div>
          <input
            type="text"
            value={this.state.title}
            onChange={this.changeTitle}
            placeholder="title"
          />
          <input
            type="text"
            value={this.state.detail}
            onChange={this.changeDetail}
            placeholder="detail"
          />
          <button onClick={this.addTodo}>add todo</button>
        </div>
        <table style={{border: "2px solid black"}}>
          <tbody>
            {todo}
          </tbody>
        </table>
      </div>
    )
  }
}

class Todo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checked : false
    , style   : style.notCheckedTodo
    }
    this.handleChange = this.handleChange.bind(this)
    this._onRemove    = this._onRemove.bind(this)
  }

  handleChange (e) {
    this.setState({
      checked : e.target.checked
    })
    if (e.target.checked) {
      this.setState({
        style : style.checkedTodo
      })
    } else {
      this.setState({
        style : style.notCheckedTodo
      })
    }
  }

  _onRemove() {
    this.props.onRemove(this.props.title)
  }

  render () {
    return (
      <tr style={this.state.style}>
        <td style={style.tableContent}>
          <button onClick={this._onRemove}>remove todo</button>
          <input
            type="checkbox"
            checked={this.state.checked}
            onChange={this.handleChange}
          />
        </td>
        <td style={style.tableContent}>
          {this.props.title}
        </td>
        <td style={style.tableContent}>
          {this.props.children}
        </td>
      </tr>
    )
  }
}
Todo.propTypes = {
  title: PropTypes.string.isRequired
}

class TodoForm extends Component {
  render () {
    return (
      <div className="todoForm">
        I am a TodoForm.
      </div>
    )
  }
}

const style = {
  checkedTodo : {
    textDecoration : 'line-through'
  }
, notCheckedTodo : {
    textDecoration : 'none'
  }
, tableContent: {
    border: '1px solid black'
  }
}

import Immutable from 'immutable'

export default (state = Immutable.List(['Do Things!']), action) => {
  switch(action.type){
    case 'addTodo':
      return state.unshift(action.todo)
    case 'deleteTodo':
      return state.splice(action.todo)
    default:
      return state
  }
}


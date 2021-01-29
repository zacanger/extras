App = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState(){
    return {
      hideCompleted: false
    }
  },

	getMeteorData(){
    let query = {}
    if (this.state.hideCompleted){
      query = {checked: {$ne: true}}
    }
    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count()
		}
	},

	renderTasks(){
		return this.data.tasks.map((task) => {
			const currentUserId = this.data.currentUser && this.data.currentUser._d
      const showPrivateButton = task.owner === currentUserId
      return <Task
        key={task._id}
        task={task}
        showPrivateButton={showPrivateButton} />
		})
	},

	handleSubmit(event){
		event.preventDefault()
		var text = React.findDOMNode(this.refs.textInput).value.trim()
    Meteor.call("addTask", text)
	  React.findDOMNode(this.refs.textInput).value = ""
	},

  toggleHideCompleted(){
    this.setState({
      hideCompleted: ! this.state.hideCompleted
    })
  },

	render(){
		return (
			<div className="container">
				<header>
					<h1>meteor/react todo-list ({this.data.incompleteCount})</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompletted} />
            hide completed tasks
          </label>
          <AccountsUIWrapper />
          { this.data.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit} >
						  <input
							  type="text"
							  ref="textInput"
							  placeholder="new task" />
				  	</form> : ''
          }
				</header>
				<ul>{this.renderTasks()}</ul>
			</div>
		)
	}
})


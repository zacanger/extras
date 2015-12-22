import uuid from 'node-uuid'
import React from 'react'
import Notes from './Notes.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: []
    }
  }
  render() {
    const notes = this.state.notes
    return (
      <div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<Notes items={notes}
					onEdit={this.editNote}
					onDelete={this.deleteNote} />
      </div>
    )
	}
  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4()
      , task: 'new task'
      }])
    })
	}
	deleteNote = (id) => {
		this.setState({
			notes: this.state.notes.filter((note) => note.id !== id)
		})
	}
	editNote = (id, task) => {
		const notes = this.state.notes.map((note) => {
			if (note.id === id) {
				note.task - task
			}
			return note
		})
		this.setState({notes})
	}
}

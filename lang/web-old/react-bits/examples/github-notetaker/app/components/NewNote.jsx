import React from 'react'

export default class NewNote extends React.Component {
  handleSubmit(){
    let newNote = this.note.value
    this.note.value = ''
    this.props.newNote(newNote)
  }

  setRef(ref){
    this.note = ref
  }

  render(){
    return (
      <div>
        <input
          type='text'
          placeholder='new note'
          ref={(ref) => this.setRef(ref)}
        />
        <button
          type='button'
          onClick={() => this.handleSubmit()}>
          submit
        </button>
      </div>
    )
  }
}

NewNote.propTypes = {
  username : React.PropTypes.string.isRequired
, newNote  : React.PropTypes.string.isRequired
}


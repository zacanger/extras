import React    from 'react'
import NoteList from './NoteList'
import NewNote  from './NewNote'

export default function Notes({username, notes, newNote}){
  return (
    <div>
      <h3>notes about {username}</h3>
      <NewNote notes={notes} />
    </div>
  )
}

Notes.propTypes = {
  username : React.PropTypes.string.isRequired
, notes    : React.PropTypes.array.isRequired
, newNote  : React.PropTypes.func.isRequired
}


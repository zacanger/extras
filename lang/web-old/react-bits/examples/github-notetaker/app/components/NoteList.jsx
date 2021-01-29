import React from 'react'

export default function NoteList({notes}){
  return (
    <ul>
      {notes.map((note, idx) => {
        <li key={idx}>
          {note.text ? note.text : note}
        </li>
      })}
    </ul>
  )
}

NoteList.propTypes = {
  notes : React.PropTypes.array.isRequired
}


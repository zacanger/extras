// approximation of ng-repeat
import React    from 'react'
import { render } from 'react-dom'

const stuff = [
  { foo : 'things' , bar : 'stuff' }
, { foo : 'asdfgh' , bar : 'ghjkl' }
, { foo : 'quux'   , bar : 'baz'   }
, { foo : 'hello'  , bar : 'world' }
]

const Repeat = ({ stuff }) => {
  const List = stuff.map((a) => (
    <li key={a.foo}>
      <strong>{a.foo}</strong>
      <em>{a.bar}</em>
    </li>
  ))

  return (
    <div>
      <h2>Below is an array of objects.</h2>
      <ul>{List}</ul>
    </div>
  )
}

render(<Repeat stuff={stuff} />, document.getElementById('repeat'))

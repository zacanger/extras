import React    from 'react'
import { render } from 'react-dom'

// there are many many libraries out there for CSS in JS
// this is just a super basic example of how it works
const Style = ({ someCondition }) => {
  const styles = {
    height: 500
  , width: 500
  , color: '#101010'
  }

  return (
    <div style={someCondition ? styles : ''}>styled!</div>
  )
}

render(<Style />, document.getElementById('style'))

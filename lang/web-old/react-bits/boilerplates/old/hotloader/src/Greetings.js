import React, { PropTypes } from 'react'

// function component example
const Greetings = ({ name }) =>
  <h1>Hello, {name}</h1>

// proptypes are like a limited sort of validation for props
Greetings.propTypes = {
  name: PropTypes.string.isRequired
}

export default Greetings

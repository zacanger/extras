import React, { PropTypes } from 'react'

// stateless function component example
const Foo = ({ message }) => <span>{message}</span>
// PropTypes are a prop validation, a basic sort of type-checking thing
Foo.propTypes = { message: PropTypes.string.isRequired }
export default Foo
// this could also just be written as export default ({ message }) => <span>{message}</span>

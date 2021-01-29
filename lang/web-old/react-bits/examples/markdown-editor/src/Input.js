import React, { PropTypes } from 'react'

const Input = ({ onChange, value }) => (
  <textarea
    className='text'
    onChange={onChange}
    rows='55'
    type='text'
    children={value}
  />
)

Input.propTypes = {
  onChange: PropTypes.func.isRequired
, value: PropTypes.string
}

export default Input

import React from 'react'
import { func, string } from 'prop-types'

const textStyle = {
  fontFamily: 'monospace',
  float: 'left',
  width: '49%',
  height: '100%',
  resize: 'vertical'
}

const Input = ({ onChange, value }) => (
  <textarea
    style={textStyle}
    onChange={onChange}
    rows="55"
    type="text"
    children={value}
  />
)

Input.propTypes = {
  onChange: func.isRequired,
  value: string
}

export default Input

import React, { Component, PropTypes } from 'react'

const Picker = props => (
  <span>
    <h1>{props.value}</h1>
    <select
      onChange={e => props.onChange(e.target.value)}
      value={props.value}>
      {props.options.map(opt =>
        <option value={option} key={option}>
          {option}
        </option>
      )}
    </select>
  </span>
)

Picker.propTypes = {
  options  : PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired
, value    : PropTypes.string.isRequired
, onChange : PropTypes.func.isRequired
}

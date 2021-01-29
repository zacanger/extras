import React    from 'react'

const If = ({ show }) => (
  <div>{show && <span>showing!</span>}</div>
)

const If = ({ show }) => (
  <div>{show ? <span>showing</span> : null}</div>
)

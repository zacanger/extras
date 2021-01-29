// @flow

import React from 'react'
import { Greetz, Cheerz } from './components'

const style = { fontFamily: 'monospace', fontSize: '24px' }
const name = 'you'

export default () => (
  <div style={style}>
    <Greetz name={name} />
    <Cheerz name={name} date={new Date()} />
  </div>
)

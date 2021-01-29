import React from 'react'
import {render} from 'react-dom'
import TodoBox from './components'

const data = JSON.parse(
  document.getElementById('initial-data').getAttribute('data-json')
)

render(<TodoBox data={data} />, document.getElementById('app'))

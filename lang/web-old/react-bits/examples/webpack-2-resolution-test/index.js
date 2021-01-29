import React from 'react'
import { render } from 'react-dom'
import D from 'Dashboard/Dashboard'

const App = () => <D />
const el = document.getElementById('root')
render(<App />, el)

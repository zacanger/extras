import React, { Component } from 'react'
import Foo from './Foo'

// es2015 class component example,
// passing a `message` prop to `Foo`
export default class App extends Component {
  render () {
    return (
      <div>
        <Foo message='Hi!' />
      </div>
    )
  }
}

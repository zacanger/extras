import * as React from 'react'

interface Bar {
  quux : string
}

class Foo extends React.Component<Bar, {}> {
  render(){
    return <div>sup {this.props.quux}</div>
  }
}

export default Foo


import * as React from 'react'

const styles = { color: 'blue', fontFamily: 'monospace' }

export interface HelloP {
  name: string
}

export default class Hello extends React.Component<HelloP, void> {
  public render() {
    const { name } = this.props
    return (
      <div>
        <h1 style={styles}>Hello {name}.</h1>
      </div>
    )
  }
}

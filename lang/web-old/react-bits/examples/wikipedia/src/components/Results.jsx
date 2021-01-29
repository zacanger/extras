import React from 'react'
import Single from './Single'

export default class Reults extends React.Component {
  render(){
    let results = this.props.results[1].map((result, index) => {
      return(
        <Single
          key={index}
          title={this.props.results[1][index]}
          description={this.props.results[2][index]}
          url={this.props.results[3][index]}
        />
      )
    })
    return(<div className="results-list">{results}</div>)
  }
}

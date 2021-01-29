import React from 'react'

const File = React.createClass({
  handleClick (filename) {
    console.log(`opening ${filename}`)
  }
, render(){
    const styles = {
      file : {
        fontSize  : '16px'
      , fontStyle : 'italic'
      }
    }
    const name = this.props.fileDetails.name
    return (
      <div style={styles.file} onClick={this.handleClick.bind(null, name)}>
        <span><i className="fa fa-file"></i></span>
        {name}
      </div>
    )
  }
})

export default File


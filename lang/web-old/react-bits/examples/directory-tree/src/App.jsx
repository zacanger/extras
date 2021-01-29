import React    from 'react'
import ReactDOM from 'react-dom'
import Folder   from './Folder'
import folders  from './sampleFolderStructure'

const App = React.createClass({
  getInitialState(){
    return {
      isOpen : {}
    }
  }
, handleToggle(id){
    let
      oldVal   = this.state.isOpen[id]
    , newState = this.state.isOpen
    newState[id] = oldVal ? false : true
    this.setState({
      isOpen : newState
    })
  }
, render(){
    return (
      <Folder folderDetails={folders.folder} handleToggle={this.handleToggle} isOpen={this.state.isOpen} />
    )
  }
})

export default App


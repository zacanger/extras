import React from 'react'
import File  from './File'

const Folder = React.createClass({
  getInitialState(){
    return {
      showContent : false
    }
  }
, handleToggle(){
//    const newState = !this.state.showContent;
//    this.setState({
//        showContent: newState
//    })
    this.props.handleToggle(this.props.folderDetails.id)
  }
, render(){
    let that = this
    const styles = {
      folder : {
        padding    : '2px'
      , fontWeight : 'bold'
      , fontSize   : '24px'
      }
    , indent : {
        marginLeft : '18px'
      }
    }
    const items = this.props.folderDetails.contents ? this.props.folderDetails.contents.map((contentItem, index) => {
      if (contentItem.type === 'file') {
        return <File key={index} fileDetails={contentItem} />
      }
      if (contentItem.type === 'folder') {
        return (
          <Folder
            key={index}
            folderDetails={contentItem}
            handleToggle={this.props.handleToggle}
            isOpen={this.props.isOpen}
            />
        )
      }
    }) : []
    const icon = this.props.isOpen[this.props.folderDetails.id] ?
      <i className="fa fa-folder-open-o"></i>                   :
      <i className="fa fa-folder-o"></i>
    const contentList = this.props.isOpen[this.props.folderDetails.id] ? items : null
    return (
      <div>
        <div onClick={this.handleToggle} style={styles.folder}>
          <span>{icon}</span>
          {this.props.folderDetails.name}
        </div>
        <div style={styles.indent}>{contentList}</div>
      </div>
    )
  }
})

export default Folder


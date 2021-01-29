import React  from 'react'
import Router from 'react-router'

export default class Search extends React.Component {
  getRef(ref){
    this.usernameRef = ref
  }

  handleSumbit(){
    const username = this.usernameRef.value
    this.usernameRef.value = ''
    this.props.history.pushState(null, '/profile/' + username)
  }

  render(){
    return (
      <div>
        <form onSubmit={() => this.handleSumbit()}>
          <input type='text' ref={ref => this.getRef(ref)} />
          <button type='submit'>search</button>
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  history : React.PropTypes.object.isRequired
}


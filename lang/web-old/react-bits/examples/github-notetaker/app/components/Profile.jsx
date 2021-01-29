import React  from 'react'
import Router from 'react-router'
import User   from './User'
import Repos  from './Repos'
import Notes  from './Notes'
import getGh  from '../util'
import Rebase from 're-base'

const base = Rebase.createClass('https://dm7.firebaseio.com')

export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      notes : []
    , bio   : {}
    , repos : []
    }
  }

  componentDidMount(){
    this.init(this.props.params.username)
    base.removeBinding(this.ref)
    this.init(nextProps.params.username)
  }

  componentWillUnmount(){
    base.removeBinding(this.ref)
  }

  init(username){
    this.ref = base.bindToState(username, {
      context : this
    , asArray : true
    , state   : 'notes'
    })

    getGh(username)
    .then(data => {
      this.setState({
        bio   : data.bio
      , repos : data.repos
      })
    })
  }

  handleAddNote(newNote){
    base.post(this.props.params.username, {
      data : this.state.notes.concat([newNote])
    })
  }

  render(){
    return (
      <div>
        <User
          username={this.props.params.username}
          bio={this.state.bio}
        />
        <Repos
          username={this.props.params.username}
          repos={this.state.repos}
        />
        <Notes
          username={this.props.params.username}
          notes={this.state.notes}
          addNote={(newNote) => this.handleAddNote(newNote)}
        />
      </div>
    )
  }
}


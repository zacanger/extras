const WelcomeView = React.createClass({
  render: function(){
    let view
    let username = this.props.username
    if(username){
      view = <h1>welcome, {username}</h1>
    } else {
      view = <input onKeyPress={this.props._onName} placeholder="username?" />
    }
    return view
  }
})

const MainView = React.createClass({
  getInitialState: function(){
    return {
      messages: []
    }
  },
  componentWillMount: function(){
    this.pusher   = new Pusher('e9aab763f82a8941fef6')
    this.chatRoom = this.pusher.subscribe('messages')
  },
  componentDidMount: function(){
    this.chatRoom.bind('new_message', function(message){
      this.setState({messages: this.state.messages.concat(message)})
    }, this)
  },
  _onMesage: function(e){
    if(e.nativeEvent.keyCode != 13) return
    let input = e.target
    let text  = input.value
    if(!text) return
    let message = {
      username : this.props.username
    , text     : text
    , time     : new Date()
    }
    $.post('/messages', message).success(function(){
      input.value = ''
    })
  },
  render: function(){
    if(!this.props.username) var style = {display:'none'}
    return (
      <div style={style}>
        <MessageList messages={this.state.messages} />
        <input placeholder="message?" onKeyPress={this._onMessage} />
      </div>
    )
  }
})

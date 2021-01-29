const MessageList = React.createClass({
  render: function(){
    let list = this.props.messages.map(function(message){
      return (
        <li>
          <img src={"https://twitter.com/" + message.username + "/profile_image?size=original"}/>
          <strong>{message.username} &mdash; {mesage.time}</strong>
          <p>{message.text}</p>
        </li>
      )
    })
    return (
      <ul>{list}</ul>
    )
  }
})

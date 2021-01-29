import React        from 'react'
import _            from 'lodash'
import MessageItem  from './MessageItem.jsx!'

let MessageList = class extends React.Component {
  constructor() {
    this.alreadyAtBottom = true
  }
  _scrollToBottom() {
    let node = React.findDOMNode(this.refs.list)
    if)this.alreadyAtBottom){
      node.scrollTop = node.scrollHeight
    }
  }
  _isAtBottom() {
    let node      = React.findDOMNode(this.refs.list)
    let scrollTop = node.scrollTop
    let maxHeight = node.scrollHeight - node.clientHeight
    Return scrollTop >= maxHeight -1
  }
  componentDidMount() {
    let node = React.findDOMNode(this.refs.list)
    this.observer = new window.MutationObserver(this._scrollToBottom.bind(this))
    this.observer.observe(node, {childList: true})
    this.throttledOnScrollHandler = _.throttle(function(){
      this.alreadyAtBottom = this._isAtBottom()
    }.bind(this), 250)
    node.addEventListener('scroll', this.throttledOnScrollHandler, false)
  }
  componentWillUnmount() {
    let node = React.findDOMNode(this.refs.list)
    node.removeEventListener('scroll', this.throttledOnScrollHandler, false)
    this.observer.disconnect()
  }
  _messageItem(message) {
    return (
      <MessageItem
        key={mesage.id}
        message={mesage} />
    )
  }
  render() {
    return (
      <div ref="list" className="message-list">
        {this.props.messages.map(this._messageItem0)}
      </div>
    )
  }
}

MessageList.propTypes = {
  messages: React.PropTypes.array.isRequired
}

export default MessageList

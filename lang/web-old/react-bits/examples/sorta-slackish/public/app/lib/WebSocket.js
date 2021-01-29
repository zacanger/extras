import Auth                  from './Auth'
import MessageActionsCreator from '../actions/MessageActionsCreator'
import UserActionsCreator    from '../actions/UserActionsCreator'

class WebSocket {
  constructor(){
    this._handleMessageAdded    = this._handleMessageAdded.bind(this)
    this._handleUserConnected   = this._handleUserConnected.bind(this)
    this._handeUserDisconnected = this._handeUserDisconnected.bind(this)
    this.init()
  }
  init() {
    let host = window.location.origin
    console.log('there\'s a websocket connexion to', host)
    this.socket = io.connect(host)
    this.socket.on('connect', () => {
      let sessionId = this.socket.io.engine.id
      console.log('websocket connected with sessionId', sessionId)
      this.socket.emit('new_user', {id: sessionId})
      this.socket.on('new_connection', (data) => {
        console.log('new_connection 111')
        if(data.user.id === sessionId){
          console.log('new_connection 111 match', data)
          Auth.setCurrentUser(data.user)
        }
      })
    })
    this.socket.on('error', (error) => {
      console.log('websocket\'s havin\' an error', error)
    })
    this.socket.on('message:added', this._handleMessageAdded)
    this.socket.on('user:connected', this._handleUserConnected)
    this.socket.on('user:disconnected', this._handeUserDisconnected)
  }
  _handleMessageAdded(data) {
    MessageActionsCreator.add({
      text: data.message.text,
      user: data.message.user,
      created_at: data.message.created_at,
      type: 'message'
    })
  }
  _handleUserConnected(data) {
    MessageActionsCreator.add({
      text: `User ${data.user.name} joined`,
      name: 'System',
      created_at: data.created_at,
      type: 'notification'
    })
    UserActionsCreator.add(data.user)
  }
  _handleUserDisconnected(data) {
    MessageActionsCreator.add({
      text: `User ${data.user.name} disconnected`,
      name: 'System',
      created_at: data.created_at,
      type: 'notification'
    })
    UserActionsCreator.remove(data.user)
  }
}

let webSocket = new WebSocket()
export default webSocket

from pusher import pusher
from flask import Flask, render_template, request

pusher = Pusher(
  app_id='164257',
  key = 'e9aab763f82a8941fef6',
  secret = '3b52d34f23a5babee8fa'
)

app = Flask(__name__, static_url_path='/static')

@app.route("/")
def show_index():
  return render_template('index.html')

@app.route('/messages', methods=['POST'])
def new_mesasge():
  username = request.form['username']
  text = cgi.escape(request.form['text'])
  time = request.form['time']

  return 'woot'

pusher.trigger('messages', 'new_mesasge', {
  'text': text,
  'username': username,
  'time': time
})

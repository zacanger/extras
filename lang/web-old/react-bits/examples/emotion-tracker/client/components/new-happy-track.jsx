const
  React         = require('react')
, HappyTrack    = require('./happy-track')
, Immutable     = require('immutable')
, NewHappyTrack = React.createClass({
  submit(emotion) {
    this.props.cursor.update(emotionsList => {
      emotion.date = new Date()
      return emotionsList.push(Immutable.fromJS(emotion))
    })
  }
, render() {
    return <HappyTrack onSubmit={this.submit} />
  }
})

module.exports = NewHappyTrack

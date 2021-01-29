const
  React          = require('react')
, HappyTrack     = require('./happy-track')
, Immutable      = require('immutable')
, EditHappyTrack = React.createClass({
  componentWillReceiveProps() {
    console.log('did get', arguments)
  }
, submit(updatedEmotion) {
    this.props.cursor.update(oldEmotion => oldEmotion.merge(Immutable.fromJS(updatedEmotion)))
  }
, render() {
    console.log('emotions is', this.props.cursor.get('emotion'), 'why is', this.props.cursor.get('why'))
    return (
      <HappyTrack
        onSubmit={this.submit}
        emotion={this.props.cursor.get('emotion')}
        why={this.props.cursor.get('why')}
      />
    )
  }
})

module.exports = EditHappyTrack

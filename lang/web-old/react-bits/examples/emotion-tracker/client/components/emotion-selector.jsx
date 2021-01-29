const
  React           = require('react')
, RadioGroup      = require('react-radio-group')
, EMOTIONS        = require('../emotions')
, EmotionSelector = React.createClass({
  getInitialState() {
    return {selectedEmotion : this.props.initialEmotion}
  }
, renderEmotionSelections(emotions) {
    return emotions.map(this.renderEmotionSelection)
  }
, renderEmotionSelection(emotion, i) {
    return (
    <label>
      {emotion}
      <input type="radio" value={i} />
    </label>
    )
  }
, handleChange(event) {
    let selectedEmotion = event.target.value
    this.setState({ selectedEmotion})
    this.props.onChange(selectedEmotion)
  }
, render() {
    return (
      <RadioGroup
        value={this.state.selectedEmotion}
        onChange={this.handleChange}>
        {this.renderEmotionSelections(EMOTIONS)}
      </RadioGroup>
    )
  }
})

module.exports = EmotionSelector

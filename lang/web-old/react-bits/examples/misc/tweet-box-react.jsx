// see tweet-box-jquery for comparison

const Box = React.createClass({
  getInitialState(){
    return {
      text       : ''
    , photoAdded : false
    }
  }

, handleChange(e){
    this.setState({text : e.target.value})
  }

, togglePhoto(e){
    this.setState({photoAdded : !this.state.photoAdded})
  }

, remainingCharacters(){
    if (this.state.photoAdded) {
      return 140 - 23 - this.state.text.length
    } else {
      return 140 - this.state.text.length
    }
  }

, overflowAlert(){
    if (this.remainingCharacters() < 0) {
      if (this.state.photoAdded) {
        let
          beforeText = this.state.text.substring(140 - 23 - 10, 140)
        , overText   = this.state.text.substring(140 - 23)
      } else {
        let
          beforeText = this.state.text.substring(140 - 10, 140)
        , overText   = this.state.text.substring(140)
      }

      return (
        <div>
          <strong>too may chars</strong>
          &nbsp;&hellip;
          {beforeText}
          <strong>{overText}</strong>
        </div>
      )
    } else {
      return ''
    }
  }

, render() {
    return (
      <div>
        {this.overflowAlert()}
        <textarea onChange={this.handleChange}></textarea>
        <br />
        <span>
          {this.remainingCharacters()}
        </span>
        <button
          disabled={this.state.text.length === 0 !this.state.photoAdded}>
            yo
        </button>
        <button
          onClick={this.togglePhoto}>
          {this.state.photoAdded ? 'added' : 'add'}
        </button>
      </div>
    )
  }
})

ReactDOM.render(<Box />, document.getElementById('something'))


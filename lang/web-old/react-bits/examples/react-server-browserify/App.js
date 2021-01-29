const
  React  = require('react')
, DOM    = React.DOM
, div    = DOM.div
, button = DOM.button
, ul     = DOM.ul
, li     = DOM.li

module.exports = React.createClass({

  getInitialState () {
    return {items : this.props.items, disabled : true}
  }

, componentDidMount () {
    this.setState({disabled : false})
  }

  handleClick () {
    this.setState({
      items : this.state.items.concat('Item ' + this.state.items.length)
    })
  }

, render () {
    return div(
      null
    , button({onClick : this.handleClick, disabled : this.state.disabled}, 'Add Item')
    , ul({children : this.state.items.map(item => li(null, item))})
    )
  }
})


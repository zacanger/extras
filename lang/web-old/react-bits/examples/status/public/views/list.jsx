'use strict'

const
  React           = require('react')
, Router          = require('react-router')
, ItemStore       = require('../flex/item-store')
, ActionCreator   = require('../flex/action-creator')
, ActionConstants = require('../flex/action-constants')

module.exports = React.createClass({
  getInitialState(){
    return {loading : true, items : []}
  }

, componentDidMount(){
    ItemStore.addChangeListener(this._handleAssetsChanged)
    ActionCreator.fetchItems("/api/items")
  }

, componentWillUnmount(){
    ItemStore.removeChangeListener(this._handleAssetsChanged)
  }

, _handleAssetsChanged(type){
    if (type === ActionConstants.STATE_ERROR) {
      this.setState({
        error : 'Error while loading servers'
      })
    } else {
      this.setState({
        loading : false
      , error   : null
      , items   : ItemStore.getItems() || []
      })
    }
  }

, render() {
    let loading, items, error

    if (this.state.loading) {
      loading = (
        <div className="items-loading">
          <div className="LoadingSpinner-dark" />
        </div>
      )
    } else {
      items = (
        <ul>
          {this.state.items.map(item => {
            let statusClass = 'status-indicator'
            if (item.status==='active') {
              statusClass+= ' status-active'
            } else if (item.status==='error') {
              statusClass+= ' status-error'
            } else {
              statusClass+= ' status-loading'
            }
            return (
              <li className="service-card" key={item.id}>
                <div className="service-card-status">
                  <div className={statusClass}/>
                </div>
                <div className="service-card-name">{item.title}</div>
                <div className="service-card-type">{item.dist}</div>
              </li>
            )
          })}
        </ul>
      )
    }
    if (this.state.error) {
      error = (
        <div className="error-box">{this.state.error}</div>
      )
    }

    return (
      <div id='list'>
        <h1>list</h1>
        <p>this is a list of available servers and their statuses (
          <span className="text-loading">gray</span> - loading,&nbsp;
          <span className="text-active">green</span> - active,&nbsp;
          <span className="text-error">red</span> - error)</p>
        {loading}
        {items}
        {error}
      </div>
    )
  }
})


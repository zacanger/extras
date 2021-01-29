'use strict'

const React = require('react')

module.exports = React.createClass({
  displayName : 'header'

, render(){
    const
      linkClass         = 'header-link'
    , linkClassSelected = 'header-link header-selected'

    return (
      <section className='header' id='header'>
        <div className='header-title'>{this.props.title}</div>
        <nav className='header-links'>
          <ul>
            <li
              className={this.props.selection == 'header-home' ? linkClassSelected : linkClass}
              id='header-home'>
              <a href='/'>home</a>
            </li>
            <li
              className={this.props.selection == 'header-page' ? linkClassSelected : linkClass}
              id='header-page'>
              <a href='/page'>page</a>
            </li>
            <li
              className={this.props.selection == 'header-spa' ? linkClassSelected : linkClass}
              id='header-spa'>
              <a href='/spa/section1'>spa</a>
            </li>
          </ul>
        </nav>
      </section>
    )
  }
})

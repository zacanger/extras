'use strict'

const
  React  = require('react')
, Header = require('./header')

module.exports = React.createClass({
  render(){
    let bundle

    if (this.props.addBundle) {
      bundle = <script src='/bundle.js' />
    }

    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <title>{this.props.title}</title>
          <link rel='stylesheet' type='text/css' href='css.css' />
        </head>
        <body>
          <Header {...this.props} />
          <div className='main-content'>
            {this.props.children}
          </div>
        </body>
        {bundle}
      </html>
    )
  }
})

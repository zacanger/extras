// @flow

import React, { Component } from 'react'

type P = {
  name: string,
  date: Date | string
}

export default class Cheerz extends Component<void, P, void> {
  getDateFromNumber = (d: Date | string) =>
    Object.prototype.toString.call(d) === '[object Date]'
      ? d.toString()
      : new Date(d).toString()

  render () {
    const { name, date } = this.props

    return (
      <div>
        The date and time is {this.getDateFromNumber(date)}, {name}. Time for a drink.
      </div>
    )
  }
}

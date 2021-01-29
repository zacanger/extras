import React, { Component } from 'react'
import _ from 'lodash'

// adaptation of https://gist.github.com/joshma/6753333dd38a6010f9a6
// wrap your thing in this thing
// export default whyUpdate(MyComponent)
// needs lodash

const isRequiredUpdateObject = (o) =>
  Array.isArray(o) || (o && o.constructor === Object.prototype.constructor)

function deepDiff (o1, o2, p) {
  const notify = (status) => {
    console.warn(`Update ${status}`)
    console.log('%cbefore', 'font-weight: bold', o1)
    console.log('%cafter ', 'font-weight: bold', o2)
  }
  if (!_.isEqual(o1, o2)) {
    console.group(p)
    if ([o1, o2].every(_.isFunction)) {
      notify('Avoidable?')
    } else if (![o1, o2].every(isRequiredUpdateObject)) {
      notify('Required.')
    } else {
      const keys = _.union(_.keys(o1), _.keys(o2))
      for (const key of keys) {
        deepDiff(o1[key], o2[key], key)
      }
    }
    console.groupEnd()
  } else if (o1 !== o2) {
    console.group(p)
    notify('Avoidable!')
    if (_.isObject(o1) && _.isObject(o2)) {
      const keys = _.union(_.keys(o1), _.keys(o2))
      for (const key of keys) {
        deepDiff(o1[key], o2[key], key)
      }
    }
    console.groupEnd()
  }
}

export default (ComposedComponent) => (
  global.env === 'production'
    ? ComposedComponent
    : class Enhance extends Component {
      componentDidUpdate = (prevProps, prevState) => {
        deepDiff(
          { props: prevProps, state: prevState },
          { props: this.props, state: this.state },
          this.constructor.name
        )
      }

      render () {
        return <ComposedComponent {...this.props} />
      }
    }
)

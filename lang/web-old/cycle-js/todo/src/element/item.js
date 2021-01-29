import {run}                         from  '@cycle/core'
import {h, makeDOMDriver}            from '@cycle/dom'
import {Observable, BehaviorSubject} from 'rx'
import _                             from 'lodash'

module.exports = function Item(response){

  function intent(DOM){
    return {
      remove  : DOM.get('.deleteBtn', 'click')
    }
  }

  function view(state){
    return state.map(state =>
      h('li', [
        state.val,
        h('button', {
          attributes: {
            'class': 'deleteBtn'
          }
        }, ['X'])
      ])
    )
  }

  function model(props, actions){
    return props.getAll()
  }

  let actions = intent(responses.DOM)
  let state   = model(responses.props, actions)

  return {
    DOM : view(state).catch((err) => {
      console.error(err.stack)
    })
  , events : {
      remove : actions.remove
        .withLatestFrom(state, (evt, state) => state)
    }
  }
}

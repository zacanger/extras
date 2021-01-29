/**
 * Tiny redux middleware.
 * @example
 * import { createStore, applyMiddleware } from 'redux'
 * import m from './this-file'
 * const store = applyMiddleware(m)(createStore)(rootReducer)
 *
 * export const getThing = async (item) => {
 *   const payload = await fetch(`/something/${item}`)
 *     .then((a) => a.json())
 *   return { type: 'some-thing', payload }
 * }
 *
 * export const doThing = async () => {
 *   try {
 *     const data = await store.dispatch(getThing('whatever'))
 *   } catch (e) {
 *     handleErr(e)
 *   }
 * }
 */

module.exports = ({ dispatch }) =>
  (next) =>
    (action) =>
      (action && typeof action.then === 'function')
        ? action.then((r) => dispatch(r))
        : next(action)

// oh shit. i just realised this is almost exactly the same as redux thunk. nevermind.

// something a little fuller, based on redux-thunk
const createMiddleware = (extraArg) =>
  ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      if (Object.getPrototypeOf(action).constructor.name === 'AsyncFunction') {
        return (async () => {
          await action(dispatch, getState, extraArg)
        })()
      }
      return action(dispatch, getState, extraArg)
    }
    return next(action)
  }
const m = createMiddleware()
m.withExtraArgument = createMiddleware
export default m

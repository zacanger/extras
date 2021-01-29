export default class StateManager {
  newState (changed) {
    if (typeof changed !== 'object' || changed === null) {
      throw new TypeError(`State must be an object. Instead got ${typeof state} : ${state}`)
    }
    const nextState = Object.create(this)

    for (const prop in changed) {
      this.makeReadOnly(nextState, changed, prop)
    }

    return nextState
  }

  makeReadOnly (cloned, obj, prop) {
    Object.defineProperty(cloned, prop, {
      set (val) {
        throw new Error(`Cannot assign value '${val}' to read only property '${prop}'.`)
      },
      get () {
        return obj[prop]
      },
      enumerable: true
    })
  }
}

/*
 * const initialState = { stuff }
 * const state = new StateManager().newState(initialState)
 * const secondState = firstState.newState({ morestuff })
 */

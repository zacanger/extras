export const ls = (k = 'foo') => ({
  getState () {
    try {
      return JSON.parse(localStorage.getItem(k)) || null
    } catch (_) { }
  },

  setState (value) {
    try {
      localStorage.setItem(k, JSON.stringify(value))
    } catch (_) { }
  },

  clearState () {
    try {
      localStorage.removeItem(k)
    } catch (_) { }
  }
})

export default (store, conf = {}) => {
  const adapter = ls()
  const version = conf.version || 1

  store.setState({ hydrated: false })

  Promise.resolve(adapter.getState()).then((state) => {
    if (!state || (!state.version && conf.migration) || state.version < version) {
      if (conf.migration) {
        Promise.resolve(conf.migration(state, version)).then((migrated) => {
          store.setState({ ...migrated, { hydrated: true } })
        })
      } else {
        store.setState({ hydrated: true, version })
      }
    } else if (conf.hydration) {
      store.setState({ ...conf.hydration(state), { hydrated: true } })
    } else {
      state.hydrated = true
      store.setState(state)
    }
  })

  let timer
  const unsubscribe = store.subscribe(() => {
    if (!timer)
      timer = setTimeout(() => {
        const state = store.getState()
        state.version = state.version || version
        adapter.setState((conf.map || Object)(state))
        timer = null
      }, conf.debounceTime || 100)
  })

  return () => {
    unsubscribe()
    clearTimeout(timer)
  }
}

const state = {
  count: 0
}

const mutations = {
  increment (state) {
    state.count++
  },
  reset (state) {
    state.count = 0
  },
  decrement (state) {
    state.count--
  },
  setExact (state, amt) {
    state.count = amt
  }
}
const actions = {
  increment ({ commit }) {
    commit('increment')
  },
  reset ({ commit }) {
    commit('reset')
  },
  decrement ({ commit }) {
    commit('decrement')
  },
  setExact ({ commit, dispatch }, amt) {
    commit('setExact', amt)
    setTimeout(() =>
      dispatch('reset'), 1000
    )
  }
}

export default {
  state,
  mutations,
  actions
}

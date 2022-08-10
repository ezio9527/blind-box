const state = () => ({
  address: ''
})

// getters
const getters = {
  getAddress: (state) => {
    return state.address
  }
}

// mutations
const mutations = {
  setAddress (state, address) {
    state.address = address
  }
}

// actions
const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
  }
}

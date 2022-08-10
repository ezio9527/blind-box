const state = () => ({
  address: '', // 钱包地址
  isDapp: false // dapp运行环境
})

// getters
const getters = {
  getAddress: (state) => {
    return state.address
  },
  getIsDapp: (state) => {
    return state.isDapp
  }
}

// mutations
const mutations = {
  setAddress (state, address) {
    state.address = address
  },
  setIsDapp: (state, isDapp) => {
    state.isDapp = isDapp
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

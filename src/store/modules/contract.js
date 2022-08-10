// 合约
import BoxContract from '@/server/contract/BoxContract'

const state = () => ({
  boxContract: null,
  balance: 0 // 余额
})

// getters
const getters = {
  getBoxContract (state) {
    return state.boxContract
  },
  getBalance (state) {
    return state.balance
  }
}

// mutations
const mutations = {
  setBoxContract (state, contract) {
    state.boxContract = contract
  },
  setBalance (state, lpBalance) {
    state.lpBalance = lpBalance
  }
}

const actions = {
  initialize ({ commit, state }, account) {
    const boxContract = new BoxContract(account)
    commit('setBoxContract', boxContract)
    const qry = () => {
    }
    qry()
    setInterval(() => {
      qry()
    }, 5000)
  }
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

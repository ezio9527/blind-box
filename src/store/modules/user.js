import { findUser } from '@/server/http/api'

const state = () => ({
  invitationCode: ''
})

// getters
const getters = {
  getInvitationCode: (state) => {
    return state.invitationCode
  }
}

// mutations
const mutations = {
  setInvitationCode (state, code) {
    state.invitationCode = code
  }
}

// actions
const actions = {
  findUser ({ commit }, address) {
    findUser({ walletAddress: address }).then(data => {
      commit('setInvitationCode', data.invCode)
    })
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

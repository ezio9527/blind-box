import { findUser } from '@/server/http/api'

const state = () => ({
  invitationCode: '',
  parent: ''
})

// getters
const getters = {
  getInvitationCode: (state) => {
    return state.invitationCode
  },
  getParent: (state) => {
    return state.parent
  }
}

// mutations
const mutations = {
  setInvitationCode (state, code) {
    state.invitationCode = code
  },
  setParent (state, parent) {
    state.parent = parent
  }
}

// actions
const actions = {
  findUser ({ commit }, address) {
    findUser({ walletAddress: address }).then(data => {
      data = data || { invCode: '', parent: '' }
      commit('setInvitationCode', data.invCode)
      commit('setParent', data.parent)
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

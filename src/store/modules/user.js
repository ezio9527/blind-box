import { findAddressByInvitation, findUser } from '@/server/http/api'

const state = () => ({
  invitationCode: '', // 自己的邀请码
  parent: '' // 邀请者(我的上级)
})

// getters
const getters = {
  getInvitationCode: (state) => {
    return state.invitationCode
  },
  getParent: (state) => {
    return state.parent || sessionStorage.getItem('inviter')
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
      data = data || { invCode: '', parentAddress: '' }
      if (data.invCode) {
        commit('setInvitationCode', data.invCode)
      }
      if (data.parentAddress) {
        commit('setParent', data.parentAddress)
        sessionStorage.setItem('inviter', data.parentAddress)
      }
    })
  },
  findInviter ({ commit }, code) {
    findAddressByInvitation({ invCode: code }).then(data => {
      data = data || { invCode: '', walletAddress: '' }
      commit('setParent', data.walletAddress)
      sessionStorage.setItem('inviter', data.walletAddress)
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

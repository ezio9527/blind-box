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
    return state.parent || sessionStorage.getItem('parent')
  }
}

// mutations
const mutations = {
  setInvitationCode (state, code) {
    state.invitationCode = code
  },
  setParent (state, parent) {
    state.parent = parent
    sessionStorage.setItem('parent', parent)
  }
}

// actions
const actions = {
  /**
   * 查找个人信息 + 查找邀请码 (同步处理)
   * 1.有上级
   * 2.无上级
   * 3.无个人信息 + 邀请码查到上级
   * 4.无个人信息 + 邀请码错误
   * 5.无个人信息 + 邀请码查失败
   * 6.个人信息查询失败
   * @param commit
   * @param address
   */
  findUserInfo ({ commit, dispatch }, { address, code }) {
    findUser({ walletAddress: address }).then(data => {
      if (data && data.parentAddress) {
        // 1.有上级
        commit('setInvitationCode', data.invCode)
        commit('setParent', data.parentAddress)
      } else if (data && !data.parentAddress) {
        // 2.无上级
        commit('setInvitationCode', data.invCode)
        commit('setParent', '')
      } else if (code) {
        findAddressByInvitation({ invCode: code }).then(data => {
          if (data && data.walletAddress) {
            // 3.无个人信息 + 邀请码查到上级
            commit('setParent', data.walletAddress)
          } else if (!data) {
            // 4.无个人信息 + 邀请码错误
            commit('setParent', '')
          }
        }).catch(e => {
          // 5.无个人信息 + 邀请码查失败
          commit('setParent', '')
        })
      }
    }).catch(e => {
      // 6.个人信息查询失败
      commit('setParent', '')
      setTimeout(() => {
      }, 1000)
    })
  },
  findUser ({ commit }, address) {
    findUser({ walletAddress: address }).then(data => {
      if (data && data.parentAddress) {
        // 1.有上级
        commit('setInvitationCode', data.invCode)
        commit('setParent', data.parentAddress)
      } else if (data && !data.parentAddress) {
        // 2.无上级
        commit('setInvitationCode', data.invCode)
        commit('setParent', '')
      }
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

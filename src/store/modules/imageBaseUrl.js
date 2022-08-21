import { getBaseUrl } from '@/server/http/api'

const state = () => ({
  // 所有图片的BaseUrl
  url: ''
})

// getters
const getters = {
  getUrl: (state) => {
    return state.url
  }
}

// mutations
const mutations = {
  setUrl (state, url) {
    state.url = url
  }
}

// actions
const actions = {
  async getBaseUrl ({ commit, dispatch }) {
    try {
      const data = await getBaseUrl()
      commit('setUrl', data)
    } catch (e) {
      dispatch('getBaseUrl')
    }
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

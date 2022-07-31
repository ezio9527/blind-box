const state = () => ({
  // 以下为登录接口返回字段
  username: '',
  location: '',
  memberLevel: '',
  token: '',
  realName: '',
  country: '',
  avatar: '',
  promotionCode: '',
  id: '',
  loginCount: '',
  superPartner: '',
  promotionPrefix: '',
  signInAbility: '',
  firstLevel: '',
  secondLevel: '',
  thirdLevel: '',
  signInActivity: '',
  memberRate: ''
})

// getters
const getters = {
  // 用户全部信息
  user: (state) => {
    return state
  },
  // 用户名
  username: (state) => {
    return state.username
  },
  // 登录状态
  loginStatus: (state) => {
    return Boolean(state.token)
  },
  // token
  token: (state) => {
    return state.token
  }
}

// mutations
const mutations = {
  setUser (state, user) {
    for (const key in user) {
      state[key] = user[key]
    }
  },
  clear (state) {
    for (const key in state) {
      state[key] = ''
    }
  }
}

// actions
const actions = {
  // 登录
  async login ({ commit, state }, data) {
    try {
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
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

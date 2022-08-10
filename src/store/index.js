import { createStore } from 'vuex'
import imageBaseUrl from './modules/imageBaseUrl'
import wallet from './modules/wallet'
import contract from './modules/contract'

// const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    imageBaseUrl,
    wallet,
    contract
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})

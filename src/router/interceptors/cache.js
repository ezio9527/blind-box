import store from '@/store'
import Cache from '@/plug-in/cache'

// 缓存数据拦截器
const before = () => {
  // 用户基础数据
  const user = Cache.getCache(Cache.CACHE_NAME_USER)
  if (user) {
    store.commit('user/setUser', user)
  }
  // 用户验证数据
  const authentication = Cache.getCache(Cache.CACHE_NAME_AUTHENTICATION)
  if (authentication) {
    store.commit('authentication/setAuthentication', authentication)
  }
  // 国家地区
  const country = Cache.getCache(Cache.CACHE_NAME_COUNTRY)
  if (country) {
    store.commit('country/setCountryList', country)
  }
  // 平台币种
  const coin = Cache.getCache(Cache.CACHE_NAME_COIN)
  const coinProtocol = Cache.getCache(Cache.CACHE_NAME_COIN_PROTOCOL)
  if (coin) {
    store.commit('coin/setCoinList', coin)
  }
  if (coinProtocol) {
    store.commit('coin/setCoinProtocol', coinProtocol)
  }
  // 代理登录验证状态
  const verificationProxy = Cache.getCache(Cache.CACHE_NAME_VERIFICATION_PROXY)
  if (verificationProxy) {
    store.commit('proxy/setVerificationProxy', verificationProxy)
  }
}
export default before

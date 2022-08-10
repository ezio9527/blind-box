// 添加响应拦截器
const axios = require('axios')
axios.interceptors.response.use(function (response) {
  const res = response.data
  if (res.code === '200') {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res)
  }
}, function (error) {
  return Promise.reject(error)
})

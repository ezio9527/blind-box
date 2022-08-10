const http = require('axios')

// 上传图url
export function getBaseUrl () {
  return http.get('/file/getBaseUrl')
}
// 联系方式
export function findContact () {
  return http.get('/tele/list')
}
// 合作方式
export function findCooperationAll () {
  return http.get('/friend/list')
}
export function findCooperationById (params) {
  return http.get('/friend/info', { params })
}
// Banner
export function findBannerAll () {
  return http.get('/banner/list')
}
// 通知公告
export function findNoticeAll () {
  return http.get('/notice/list')
}
export function findNoticeById (params) {
  return http.get('/notice/info', { params })
}
// 盲盒
export function findBoxAll (params) {
  return http.get('/box/list', { params })
}
export function findBoxById (params) {
  return http.get('/box/findById', { params })
}
// 资产记录
export function findWalletRecord (params) {
  return http.get('/wallet/walletRecord', { params })
}

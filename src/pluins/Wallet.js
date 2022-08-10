class Wallet {
  static ERROR_ADD_ETHEREUM_CHAIN = 100

  static {
    if (window && window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false
    }
  }

  /**
   * 获取钱包授权
   */
  static enable (walletConf) {
    return new Promise((resolve, reject) => {
      window.ethereum.request({
        method: 'eth_requestAccounts'
      }).then((accounts) => {
        // 判断当前网络节点
        if (Number(window.ethereum.chainId) === Number(walletConf.chainId)) {
          resolve(accounts[0])
        } else {
          Wallet.addEthereumChain(walletConf).catch(e => {
            reject(e)
          })
        }
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * 添加/切换BSC网络节点
   */
  static addEthereumChain (walletConf) {
    return new Promise((resolve, reject) => {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: walletConf.chainId }]
      }).then(() => {
        resolve()
      }).catch(switchError => {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [walletConf]
        }).then(() => {
          console.log('wallet_addEthereumChain')
          resolve()
        }).catch(addError => {
          console.log('wallet_addEthereumChain')
          reject(Wallet.ERROR_ADD_ETHEREUM_CHAIN)
        }).finally(() => {
          console.log('jaldjflaks')
        })
      })
    })
  }
}
export default Wallet

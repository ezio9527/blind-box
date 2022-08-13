import Web3 from 'web3'
import BaseContract from '@/server/contract/BaseContract'
import contract from '@data/contract.json'
import abi from '@data/CrazyBox.abi.json'

class BoxContract extends BaseContract {
  /**
   * abi方法名
   * @type {string}
   */
  static ABI_NAME_BUY = 'buyBox'

  /**
   * 初始化合约构造器
   * @param {String} walletAddress 钱包地址
   */
  constructor (walletAddress) {
    super(abi, walletAddress, contract.CrazyBox.address)
  }

  /**
   * 购买盲盒
   * @param {String} boxId 盲盒ID
   */
  buy ({ boxId, inviter = '0x0000000000000000000000000000000000000000' }) {
    const _boxId = Web3.utils.toHex(boxId)
    return new Promise((resolve, reject) => {
      const abi = this.getABI(BoxContract.ABI_NAME_BUY)
      const data = this.signature({
        func: abi,
        params: [
          _boxId,
          inviter
        ]
      })
      this.sendEtherFrom({ data, gasLimit: 500000 }).then(hash => {
        resolve(hash)
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export default BoxContract

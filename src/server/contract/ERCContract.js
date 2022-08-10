import BaseContract from '@/server/contract/BaseContract'
import abi from '@data/ERCToken.abi.json'

class BoxContract extends BaseContract {
  /**
   * abi方法名
   * @type {string}
   */
  static ABI_NAME_APPROVE = 'approve'

  /**
   * 初始化合约构造器
   * @param {String} walletAddress 钱包地址
   * @param {String} contractAddress 合约地址
   */
  constructor (walletAddress, contractAddress) {
    super(abi, walletAddress, contractAddress)
  }
}

export default BoxContract

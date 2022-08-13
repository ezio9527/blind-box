import walletConf from './wallet.conf.json'
import walletTestConf from './wallet.test.conf.json'

const ENV_PRODUCTION = 'production'
const ENV_DEVELOPMENT = 'development'

const env = ENV_DEVELOPMENT
let config

if (env === ENV_DEVELOPMENT) {
  config = walletTestConf
} else if (env === ENV_PRODUCTION) {
  config = walletConf
}

export default config

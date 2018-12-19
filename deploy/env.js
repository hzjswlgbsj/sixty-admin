/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/9/29
 * Time: 下午5:31
 */
const Log = require('./logger')

function _showUsage () {
  Log.info('打包上线请执行:npm run deploy')
}

module.exports = {
  getEnv () {
    let envStr = process.argv[2]

    if (!envStr) {
      _showUsage()
      process.exit()
    }

    return envStr
  }
}

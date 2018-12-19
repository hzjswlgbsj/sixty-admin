/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/9/29
 * Time: 下午5:34
 */
const chalk = require('chalk')

const Log = {
  info (msg) {
    console.log(chalk.green(msg))
  },
  warn (msg) {
    console.log(chalk.yellow(msg))
  },
  error (msg) {
    console.log(chalk.red(msg))
  }
}

module.exports = Log

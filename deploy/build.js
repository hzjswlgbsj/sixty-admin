/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/9/29
 * Time: 下午5:31
 */
const packageJson = require('../package.json')
const Log = require('./logger')

require('shelljs/global')

module.exports = {
  execute () {
    const version = `${packageJson.version}`

    Log.info('开始更新依赖......')
    exec('npm install')

    Log.info(`开始编译打包${version}版本.....`)
    exec(`rm -rf ${version}`) // 如果有当前版本号相同的版本则删除
    exec('npm run build')

    Log.info(`开始上传新的版本${version},请耐心等候上传成功.....`)
    exec(`cp -rf dist ${version}`)
    exec(`scp -r ${version} hiliulin:/www/sixty-admin`)

    Log.info('上传成功,请到服务器修改版本，然后访问地址:https://admin.sixtyden.com')

    exec(`rm -rf ${version}`)
  }
}

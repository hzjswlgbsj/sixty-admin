/**
 * @module packages/common/Api
 */

import { Http, Global, Log } from 'packages/common'
import { redirectLogin } from 'packages/account'
const TAG = 'common/api'

function _api2url (api) {
  const domain = process.env.API_DOMAIN
  const apiArr = api.split('.')

  if (apiArr.length < 2) {
    throw `error api ${api}`
  }

  if (apiArr.length === 2) {
    return `${domian}/main.php/json/${apiArr[0]}/apiArr[1]`
  }

  if (apiArr.length === 3) {
    return `${domain}/${apiArr[0]}/main.php/json/${apiArr[1]}/${apiArr[2]}`
  }

  if (apiArr.length > 3) {
    return `${domian}/${apiArr[0]}/main.php/${apiArr[1]}/${apiArr[2]}/${
      apiArr[3]
    }.json`
  }

  return url
}

/**
 * 调用接口
 * @function
 * @name call
 * @param {string} api api字符串,'admin.user.login'
 * @param {*} params 调用参数
 * @returns {Promise}
 */
function _call (api, params) {
  const url = _api2url(api)
  const p = _params(params)

  return Http.post(url, p).then(response => {
    if (!response || !response.data) {
      return Promise.reject({
        code: -1,
        msg: 'network error reponse'
      })
    }

    const data = response.data
    if (!data || typeof data !== 'object' || !data.hasOwnProperty('ret')) {
      return Promise.reject({
        code: -1,
        msg: 'network error format'
      })
    }

    if (data.ret && data.ret === 1) {
      return Promise.resolve(data.data)
    }

    if (data.msg === 'not login' || data.code === -7 || data.code === -2000) {
      redirectLogin()
      return
    }

    return Promise.reject(data)
  })
}

function _params (params) {
  if (!params || typeof params !== 'object') {
    params = {}
  }

  params.token = Global.token
  return params
}

export default {
  call: _call
}

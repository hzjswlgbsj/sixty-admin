/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/7/10
 * Time: 上午11:19
 */
import { Api, Store } from '../common'
import _ from 'lodash'

function _getApi (type, params) {
  let curApi = _.find(Store.store('curConfig').apis, {'type': type})
  if (curApi && curApi.name) {
    return Api.call(curApi.name, params)
  } else {
    alert(`${type}方法没有在配置文件中配置`)
  }
}

export function all (params) {
  return _getApi('all', params)
}

export function add (params) {
  return _getApi('add', params)
}

export function update (params) {
  return _getApi('update', params)
}

export function del (params) {
  return _getApi('delete', params)
}

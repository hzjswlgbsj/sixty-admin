/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/7/3
 * Time: 上午11:43
 */
import { Api } from '../common'

export function upload (file) {
  return Api.call('upload.picture', file)
}

export function uploadByBase64 (base64) {
  return Api.call('upload.base64', {
    base64
  })
}

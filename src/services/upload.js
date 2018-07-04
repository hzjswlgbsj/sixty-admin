/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/7/3
 * Time: 上午11:43
 */
import { Api } from '../common'

export function upload (file) {
  return Api.call('admin.upload.upload_pic', file)
}

export function uploadByBase64 (base64, appkey) {
  return Api.call('admin.upload.img_by_base64', {
    base64,
    appkey
  })
}

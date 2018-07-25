/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/7/24
 * Time: 下午11:31
 */
import { Api } from '../common'

export function getTag (id) {
  return Api.call('tag.all', {
    id
  })
}

export function addTag (name, color, id) {
  return Api.call('tag.add', {
    name,
    color,
    id
  })
}

export function deleteTag (id) {
  return Api.call('tag.del', {
    id
  })
}

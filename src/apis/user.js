/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/12/5
 * Time: 8:54 AM
 */
import { Api } from '../common'

export function login (nickname, pass) {
  return Api.call('user.login', {
    nickname,
    pass
  })
}

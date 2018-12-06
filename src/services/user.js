/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/12/5
 * Time: 8:55 AM
 */
import { login } from '../apis/user'
import { Message } from '../common'

export async function userLogin (nickname, pass) {
  try {
    return await login(nickname, pass)
  } catch (e) {
    Message.error(e.msg)
  }
}

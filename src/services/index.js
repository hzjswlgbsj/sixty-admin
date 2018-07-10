/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/7/10
 * Time: 上午10:58
 */

import { all, update, del } from '../apis'

export async function getRemoteData (filter) {
  let params = {
    filter
  }
  try {
    let result = await all(params)
    return result
  } catch (e) {
    console.error(e)
  }
}

/**
 * 传id就是更新，不传id就是新增
 * @param params
 * @return {Promise}
 */
export async function updateData (params) {
  try {
    let result = await update(params)
    return result
  } catch (e) {
    alert(e.msg)
    console.error(e)
  }
}

export async function deleteData (id) {
  try {
    let params = {
      id
    }
    let result = await del(params)
    return result
  } catch (e) {
    console.error(e)
  }
}

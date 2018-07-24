/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/7/24
 * Time: 下午11:30
 */
import { getTag } from '../apis/tag'

export async function getRemoteTag () {
  try {
    return await getTag()
  } catch (e) {
    console.error(e)
  }
}

export async function addRemoteTag () {
  try {
    return await getTag()
  } catch (e) {
    console.error(e)
  }
}

export async function delRemoteTag () {
  try {
    return await getTag()
  } catch (e) {
    console.error(e)
  }
}

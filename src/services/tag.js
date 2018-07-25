/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/7/24
 * Time: 下午11:30
 */
import { getTag, addTag, deleteTag } from '../apis/tag'
import { Message } from '../common'

export async function getRemoteTag (id) {
  try {
    return await getTag(id)
  } catch (e) {
    console.error(e)
  }
}

export async function addRemoteTag (name, color, id) {
  try {
    let ret = await addTag(name, color, id)
    ret && Message.error('添加成功')
  } catch (e) {
    Message.error(e.msg)
    console.error(e)
  }
}

export async function delRemoteTag (id) {
  try {
    let ret = await deleteTag(id)
    ret && Message.error('删除成功')
  } catch (e) {
    Message.error(e.msg)
    console.error(e)
  }
}

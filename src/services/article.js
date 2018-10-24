/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/6/24
 * Time: 下午5:30
 */
import { getArticle, addArticle, deleteArticle } from '../apis/article'
import { Message } from '../common'

export async function getArticles () {
  try {
    return await getArticle()
  } catch (e) {
    console.error(e)
  }
}

export async function articleAdd (title, musicId, categoryId, introduction, nickname, coverPicture, content, tagIds, id) {
  try {
    let ret = await addArticle(title, musicId, categoryId, introduction, nickname, coverPicture, content, tagIds, id)
    ret && Message.success('添加成功')
    return ret
  } catch (e) {
    console.error(e)
  }
}

export async function articleDelete (id) {
  try {
    let ret = await deleteArticle(id)
    ret && Message.success('删除成功')
    return ret
  } catch (e) {
    console.error(e)
  }
}

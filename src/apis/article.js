/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/6/24
 * Time: 下午5:31
 */
import { Api } from '../common'

export function getArticle () {
  return Api.call('article.all')
}

export function addArticle (title, categoryId, introduction, nickname, coverPicture, content, tagIds, id) {
  return Api.call('article.add', {
    title,
    category_id: categoryId,
    introduction,
    nickname,
    coverPicture,
    content,
    tagIds,
    id
  })
}

export function deleteArticle (id) {
  return Api.call('article.del', {
    id
  })
}

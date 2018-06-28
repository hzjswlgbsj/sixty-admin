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

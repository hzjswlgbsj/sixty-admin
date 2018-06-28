/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/6/24
 * Time: 下午5:30
 */
import { getArticle } from '../apis/article'

export async function getArticles () {
  try {
    return await getArticle()
  } catch (e) {
    console.error(e)
  }
}

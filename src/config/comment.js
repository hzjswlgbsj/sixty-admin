/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/11/15
 * Time: 9:12 AM
 */
import form from '../const/form'

export default {
  apis: [
    {
      type: 'all', // 类型，用于区分是什么类型的接口
      name: 'comment.all', // 接口字符串
      params: [
        {
          name: 'type',
          type: String,
          default: 'message'
        },
        {
          name: 'article_id',
          type: Number,
          default: -1
        }
      ]
    },
    {
      type: 'delete',
      name: 'comment.delete'
    }
  ],
  columns: [
    {
      type: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '内容',
      key: 'content'
    },
    {
      title: '文章',
      key: 'article_id'
    },
    {
      title: '评论类型',
      key: 'type'
    },
    {
      title: '评论人',
      key: 'user_nickname'
    },
    {
      title: '创建时间',
      key: 'create_time'
    }
  ],
  form: []
}

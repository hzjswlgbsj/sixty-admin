/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/11/22
 * Time: 11:16 AM
 */
// import form from '../const/form'

export default {
  apis: [
    {
      type: 'all', // 类型，用于区分是什么类型的接口
      name: 'user.all', // 接口字符串
      params: [
        {
          name: 'type',
          type: String,
          default: 'link'
        }
      ]
    },
    {
      type: 'update',
      name: 'link.add'
    }
  ],
  columns: [
    {
      type: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '名称',
      key: 'nickname'
    },
    {
      title: '头像',
      key: 'avatar'
    },
    {
      title: '状态',
      key: 'status'
    },
    {
      title: '微博id',
      key: 'weibo_uid'
    },
    {
      title: '创建时间',
      key: 'created_at'
    }
  ],
  form: []
}

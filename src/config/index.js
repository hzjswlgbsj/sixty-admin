import form from '../const/form'

/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/7/5
 * Time: 上午10:21
 */

export default {
  apis: [
    {
      type: 'all', // 类型，用于区分是什么类型的接口
      name: 'article.all', // 接口字符串
      params: [
        {
          name: 'id',
          type: Number,
          default: 0
        }
      ]
    },
    {
      type: 'add',
      name: 'article.add'
    },
    {
      type: 'update',
      name: 'article.update'
    },
    {
      type: 'delete',
      name: 'article.delete'
    }
  ],
  columns: [
    {
      type: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '标题',
      key: 'title'
    },
    {
      title: '作者',
      key: 'nickname'
    },
    {
      title: '标签',
      key: 'tag_ids'
    },
    {
      title: '创建时间',
      key: 'create_time'
    }
  ],
  form: [
    {
      key: 'type',
      label: '模板类型:',
      type: form.FORM_TYPE_STRING
    },
    {
      key: 'desc',
      label: '模板描述:',
      type: form.FORM_TYPE_STRING
    },
    {
      key: 'content',
      label: '模板内容',
      type: form.FORM_TYPE_MARKDOWN
    }
  ]
}

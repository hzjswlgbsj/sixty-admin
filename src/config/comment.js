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
      title: '名称',
      key: 'nickname'
    },
    {
      title: '描述',
      key: 'description'
    },
    {
      title: 'URL',
      key: 'link'
    },
    {
      title: '颜色',
      key: 'color'
    },
    {
      title: '创建时间',
      key: 'create_time'
    }
  ],
  form: [
    {
      key: 'nickname',
      label: '标签名称:',
      type: form.FORM_TYPE_STRING
    },
    {
      key: 'description',
      label: '描述:',
      type: form.FORM_TYPE_STRING
    },
    {
      key: 'link',
      label: '连接:',
      type: form.FORM_TYPE_STRING
    },
    {
      key: 'color',
      label: '标签颜色:',
      type: form.FORM_TYPE_ENUM,
      options: [
        {label: '紫色', value: 'purple'},
        {label: '蓝色', value: 'blue'},
        {label: '白色', value: 'white'},
        {label: '黄色', value: 'yellow'},
        {label: '绿色', value: 'green'}
      ]
    },
    {
      key: 'logo_url',
      label: 'logo链接:',
      type: form.FORM_TYPE_STRING
    }
  ]
}

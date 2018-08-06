import form from '../const/form'

/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/8/5
 * Time: 下午10:21
 */

export default {
  apis: [
    {
      type: 'all', // 类型，用于区分是什么类型的接口
      name: 'tag.all', // 接口字符串
      params: [
        {
          name: 'id',
          type: Number,
          default: 0
        }
      ]
    },
    {
      type: 'update',
      name: 'tag.add'
    },
    {
      type: 'delete',
      name: 'tag.del'
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
      key: 'name'
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
      key: 'name',
      label: '标签名称:',
      type: form.FORM_TYPE_STRING
    },
    {
      key: 'color',
      label: '标签颜色:',
      type: form.FORM_TYPE_STRING
    }
  ]
}

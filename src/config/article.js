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
      type: 'update',
      name: 'article.add'
    },
    {
      type: 'delete',
      name: 'article.del'
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
      key: 'title',
      label: '文章标题:',
      type: form.FORM_TYPE_STRING
    },
    {
      key: 'nickname',
      label: '文章作者:',
      type: form.FORM_TYPE_STRING
    },
    {
      key: 'tag_ids',
      label: '文章标签:',
      type: form.FORM_TYPE_TAG
    },
    {
      key: 'introduction',
      label: '文章简介:',
      type: form.FORM_TYPE_TEXTAREA
    },
    {
      key: 'cover_picture',
      label: '文章封面:',
      type: form.FORM_TYPE_UPLOAD
    },
    {
      key: 'content',
      label: '文章内容:',
      type: form.FORM_TYPE_MARKDOWN
    }
    /* 这是select的示例配置 */
    // {
    //   key: 'category',
    //   label: '模板类型:',
    //   type: form.FORM_TYPE_ENUM,
    //   options: [
    //     {label: '服务文档模板', value: 'service'},
    //     {label: 'gitlab模板', value: 'gitlab'}
    //   ]
    // }
  ]
}

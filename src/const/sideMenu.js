/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/6/23
 * Time: 下午11:26
 */
import {
  ROUTE_PATH_ARTICLE,
  ROUTE_PATH_ARTICLE_PUBLISH,
  ROUTE_PATH_COMMENT,
  ROUTE_PATH_TAG,
  ROUTE_PATH_RESOURCE,
  ROUTE_PATH_FRIEND,
  ROUTE_PATH_USER,
  ROUTE_PATH_ACTIVE,
  ROUTE_PATH_REPORT,
  ROUTE_PATH_REPORT_BLACKLIST,
  ROUTE_PATH_WEBSITE,
  ROUTE_PATH_WEBSITE_STATISTICS

} from '../router/const'
export default [
  {
    title: '文章管理',
    icon: 'ios-paper',
    children: [
      {
        title: '文章列表',
        path: ROUTE_PATH_ARTICLE
      },
      {
        title: '发布文章',
        path: ROUTE_PATH_ARTICLE_PUBLISH
      }
    ]
  },
  {
    title: '评论管理',
    icon: 'ios-paper',
    children: [
      {
        title: '评论列表',
        path: ROUTE_PATH_COMMENT
      }
    ]
  },
  {
    title: '标签管理',
    icon: 'ios-paper',
    children: [
      {
        title: '标签列表',
        path: ROUTE_PATH_TAG
      }
    ]
  },
  {
    title: '资源管理',
    icon: 'ios-paper',
    children: [
      {
        title: '资源列表',
        path: ROUTE_PATH_RESOURCE
      },
      {
        title: '友链列表',
        path: ROUTE_PATH_FRIEND
      }
    ]
  },
  {
    title: '用户管理',
    icon: 'ios-paper',
    children: [
      {
        title: '用户列表',
        path: ROUTE_PATH_USER
      },
      {
        title: '活跃榜单',
        path: ROUTE_PATH_ACTIVE
      }
    ]
  },
  {
    title: '举报管理',
    icon: 'ios-paper',
    children: [
      {
        title: '待处理',
        path: ROUTE_PATH_REPORT
      },
      {
        title: '黑名单',
        path: ROUTE_PATH_REPORT_BLACKLIST
      }
    ]
  },
  {
    title: '站长中心',
    icon: 'ios-paper',
    children: [
      {
        title: '个人信息',
        path: ROUTE_PATH_WEBSITE
      },
      {
        title: '网站统计',
        path: ROUTE_PATH_WEBSITE_STATISTICS
      }
    ]
  }
]

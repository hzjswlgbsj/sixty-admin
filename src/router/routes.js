import {
  ROUTE_NAME_LOGIN, ROUTE_PATH_LOGIN,
  ROUTE_NAME_ARTICLE, ROUTE_PATH_ARTICLE,
  ROUTE_NAME_ARTICLE_PUBLISH, ROUTE_PATH_ARTICLE_PUBLISH,
  ROUTE_NAME_COMMENT, ROUTE_PATH_COMMENT,
  ROUTE_NAME_TAG, ROUTE_PATH_TAG,
  ROUTE_NAME_RESOURCE, ROUTE_PATH_RESOURCE,
  ROUTE_NAME_FRIEND, ROUTE_PATH_FRIEND,
  ROUTE_NAME_USER, ROUTE_PATH_USER,
  ROUTE_NAME_ACTIVE, ROUTE_PATH_ACTIVE,
  ROUTE_NAME_REPORT, ROUTE_PATH_REPORT,
  ROUTE_NAME_REPORT_BLACKLIST, ROUTE_PATH_REPORT_BLACKLIST,
  ROUTE_NAME_WEBSITE, ROUTE_PATH_WEBSITE,
  ROUTE_NAME_WEBSITE_STATISTICS, ROUTE_PATH_WEBSITE_STATISTICS
} from './const'
import Index from '../pages/Index'
import Article from '../pages/Article'
import Login from '../pages/Login'
import ArticlePublish from '../pages/ArticlePublish'
import ArticleComment from '../pages/ArticleComment'
import ArticleTag from '../pages/ArticleTag'
import Resource from '../pages/Resource'
import Friend from '../pages/Friend'
import User from '../pages/User'
import UserActive from '../pages/UserActive'
import Report from '../pages/Report'
import ReportBlacklist from '../pages/ReportBlacklist'
import Website from '../pages/Website'
import WebsiteStatistics from '../pages/WebsiteStatistics'

export default [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: ROUTE_PATH_ARTICLE,
    children: [
      {
        path: ROUTE_PATH_ARTICLE,
        name: ROUTE_NAME_ARTICLE,
        component: Article
      },
      {
        path: ROUTE_PATH_ARTICLE_PUBLISH,
        name: ROUTE_NAME_ARTICLE_PUBLISH,
        component: ArticlePublish
      },
      {
        path: ROUTE_PATH_COMMENT,
        name: ROUTE_NAME_COMMENT,
        component: ArticleComment
      },
      {
        path: ROUTE_PATH_TAG,
        name: ROUTE_NAME_TAG,
        component: ArticleTag
      },
      {
        path: ROUTE_PATH_RESOURCE,
        name: ROUTE_NAME_RESOURCE,
        component: Resource
      },
      {
        path: ROUTE_PATH_FRIEND,
        name: ROUTE_NAME_FRIEND,
        component: Friend
      },
      {
        path: ROUTE_PATH_USER,
        name: ROUTE_NAME_USER,
        component: User
      },
      {
        path: ROUTE_PATH_ACTIVE,
        name: ROUTE_NAME_ACTIVE,
        component: UserActive
      },
      {
        path: ROUTE_PATH_REPORT,
        name: ROUTE_NAME_REPORT,
        component: Report
      },
      {
        path: ROUTE_PATH_REPORT_BLACKLIST,
        name: ROUTE_NAME_REPORT_BLACKLIST,
        component: ReportBlacklist
      },
      {
        path: ROUTE_PATH_WEBSITE,
        name: ROUTE_NAME_WEBSITE,
        component: Website
      },
      {
        path: ROUTE_PATH_WEBSITE_STATISTICS,
        name: ROUTE_NAME_WEBSITE_STATISTICS,
        component: WebsiteStatistics
      }
    ]
  },
  {
    path: ROUTE_PATH_LOGIN,
    name: ROUTE_NAME_LOGIN,
    component: Login
  }
]

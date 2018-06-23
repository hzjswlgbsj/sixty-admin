import {
  ROUTE_NAME_ARTICLE,
  ROUTE_PATH_ARTICLE
} from './const'
import Index from '../pages/Index'
import Article from '../pages/Article'

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
      }
    ]
  }
]

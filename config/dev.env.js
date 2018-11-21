'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_DOMAIN: '"http://api.sixty.com"',
  WEIBO_DOMAIN: '"https://api.weibo.com"',
  WEIBO_GET_TOKEN_URL: '"https://api.weibo.com/oauth2/access_token"',
  WEIBO_GET_USER_URL: '"https://api.weibo.com/2/users/show.json"'
})

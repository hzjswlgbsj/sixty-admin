<template>
  <div class="article-list">
    <CommonTable
      add-title="用户"
      :table-config="config"/>
  </div>
</template>

<script>
import CommonTable from '../components/commonTable/CommonTable'
import userConfig from '../config/user'
import { Store } from '../common'
export default {
  name: 'ArticleTag',
  components: {
    CommonTable
  },
  data () {
    return {
      config: userConfig
    }
  },
  created () {
    Store.store('curConfig', this.config)
  }
}
</script>

<style lang="scss" scoped>
  .article-list {
    text-align: left;
    height: 100%;
  }
</style>

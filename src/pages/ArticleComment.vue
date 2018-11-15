<template>
  <div class="article-list">
    <CommonTable
      add-title="评论列表"
      :table-config="config"/>
  </div>
</template>

<script>
import CommonTable from '../components/commonTable/CommonTable'
import commentConfig from '../config/comment'
import { Store } from '../common'
export default {
  name: 'ArticleComment',
  components: {
    CommonTable
  },
  data () {
    return {
      config: commentConfig
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

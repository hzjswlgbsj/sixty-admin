<template>
  <div class="article-list">
    <CommonTable
      add-title="文章"
      :table-config="config"/>
  </div>
</template>

<script>
import CommonTable from '../components/commonTable/CommonTable'
import tableConfig from '../config/article'
import { Store } from '../common'
export default {
  name: 'Article',
  components: {
    CommonTable
  },
  data () {
    return {
      config: tableConfig
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

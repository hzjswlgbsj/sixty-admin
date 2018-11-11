<template>
  <div class="article-list">
    <CommonTable
      add-title="友链"
      :table-config="config"/>
  </div>
</template>

<script>
import CommonTable from '../components/commonTable/CommonTable'
import friendConfig from '../config/friend'
import { Store } from '../common'
export default {
  name: 'Article',
  components: {
    CommonTable
  },
  data () {
    return {
      config: friendConfig
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

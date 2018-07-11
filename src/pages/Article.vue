<template>
  <div class="article-list">
    <CommonTable
      add-title="添加模板"
      :table-config="config"/>
  </div>
</template>

<script>
import CommonTable from '../components/commonTable/CommonTable'
import tableConfig from '../config'
export default {
  name: 'Article',
  components: {
    CommonTable
  },
  data () {
    return {
      config: tableConfig
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-list {
    text-align: left;
  }
</style>

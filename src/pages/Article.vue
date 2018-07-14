<template>
  <div class="article-list">
    <!--<CommonTable-->
      <!--add-title="添加模板"-->
      <!--:table-config="config"/>-->
    <sixty-tag
      tagsname="添加标签"
      :tag-ids.sync="taskLocalCategory"
      :tags-data="taskCategory"
      @add-origin-tag="addOriginTag"
      @delete-origin-tag="deleteOriginTag"
      @edit-origin-tag="editOriginTag"/>
  </div>
</template>

<script>
import CommonTable from '../components/commonTable/CommonTable'
import SixtyTag from '../components/SixtyTag'
import tableConfig from '../config'
export default {
  name: 'Article',
  components: {
    CommonTable,
    SixtyTag
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
    height: 100%;
  }
</style>

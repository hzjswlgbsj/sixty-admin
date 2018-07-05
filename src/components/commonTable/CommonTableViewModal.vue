<template>
  <div>
    <Modal
      v-model="visible"
      title="查看模板"
      width="1000px">
      <mavon-editor
        class="service-document-content-markdown"
        :value="viewContent"
        code-style="androidstudio"
        :toolbars-flag="false"
        default-open="preview"
        :subfield="false" />
    </Modal>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'

export default {
  name: 'CommonTableViewModal',
  components: {
    mavonEditor
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: this.value,
      viewContent: this.content
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    content (val) {
      this.viewContent = val
    },
    visible (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

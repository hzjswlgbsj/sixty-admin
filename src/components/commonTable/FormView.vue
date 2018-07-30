<template>
  <div class="common-form-container">
    <Form
      class="common-form"
      label-position="top">
      <single-form
        :form="item"
        v-model="formData[item.key]"
        v-for="(item, idx) in formDefine"
        :key="idx"
        @on-change="change"/>
    </Form>
  </div>
</template>

<script>
import SingleForm from './SingleForm'
import _ from 'lodash'

export default {
  name: 'FormView',

  components: {
    SingleForm
  },

  props: {
    value: {
      type: Object,
      default: () => {}
    },
    tableConfig: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      formData: this.value
    }
  },

  watch: {
    value (val) {
      this.formData = val
    }
  },

  computed: {
    formDefine () {
      if (this.tableConfig.form && _.isArray(this.tableConfig.form)) {
        return this.tableConfig.form
      } else {
        return []
      }
    }
  },

  methods: {
    change () {
      this.$emit('input', this.formData)
      this.$emit('on-change', this.formData)
    }
  }
}
</script>
<style scoped>
  .common-form-container {
    width: 100%;
  }
  .common-form {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
  }
</style>

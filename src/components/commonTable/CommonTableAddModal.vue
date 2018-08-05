<template>
  <div>
    <Modal
      :transfer="false"
      v-model="visible"
      title="添加模板"
      @on-ok="addEventHandle"
      :loading="addModalLoading"
      width="1000px">
      <form-view
        :table-config="tableConfig"
        v-model="addForm"/>
    </Modal>
  </div>
</template>
<script>
import FormView from './FormView'

export default {
  name: 'CommonTableAddModal',
  components: {
    FormView
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    addButtonLoading: {
      type: Boolean,
      default: true
    },
    formData: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: this.value,
      addModalLoading: this.addButtonLoading,
      addForm: this.formData,
      ruleValidate: {
        type: [
          { required: true, message: '类型必填', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    tableConfig () {
      return this.config
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    addButtonLoading (val) {
      this.addModalLoading = val
    },
    visible (val) {
      this.$emit('input', val)
    },
    formData: {
      deep: true,
      handler: function (v) {
        this.addForm = v
      }
    }
  },
  methods: {
    addEventHandle () {
      this.$emit('add-event-handle', this.addForm)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

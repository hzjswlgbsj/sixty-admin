<template>
  <div class="common-table">
    <div class="document-template-add">
      <Button
        type="primary"
        @click="handleAdd">
        {{ addTitle }}
      </Button>
    </div>
    <!--table-->
    <Table
      border
      stripe
      :columns="config.columns"
      :data="tableData" />

    <!--添加和编辑模板的modal-->
    <common-table-add-modal
      v-model="addModal"
      :add-button-loading="addButtonLoading"
      :form-data="dataForm"
      :config="config"
      @add-event-handle="handleAddTemplate"/>

    <!--查看模板的modal-->
    <common-table-view-modal
      v-model="viewModal"
      :content="curTemplate.content"/>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import CommonMavonEditor from '../CommonMavonEditor'
import CommonTableViewModal from './CommonTableViewModal'
import CommonTableAddModal from './CommonTableAddModal'
import { getArticles, addArticle, delArticle } from '../../services/article'
import _ from 'lodash'
export default {
  name: 'CommonTable',
  components: {
    mavonEditor,
    CommonMavonEditor,
    CommonTableViewModal,
    CommonTableAddModal
  },
  props: {
    tableConfig: {
      type: Object,
      default: () => {}
    },
    addTitle: {
      type: String,
      default: '添加'
    }
  },
  data () {
    return {
      addModal: false,
      addButtonLoading: true,
      viewModal: false,
      curId: 0,
      curTemplate: {},
      dataForm: {},
      tableData: [],
      operationColumn: {
        title: '操作',
        render: (h, params) => {
          return h('div', [
            h('a', {
              style: {
                color: 'blue',
                marginRight: '20px',
                fontSize: '16px'
              },
              on: {
                click: () => {
                  this.handleEditEvent(params.row.id)
                }
              }
            }, '编辑'),
            h('Poptip', {
              props: {
                title: '确认删除?',
                confirm: true,
                transfer: true
              },
              on: {
                'on-ok': () => {
                  this.executedeleteEvent(params.row.id)
                }
              }
            }, [
              h('a', {
                style: {
                  color: 'red',
                  marginRight: '20px',
                  fontSize: '16px'
                }
              }, '删除')
            ]),
            h('a', {
              style: {
                color: 'green',
                fontSize: '16px'
              },
              on: {
                click: () => {
                  this.handleViewEvent(params.row.id)
                }
              }
            }, '查看')
          ])
        }
      },
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
  created () {
    this.initData()
  },
  computed: {
    config () {
      if (_.isEmpty(this.tableConfig) || !_.isObject(this.tableConfig)) {
        this.$Message.error('table配置文件不正确')
        return
      }

      let tableConfig = _.cloneDeep(this.tableConfig)
      tableConfig.columns.push(this.operationColumn)
      return tableConfig
    }
  },
  methods: {
    async initData () {
      this.tableData = await getArticles()
      console.log(2222222222)
      console.log(this.tableData)
      console.log(2222222222)
    },
    async handleAddTemplate (addForm) {
      this.dataForm = addForm
      if (!addForm.type) {
        this.$Message.error('请填写类型')
        this.addButtonLoading = false
        return
      }
      if (!addForm.desc) {
        this.$Message.error('请填写描述')
        this.addButtonLoading = false
        return
      }
      if (!addForm.content) {
        this.$Message.error('请填写内容')
        this.addButtonLoading = false
        return
      }
      let params = {
        id: this.curId
      }
      this.config.form.map((item) => {
        params[item.key] = this.dataForm[item.key]
      })
      let ret = await addArticle(params)
      if (ret) {
        this.$Message.success('添加模板成功')
        this.initData()
        this.addModal = false
      } else {
        this.$Message.error('添加失败')
      }
    },
    async executedeleteEvent (id) {
      if (!id) {
        this.$Message.error('参数错误')
        return
      }
      let ret = await delArticle(id)
      if (ret) {
        this.$Message.success('删除模板成功')
        this.initData()
      } else {
        this.$Message.error('删除失败')
      }
    },
    handleAdd () {
      this.addModal = true
      this.curId = null
      this.cleanForm()
    },
    handleViewEvent (id) {
      this.viewModal = true
      this.setCurTempById(id)
    },
    handleEditEvent (id) {
      this.addModal = true
      this.setCurTempById(id)
      this.dataForm = this.curTemplate
    },
    setCurTempById (id) {
      this.curId = id
      this.curTemplate = _.find(this.tableData, {id: this.curId})
    },
    cleanForm () {
      this.dataForm = {}
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

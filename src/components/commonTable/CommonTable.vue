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
      :data="templateData" />

    <!--添加和编辑模板的modal-->
    <CommonTableAddModal
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
  import CommonMavonEditor from './CommonMavonEditor'
  import CommonTableViewModal from './CommonTableViewModal'
  import CommonTableAddModal from './CommonTableAddModal'
  import { getDocumentTemplate, updateDocumentTemplate, deleteDocumentTemplate} from 'packages/document'
  import message from 'packages/common/message'
  import { Log } from 'packages/common'

  const TAG = 'service/document'
  Log.info(TAG, '因为懒得打，所以写个这个以便于复制')
  export default {
    name: 'DocumentTemplate',
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
        templateData: [],
        operationColumn: {
          title: '操作',
          render: (h, params) => {
            return h ('div', [
              h ('a', {
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
                h ('a', {
                  style: {
                    color: 'red',
                    marginRight: '20px',
                    fontSize: '16px'
                  }
                }, '删除')
              ]),
              h ('a', {
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
            { required: true, message: '请填写描述', trigger: 'blur' },
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
          message.error('table配置文件不正确')
          return
        }

        let tableConfig = _.cloneDeep(this.tableConfig)
        tableConfig.columns.push(this.operationColumn)
        return tableConfig
      }
    },
    methods: {
      async initData () {
        let ret = await getDocumentTemplate()
        this.templateData = ret.items
      },
      async handleAddTemplate (addForm) {
        this.dataForm = addForm
        if (!addForm.type) {
          message.error('请填写类型')
          this.addButtonLoading = false
          return
        }
        if (!addForm.desc) {
          message.error('请填写描述')
          this.addButtonLoading = false
          return
        }
        if (!addForm.content) {
          message.error('请填写内容')
          this.addButtonLoading = false
          return
        }
        let params = {
          id: this.curId
        }
        this.config.form.map( (item) => {
          params[item.key] = this.dataForm[item.key]
        })
        let ret = await updateDocumentTemplate(params)
        if (ret) {
          message.success('添加模板成功')
          this.initData()
          this.addModal = false
        } else {
          message.error('添加失败')
        }
      },
      async executedeleteEvent (id) {
        if (!id) {
          message.error('参数错误')
          return
        }
        let ret = await deleteDocumentTemplate(id)
        if (ret) {
          message.success('删除模板成功')
          this.initData()
        } else {
          message.error('删除失败')
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
        this.curTemplate = _.find(this.templateData, {id: this.curId})
      },
      cleanForm () {
        this.dataForm = {}
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>

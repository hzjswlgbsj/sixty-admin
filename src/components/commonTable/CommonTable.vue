<template>
  <div class="common-table">
    <div class="common-table-add">
      <div class="common-table-add-text">{{ addTitle }}列表</div>
      <div>
        <Button type="primary" @click="handleAdd">添加{{ addTitle }}</Button>
      </div>
    </div>
    <!--table-->
    <Table
      border
      stripe
      :columns="config.columns"
      :data="remoteData" />

    <!--添加和编辑的modal-->
    <CommonTableAddModal
      v-model="addModal"
      :add-button-loading="addButtonLoading"
      :form-data="dataForm"
      :config="config"
      @add-event-handle="executeAddEvent"/>

    <!--查看的modal-->
    <common-table-view-modal
      v-model="viewModal"
      :content="curData.content"/>
  </div>
</template>
<script>
import CommonTableViewModal from './CommonTableViewModal'
import CommonTableAddModal from './CommonTableAddModal'
import { getRemoteData, updateData, deleteData } from '../../services'
import _ from 'lodash'

export default {
  name: 'CommonTable',
  components: {
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
      curData: {},
      dataForm: {},
      remoteData: [],
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
                  this.executeDeleteEvent(params.row.id)
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
      this.remoteData = await getRemoteData()
    },
    async executeAddEvent (addForm) {
      this.dataForm = addForm
      if (!addForm.title || !addForm.introduction || !addForm.content) {
        this.$Message.error('请填写必填字段')
        this.addButtonLoading = false
        return
      }
      let params = {
        id: this.curId
      }
      this.config.form.map((item) => {
        params[item.key] = this.dataForm[item.key]
      })
      let ret = await updateData(params)
      if (ret) {
        this.$Message.success('添加成功')
        this.initData()
        this.addModal = false
      } else {
        this.$Message.error('添加失败')
        this.addModal = false
      }
    },
    async executeDeleteEvent (id) {
      if (!id) {
        this.$Message.error('参数错误')
        return
      }
      let ret = await deleteData(id)
      if (ret) {
        this.$Message.success('删除成功')
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
      this.dataForm = this.curData
    },
    setCurTempById (id) {
      this.curId = id
      this.curData = _.find(this.remoteData, {id: this.curId})
    },
    cleanForm () {
      this.dataForm = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .common-table-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .common-table-add-text {
      font-size: 16px;
      margin-top: 3px;
    }
  }
</style>

<template>
  <div class="commonediter">
    <FormItem v-if="isCommon(mForm)">
      <div slot="label">{{ mForm.label }}
        <Tooltip
          transfer
          placement="left">
          <Icon
            v-if="mForm.desc"
            type="information-circled"/>
          <div
            class="commonediter-desc"
            slot="content">
            {{ mForm.desc }}
          </div>
        </Tooltip>
      </div>
      <i-input
        @on-change=change
        v-if="mForm.type === formConst.FORM_TYPE_STRING"
        v-model="mData"
        placeholder="请输入" />
      <i-input
        @on-change=change
        v-if="mForm.type === formConst.FORM_TYPE_ARRAY || mForm.type === formConst.FORM_TYPE_OBJECT || mForm.type === formConst.FORM_TYPE_TEXTAREA"
        v-model="mData"
        type="textarea"
        placeholder="请输入" />
      <InputNumber
        @on-change=change
        v-if="mForm.type === formConst.FORM_TYPE_INTEGER"
        v-model="mData"
        :min="0"/>
      <InputNumber
        @on-change=change
        v-if="mForm.type === formConst.FORM_TYPE_NUMBER"
        v-model="mData"
        :step="0.1"
        :min="0"/>
      <Select
        @on-change=change
        v-if="mForm.type === formConst.FORM_TYPE_ENUM"
        clearable
        v-model="mData"
        placeholder="请选择">
        <Option
          v-if="typeof value != 'object'"
          v-for="(value, key) in mForm.values"
          :key="key"
          :value="value">{{ value }}</Option>
        <Option
          v-if="typeof value == 'object'"
          v-for="(value, key) in mForm.values"
          :key="key"
          :value="value.value">{{ value.label }}</Option>
      </Select>
      <i-switch
        @on-change=change
        v-if="mForm.type === formConst.FORM_TYPE_BOOLEAN"
        v-model="mData"
        size="large">
        <span slot="open">true</span>
        <span slot="close">false</span>
      </i-switch>

      <common-mavon-editor
        @on-content-change="change"
        v-if="mForm.type === formConst.FORM_TYPE_MARKDOWN"
        v-model="mData"
        :toolbar-define="toolbars"/>

      <sixty-tag
        class="common-form-tag"
        v-if="mForm.type === formConst.FORM_TYPE_TAG"
        multiple
        add-tags-text="添加标签"
        :tag-ids="mData"
        :tags-data="tagsData"
        @update="change"
        @add-origin-tag="addOriginTag"
        @delete-origin-tag="deleteOriginTag"
        @edit-origin-tag="editOriginTag"/>

      <Upload
        class="common-form-upload"
        :action="action"
        :data="actionData"
        v-if="mForm.type === formConst.FORM_TYPE_UPLOAD"
        :on-success="handleSuccess">
        <Icon type="image" />
        <span class="common-form-upload-text">上传文件</span>
      </Upload>

    </FormItem>
    <div v-else>
      <p>不支持的属性类型: {{ mForm.type }} {{ mForm.label }}</p>
    </div>
  </div>
</template>

<script>
import { Api } from '../../common'
import Form from '../../const/form'
import CommonMavonEditor from '../CommonMavonEditor'
import SixtyTag from '../SixtyTag'
import { getRemoteTag } from '../../services/tag'

export default {
  name: 'SingleForm',

  components: {
    CommonMavonEditor,
    SixtyTag
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    form: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      mData: '',
      mForm: this.form,
      formConst: Form,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        code: true, // code
        subfield: true, // 单双栏模式
        preview: true, // 预览
        trash: true, // 清空
        help: true
      },
      action: Api.api2url('admin.upload.upload_file'),
      tagsData: []
    }
  },

  created () {
    this.initData()
  },

  computed: {
    actionData: function () {
      return {
      }
    }
  },

  methods: {
    async initData () {
      this.tagsData = await this.getTags()
    },
    async getTags () {
      let tags = await getRemoteTag()
      return tags
    },
    async addOriginTag () {
      console.log('点击了添加')
    },
    async editOriginTag () {
      console.log('点击了编辑')
    },
    async deleteOriginTag () {
      console.log('点击了删除')
    },
    isCommon (form) {
      return Form.COMMON_FORMS.indexOf(form.type) >= 0
    },
    change () {
      if (this.mForm.type === Form.FORM_TYPE_ARRAY || this.mForm.type === Form.FORM_TYPE_OBJECT) {
        this.$emit('input', JSON.parse(this.mData))
        this.$emit('on-change', JSON.parse(this.mData))
      } else {
        this.$emit('input', this.mData)
        this.$emit('on-change', this.mData)
      }
    },
    handleSuccess (response, file) {
      if (response && response.data) {
        let src = response.data.data.url
        this.currentValue += `[${file.name}](${src})`
        this.$Message.success('文件上传成功')
      } else {
        this.$Message.error('图片上传成功')
      }
    }
  },

  watch: {
    value: {
      deep: true,
      handler: function (v) {
        if (this.form.type === Form.FORM_TYPE_ARRAY || this.form.type === Form.FORM_TYPE_OBJECT) {
          this.mData = JSON.stringify(v)
        } else {
          this.mData = v
        }
        // this.mData = v
      }
    },
    form: {
      deep: true,
      handler: function (v) {
        this.mForm = v
      }
    }
  }
}
</script>
<style scoped>
  .commonediter {
    width: 100%;
  }
  .commonediter-form {
    width: 100%;
  }
  .commonediter-desc {
    max-width: 200px;
    white-space: normal;
  }
  .common-form-upload {
    cursor: pointer;
    font-size: 14px;
    color: #1B69B6;
    text-align: right;
    margin: 0 20px;
    border-top: 1px solid #E4E4E4;
    height: 33px;
  }
  .common-form-tag {
    margin-left: 10px;
  }
</style>

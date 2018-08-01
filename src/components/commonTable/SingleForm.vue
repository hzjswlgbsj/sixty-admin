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
          v-for="(value, key) in mForm.options"
          :key="key"
          :value="value">{{ value }}</Option>
        <Option
          v-if="typeof option == 'object'"
          v-for="(option, key) in mForm.options"
          :key="key"
          :value="option.value">{{ option.label }}</Option>
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
        v-model="mData"
        :tags-data="tagsData"
        @on-change="change"
        @add-origin-tag="addOriginTag"
        @delete-origin-tag="deleteOriginTag"
        @edit-origin-tag="editOriginTag"/>

      <common-upload
        v-model="mData"
        @on-change="change"
        v-if="mForm.type === formConst.FORM_TYPE_UPLOAD"/>

    </FormItem>
    <div v-else>
      <p>不支持的属性类型: {{ mForm.type }} {{ mForm.label }}</p>
    </div>
  </div>
</template>

<script>
import Form from '../../const/form'
import CommonMavonEditor from '../CommonMavonEditor'
import CommonUpload from '../CommonUpload'
import SixtyTag from '../SixtyTag'
import { getRemoteTag, addRemoteTag, delRemoteTag } from '../../services/tag'

export default {
  name: 'SingleForm',

  components: {
    CommonMavonEditor,
    SixtyTag,
    CommonUpload
  },

  props: ['value', 'form'],

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
      tagsData: []
    }
  },

  created () {
    this.initData()
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
  },

  computed: {},

  methods: {
    async initData () {
      await this.initTags()
    },
    async initTags () {
      this.tagsData = await getRemoteTag()
    },
    async addOriginTag (data) {
      let ret = await addRemoteTag(data.addTagName, data.addTagColor)
      ret && await this.initTags()
    },
    async editOriginTag (data) {
      let ret = await addRemoteTag(data.addTagName, data.addTagColor, data.addTagId)
      ret && await this.initTags()
    },
    async deleteOriginTag (id) {
      let ret = await delRemoteTag(id)
      ret && await this.initTags()
    },
    isCommon (form) {
      return Form.COMMON_FORMS.indexOf(form.type) >= 0
    },
    change (data) {
      if (this.mForm.type === Form.FORM_TYPE_ARRAY || this.mForm.type === Form.FORM_TYPE_OBJECT) {
        this.$emit('input', JSON.parse(this.mData))
        this.$emit('on-change', JSON.parse(this.mData))
      } else {
        this.$emit('input', this.mData)
        this.$emit('on-change', this.mData)
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
  .common-form-tag {
    margin-left: 10px;
  }
</style>

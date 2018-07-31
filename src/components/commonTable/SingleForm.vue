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

      <Upload
        class="common-form-upload"
        v-if="mForm.type === formConst.FORM_TYPE_UPLOAD"
        :data="actionData"
        ref="upload"
        name="Uploader[imageFile]"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        :action="action">
        <div class="common-form-upload-icon">
            <Icon type="camera" size="20"></Icon>
        </div>
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
import { getRemoteTag, addRemoteTag, delRemoteTag } from '../../services/tag'

export default {
  name: 'SingleForm',

  components: {
    CommonMavonEditor,
    SixtyTag
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
      action: Api.api2url('upload.picture'),
      tagsData: [],
      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      uploadList: []
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

  computed: {
    actionData: function () {
      return {
      }
    }
  },

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
    },
    handleSuccess (response) {
      console.log('图片上传成功', response)
      if (response) {
        this.currentValue += `[${response.name}](${response.url})`
        this.$Message.success('图片上传成功')
      } else {
        this.$Message.error('图片上传失败')
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload && this.$refs.upload.fileList
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
    display: inline-block;
    width:58px;
  }
  .common-form-upload-icon {
    width: 58px;
    height:58px;
    line-height: 58px;
  }
  .common-form-tag {
    margin-left: 10px;
  }
</style>

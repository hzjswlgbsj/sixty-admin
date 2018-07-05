<template>
  <div class="common-mavon-editor">
    <mavon-editor
      ref="mavonEditor"
      @imgAdd="imgAdd"
      @change="contentChange"
      :toolbars-flag="true"
      :subfield="false"
      default-open="edit"
      code-style="androidstudio"
      :box-shadow="false"
      v-model="currentValue"
      placeholder="说点什么吧"/>
    <div class="common-mavon-editor-upload">
      <Upload
        :action="action"
        :data="actionData"
        :show-upload-list="false"
        :on-success="handleSuccess">
        <Icon type="image" />
        <span class="common-mavon-editor-upload-text">上传文件</span>
      </Upload>
    </div>
  </div>
</template>

<script>
import { Api } from '../common'
import { uploadByBase64 } from '../services/upload'
import { mavonEditor } from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'

export default {
  name: 'CommonMavonEditor',
  components: {
    'mavon-editor': mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: ''
    },
    toolbarDefine: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      currentValue: this.value,
      currentLanguage: this.language,
      toolbars: this.toolbarDefine,
      action: Api.api2url('admin.upload.upload_file')
    }
  },
  watch: {
    value (val) {
      this.setCurrentValue(val)
    }
  },
  computed: {
    actionData: function () {
      return {
      }
    }
  },
  methods: {
    /**
     * 富文本编辑器回调的处理，$imgAdd在你上传或者粘贴了图片之后被调用，$imgAdd函数会自动带上这两个参数
     * @param pos pos就是![image.png](./0)里的./0(这个是名称)
     * @param file file是粘贴后的file
     * @return {Promise<void>}
     */
    async imgAdd (pos, file) {
      const imgUrl = await this.uploadImgFromPaste(pos, file)
      if (imgUrl) {
        this.$refs.mavonEditor.$imgUpdateByUrl(pos, imgUrl)
        this.$refs.mavonEditor.$img2Url(pos, imgUrl)
      }
    },
    /**
     * 将图片上传到服务器
     * @param pos
     * @param file
     * @return {String} 返回图片地址
     */
    async uploadImgFromPaste (pos, file) {
      let dataBase64 = file.miniurl
      let ret = await uploadByBase64(dataBase64) // 改成你自己的上传接口
      if (ret && ret.data && ret.data.url) {
        this.$Message.success('图片上传成功')
        return ret.data.url
      } else {
        this.$Message.error('图片上传失败，请重新操作')
        this.$refs.mavonEditor.$imgDelByFilename(pos)
      }
    },
    /**
     * 抛出change事件
     * @param event
     */
    contentChange (event) {
      this.$emit('input', event)
      this.$emit('on-content-change', event)
    },
    handleSuccess (response, file) {
      if (response && response.data) {
        let src = response.data.data.url
        this.currentValue += `[${file.name}](${src})`
        this.$Message.success('文件上传成功')
      } else {
        this.$Message.error('图片上传成功')
      }
    },
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
    }
  }
}
</script>

<style scoped>
  .common-mavon-editor {
    border: 1px solid #E4E4E4;
    border-radius: 5px;
  }
  .common-mavon-editor-upload {
    cursor: pointer;
    font-size: 14px;
    color: #1B69B6;
    text-align: right;
    margin: 0 20px;
    border-top: 1px solid #E4E4E4;
    height: 33px;
  }
</style>

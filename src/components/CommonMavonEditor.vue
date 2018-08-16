<template>
  <div class="common-mavon-editor">
    <mavon-editor
      ref="mavonEditor"
      @imgAdd="imgAdd"
      @change="contentChange"
      :toolbars-flag="toolbarsFlag"
      :toolbars="toolbars"
      :subfield="false"
      :default-open="defaultOpen"
      :code-style="codeStyle"
      :box-shadow="false"
      v-model="currentValue"
      placeholder="说点什么吧"/>
    <div
      v-if="defaultOpen === 'edit'"
      class="common-mavon-editor-upload">
      <Upload
        id="ivu-upload"
        :action="action"
        :data="actionData"
        :show-upload-list="false"
        name="Uploader[imageFile]"
        :on-progress="handleProgress"
        :on-success="handleSuccess" >
        <div class="common-mavon-editor-upload-buttom">
          <div class="common-mavon-editor-upload-notice">
            <icon
              v-if="uploadState !== 'normal'"
              class="common-mavon-editor-upload-notice-icon"
              :name="uploadNotice.icon"
              :pulse="uploadNotice.pulse"/>
            <img
              v-else
              class="common-mavon-editor-upload-notice-icon"
              style="width: 16px; height: 16px;"
              src="../style/iconfont/markdown.svg">
            <span :style="uploadText">{{ uploadNotice.text }}</span>
          </div>
          <div class="common-mavon-editor-upload-icon-text">
            <Icon type="image" />
            <span class="common-mavon-editor-upload-text">上传文件</span>
          </div>
        </div>
      </Upload>
    </div>
  </div>
</template>

<script>
import { Api } from '../common'
import { uploadByBase64 } from '../services/upload'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const UPLOAD_NOTICES = {
  normal: {
    icon: '',
    text: 'Markdown is supported'
  },
  uploading: {
    icon: 'spinner',
    pulse: true,
    text: 'Uploding your files...'
  },
  succeeded: {
    icon: 'grin-wink',
    text: 'File upload succeeded'
  },
  failed: {
    icon: 'sad-tear',
    text: 'File upload failed，please try again'
  }
}
export default {
  name: 'CommonMavonEditor',
  components: {
    mavonEditor
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
    },
    defaultOpen: {
      type: String,
      default: 'edit'
    },
    codeStyle: {
      type: String,
      default: 'atom-one-dark'
    },
    toolbarsFlag: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentValue: this.value,
      currentLanguage: this.language,
      toolbars: this.toolbarDefine,
      action: Api.api2url('upload.picture'),
      uploadState: 'normal'
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
    },
    uploadNotice () {
      return UPLOAD_NOTICES[this.uploadState]
    },
    uploadText () {
      if (this.uploadState === 'failed') {
        return {
          color: 'red',
          marginLeft: '20px'
        }
      }
      return {
        marginLeft: '20px'
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
      this.uploadState = 'uploading'
      let dataBase64 = file.miniurl
      let ret = await uploadByBase64(dataBase64) // 改成你自己的上传接口
      if (ret && ret.url) {
        this.uploadState = 'succeeded'
        setTimeout(() => {
          this.uploadState = 'normal'
        }, 2000)
        return ret.url
      } else {
        this.uploadState = 'failed'
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
    handleProgress () {
      this.uploadState = 'uploading'
    },
    handleSuccess (response) {
      this.uploadState = 'uploading'
      if (response && response.url) {
        const curFileSuffix = response.name.split('.')[1]
        const imageSuffix = ['png', 'jpg', 'jpeg']
        if (imageSuffix.indexOf(curFileSuffix) !== -1) {
          this.currentValue += `![${response.name}](${response.url})`
        } else {
          this.currentValue += `[${response.name}](${response.url})`
        }
        this.uploadState = 'succeeded'
        setTimeout(() => {
          this.uploadState = 'normal'
        }, 2000)
      } else {
        this.uploadState = 'failed'
      }
    },
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
  .common-mavon-editor {
    border: 1px solid #E4E4E4;
    border-radius: 5px;
  }
  .common-mavon-editor-upload {
    cursor: pointer;
    font-size: 14px;
    text-align: right;
    margin: 0 20px;
    border-top: 1px solid #E4E4E4;
    height: 33px;
  }
  .common-mavon-editor-upload-buttom {
    display: flex;
    justify-content: space-between;
  }
  .common-mavon-editor-upload-notice {
    position: relative;
  }
  .common-mavon-editor-upload-notice-icon {
    position: absolute;
    top: 7px;
  }
  .common-mavon-editor-upload-icon-text {
    color: #1B69B6;
    /* padding-top: 5px; */
  }
</style>

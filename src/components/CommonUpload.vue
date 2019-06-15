<template>
  <div class="common-upload">
    <div class="demo-upload-list" v-for="(item, index) in defaultList" :key="index">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>

    <Modal class="common-upload-image-view" title="View Image" v-model="visible">
      <img :src="curViewImage" v-if="visible" style="width: 100%">
    </Modal>

    <Upload
      multiple
      class="common-form-upload"
      :data="actionData"
      :action="action"
      ref="upload"
      type="drag"
      :show-upload-list="false"
      name="Uploader[imageFile]"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload">
      <div class="common-form-upload-icon">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
  </div>
</template>

<script>
import { Api } from '../common'

export default {
  name: 'CommonUpload',
  data () {
    return {
      action: Api.api2url('upload.picture'),
      defaultList: [],
      curViewImage: '',
      visible: false
    }
  },

  props: {
    value: {
      type: String,
      default: ''
    }
  },

  components: {},

  mounted () {
    this.defaultList = this.$refs.upload && this.$refs.upload.fileList
  },

  watch: {
    value (val) {
      this.setCurrentValue(val)
    },
    defaultList: {
      deep: true,
      handler (val) {
        this.$emit('input', JSON.stringify(val))
        this.$emit('on-change', JSON.stringify(val))
      }
    }
  },

  computed: {
    actionData () {
      return {}
    }
  },

  methods: {
    handleSuccess (response) {
      // console.log('图片上传成功', response)
      if (response && response.url) {
        this.defaultList.push(response)
        this.$Message.success('图片上传成功')
      } else {
        this.$Message.error('图片上传失败')
      }
    },
    handleView (url) {
      this.curViewImage = url
      this.visible = true
    },
    handleRemove (index) {
      this.defaultList.splice(index, 1)
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
      const check = this.defaultList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    },
    setCurrentValue (value) {
      if (!value) {
        this.defaultList = []
        return
      }
      try {
        if (value === JSON.stringify(this.defaultList)) return
        this.defaultList = JSON.parse(value)
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style scoped>
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
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .common-upload-image-view {
    z-index: 1;
  }
</style>

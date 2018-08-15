<template>
  <div>
    <div>
      <span class="comp_tags_addTxt" v-if="tagsLocal && tagsLocal.length < 1" @click="addLocalTag">{{addTagsText}}</span>
      <span class="comp_tags_Txt"
            v-else
            v-for="(tag, idx) in tagsLocal"
            :key = "idx"
            @mouseout="hideCloseIc"
            @mouseover="showCloseIc(idx)">{{tag.name}}
        <transition name="slide-fade">
          <Icon v-if="currentIdx === idx" @click.native="deleteLocalTag(idx, tag)" class="comp_tags_Txt_close" type="close-circled"></Icon>
        </transition>
      </span>
      <Icon class="comp_tags_addIcon" v-if="tagsLocal && tagsLocal.length > 0" type="ios-plus-outline" @click.native="addLocalTag" size="16"></Icon>
    </div>

    <div class="tags_model" ref="tagModel" v-if="showAddModal">
      <!--选择界面的内容（默认显示）-->
      <div v-if="showSelectContent">
        <div class="search_container">
          <div class="search_input">
            <input v-model="searchTag" @input="searchTags" placeholder="搜索标签" />
          </div>
          <div>
            <Icon class="search_add_icon" type="ios-plus-outline" @click.native="handleAddTag" size="18"></Icon>
          </div>
        </div>
        <div class="tags_list">
          <ul>
            <li v-for="(tag, index) in allTags"
                :key="index"
                @click.self="selectTags(tag)"
                @mouseout="hideListIc"
                @mouseover="showListIc(index)">
              <div class="tag_list_dot">&nbsp;&nbsp;</div>
              {{tag.name}}
              <div class="tag_list_operation_btns">
                <Icon v-if="currentEditIdx === index" @click.native="handleEditTag(tag)" size="14" class="tag_list_operation_edit" type="edit"></Icon>
                <Icon v-if="tag.existInItem" size="14" type="checkmark-round"></Icon>
              </div>
            </li>
          </ul>

          <div v-if="allTags && allTags.length < 1" class="add_tag_btn" style="margin-top: 20px">
            <button class="tag_operation_add_btn" type="button" @click="searchTagSubmit">创建</button>
          </div>
        </div>
      </div>
      <!--添加界面的内容-->
      <div v-if="!showSelectContent">
        <div class="add_operation_btn">
          <Icon style="color: #A9A9A9" type="chevron-left" @click.native="returnSelectTag"></Icon>
          {{panelText}}
          <Icon style="color: #A9A9A9" type="close-round" @click.native="closeSelectModal"></Icon>
        </div>
        <div style="margin: 20px;">
          <div class="add_tag_content"><input v-model="addTagName" placeholder="标签名称" /></div>
          <p v-if="showTips" style="color: red;font-size: 12px">请填写该字段</p>
        </div>
        <div class="add_tag_btn">
          <button v-if="!addTagId" class="tag_operation_add_btn" type="button" @click="tagSubmit">创建</button>
        </div>
        <div v-if="addTagId" class="add_tag_btn">
          <button class="tag_operation_del_btn" type="button" @click="deleteTag">删除</button>
          <button class="tag_operation_edit_btn" type="button" @click="tagSubmit">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Message } from '../common'

export default {
  name: 'SixtyTag',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    addTagsText: {
      type: String,
      default: '添加标签'
    },
    tagsData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tagsLocal: [],
      currentIdx: -1,
      showAddModal: false,
      addTagName: '',
      addTagId: '',
      showTips: false,
      showSelectContent: true,
      currentEditIdx: -1,
      panelText: '新建标签',
      searchTag: '',
      allTags: this.tagsData,
      allTagsBack: this.tagsData,
      tagIds: this.value
    }
  },
  created () {
    this.initTagsData()
  },
  computed: {},
  watch: {
    addTagName (val) {
      if (val) {
        this.showTips = false
      } else {
        this.showTips = true
      }
    },
    value (val) {
      this.tagIds = val
    },
    tagsData (val) {
      if (val) {
        this.allTags = val
        this.allTagsBack = val
        this.initTagsData()
        this.array1InArray2(this.allTags, this.tagsLocal, 'id')
      }
    },
    tagsLocal (val) {
      let idsArray = this.getTagIds(val)
      this.tagIds = idsArray.join(',')
    },
    tagIds (val) {
      this.initTagsData()
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      /* 实现点击其他地方放选择标签的modal消失：
         判断点击事件发生在区域外的条件是：
         1.点击事件的对象不是目标区域本身
         2.事件对象同时也不是目标区域的子元素
      */
      document.addEventListener('click', (e) => {
        let modalEvent = this.$refs.tagModel // 设置目标区域
        if (modalEvent && !modalEvent.isEqualNode(e.target) && !modalEvent.contains(e.target)) {
          this.showAddModal = false
        }
      })
    })
  },
  methods: {
    /* 初始化本地标签集合 */
    initTagsData () {
      this.tagsLocal = []
      const tagIdsArray = this.tagIds.split(',')
      if (tagIdsArray.length > 0) {
        for (let tagId of tagIdsArray) {
          let ret = _.find(this.allTags, {id: tagId})
          if (ret && ret.id) {
            this.tagsLocal.push(ret)
          }
        }
      }
      this.array1InArray2(this.allTags, this.tagsLocal, 'id')
      // this.setTagsNotUse()
    },
    /* 搜索本地标签 */
    searchTags () {
      if (this.searchTag) {
        let allTags = this.allTagsBack
        this.allTags = allTags && allTags.filter(item => {
          return item.name.indexOf(this.searchTag) !== -1
        })
      } else {
        this.allTags = this.allTagsBack
      }
    },
    /* 添加本地标签 */
    addLocalTag (e) {
      this.showAddModal = true
      this.showSelectContent = true
    },
    /* 切换到添加源数据标签的页面 */
    handleAddTag (e) {
      this.searchTag ? this.addTagName = this.searchTag : this.addTagName = ''
      this.showSelectContent = false
    },
    /* 切换到编辑源数据标签的页面 */
    handleEditTag (tag) {
      this.showSelectContent = false
      this.panelText = '编辑标签'
      this.addTagId = tag.id
      this.addTagName = tag.name
    },
    /* 删除本地标签 */
    deleteLocalTag (idx, tag) {
      tag.existInItem = false
      this.tagsLocal.splice(idx, 1)
    },
    /* 删除源数据标签 */
    deleteTag () {
      if (this.addTagId) {
        this.$emit('delete-origin-tag', this.addTagId)
      }
      this.returnSelectTag()
    },
    /* 选择标签 */
    selectTags (tag) {
      if (!this.multiple && this.tagsLocal.length > 0) {
        for (let tagLocal of this.tagsLocal) {
          tagLocal.existInItem = false
        }
        this.tagsLocal = []
      }
      this.array1InArray2([tag], this.tagsLocal, 'id')
      if (tag.existInItem) {
        tag.existInItem = false
        for (let key in this.tagsLocal) {
          if (tag.id === this.tagsLocal[key].id) {
            this.tagsLocal.splice(key, 1)
          }
        }
      } else {
        tag.existInItem = true
        this.tagsLocal.push(tag)
      }
    },
    searchTagSubmit () {
      if (this.searchTag) {
        this.$emit('add-origin-tag', {
          addTagColor: 'red',
          addTagName: this.searchTag
        })
        this.searchTag = ''
      }
    },
    /* 提交添加源数据tag */
    tagSubmit () {
      if (!this.addTagName) {
        this.showTips = true
      } else {
        for (let i = 0; i < this.allTags.length; i++) {
          if (this.allTags[i].name === this.addTagName) {
            Message.error('该标签已经存在')
            return
          }
        }

        if (this.addTagId) {
          this.$emit('edit-origin-tag', {
            addTagId: this.addTagId,
            addTagColor: 'red',
            addTagName: this.addTagName
          })
        } else {
          this.$emit('add-origin-tag', {
            addTagColor: 'red',
            addTagName: this.addTagName
          })
        }
        this.returnSelectTag()
      }
    },
    /* 显示已选标签傍边的 'x' */
    showCloseIc (idx) {
      this.currentIdx = idx
    },
    /* 隐藏已选标签傍边的 'x' */
    hideCloseIc () {
      this.currentIdx = -1
    },
    /* 显示tag列表的操作按钮 */
    showListIc (idx) {
      this.currentEditIdx = idx
    },
    /* 隐藏tag列表的操作按钮 'x' */
    hideListIc () {
      this.currentEditIdx = -1
    },
    /* 返回选择tag的列表页面 */
    returnSelectTag () {
      this.cleanVariable()
    },
    /* 关闭整个tag的modal */
    closeSelectModal () {
      this.showAddModal = false
      this.cleanVariable()
    },
    cleanVariable () {
      this.showSelectContent = true
      this.showTips = false
      this.panelText = '新建标签'
      this.addTagId = ''
      this.addTagName = ''
    },
    /* 获取tagIds */
    getTagIds (tags) {
      return tags.map((item) => {
        return item.id
      })
    },
    setTagsNotUse () {
      if (this.allTags && this.allTags.length > 0) {
        for (let tag of this.allTags) {
          tag.existInItem = false
        }
      }
    },
    /* 通过by字段判定arr1中有哪些项目存在于arr2中，并给存在于arr2中的arr1的那一项数据加上属性和值existInItem:true */
    array1InArray2 (arr1, arr2, by) {
      if (!_.isArray(arr1) || !_.isArray(arr2)) {
        return
      }
      let byArr = [] // 存放arr2的by字段集合
      for (let arr of arr2) {
        if (arr[by]) {
          byArr.push(arr[by])
        }
      }
      for (let arr of arr1) {
        if (arr[by] && byArr.indexOf(arr[by]) !== -1) {
          arr.existInItem = true
        }
      }
    }
  }
}
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .comp_tags_addTxt, .comp_tags_addIcon, .comp_tags_Txt_close:hover, .add_tag_btn button:hover{
    cursor: pointer;
  }
  .comp_tags_addTxt:hover, .comp_tags_addIcon:hover {
    color: #2baee9;
  }
  .comp_tags_addIcon {
    vertical-align: middle;
  }
  .comp_tags_Txt {
    background-color: #F0AD4E;
    color: #ffffff;
    border-radius: 16px;
    padding: 5px 8px;
    margin-right: 5px;
  }
  .comp_tags_Txt_close {
    margin-left: 5px;
    vertical-align: middle;
  }
  .tags_model {
    background-color: #FFFFFF;
    min-width: 250px;
    width: 250px;
    margin-top: 10px;
    z-index: 1000;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 5px #FAFAFA;
  }
  .search_container {
    width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
  }
  .search_input {
    width: 230px;
    padding-left: 15px;
  }
  input {
    border: none;
    outline:medium; /*去掉获得焦点时的边框颜色*/
  }
  .search_input input {
    width: 200px
  }
  .search_add_icon{
    color: #2baee9;
    cursor: pointer;
    vertical-align: middle;
    padding-right: 15px;
    margin-right: 15px;
  }
  .tags_list {
    max-height: 170px;
    overflow-y: scroll;
  }
  .tags_list li {
    padding: 0 15px 0 15px;
    margin-top: 2px;
    font-size: 14px;
  }
  .tags_list li:hover {
    cursor: pointer;
    background-color: #F5F5F5;
  }
  .tag_list_dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    float: left;
    background-color: #A1D5FA;
    margin-right: 10px;
    margin-top: 12px;
  }
  .tag_list_operation_edit {
    margin-right: 8px;
  }
  .tag_list_operation_edit:hover {
    color: #A1D5FA;
  }
  .tag_list_operation_btns {
    float: right;
    color: #A7A7A7;
  }
  .add_operation_btn {
    width: 250px;
    text-align: center;
    border-bottom: 1px solid #E5E5E5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    color: #000;
    font-size: 14px;
  }
  .add_tag_content {
    width: 210px;
    border: 1px solid #E5E5E5;
  }
  .add_tag_content input {
    margin-left: 15px;
  }
  .add_tag_btn {
    margin-left: 21px;
  }
  .tag_operation_edit_btn, .tag_operation_del_btn {
    outline:none;
    width: 98px;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .tag_operation_edit_btn, .tag_operation_add_btn{
    border: none;
    color: #FFFFFF;
    background-color: #3DA8F5;
  }
  .tag_operation_del_btn{
    color: #ff4f3e;
    background-color: #FFFFFF;
    border: 1px solid #ff4f3e;
    margin-right: 10px;
  }
  .tag_operation_add_btn {
    outline:none;
    width: 208px;
    height: 30px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .tag_operation_edit_btn:hover {
    background-color: #3C97D8;
  }
  .tag_operation_del_btn:hover {
    background-color: #ff4f3e;
    color: #FFFFFF;
  }
</style>

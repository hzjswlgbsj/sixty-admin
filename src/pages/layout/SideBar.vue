<template>
  <div class="sidebar" :style="sideHeight">
    <!--<Menu theme="dark" accordion
          class="sidebar-menu"
          :open-names="currentOpens"
          :active-name="activeSubIndex"
          @on-select="handleChange"
          @on-open-change="handleOpenChange"
          v-if="serviceData && serviceData.length > 0">
      <Submenu :name="index" v-for="(item, index) in serviceData" :key="index">
        <template slot="title">{{item.title}}</template>
        <MenuItem :name="idx" v-for="(subItem, idx) in item.children" :key="idx">{{subItem.title}}</MenuItem>
      </Submenu>
      <MenuItem :name="item.type" v-for="item in singleMenu" :key="item.type">{{item.title}}</MenuItem>
    </Menu>-->
    <Menu theme="dark" :open-names="['1']" accordion class="sidebar-menu">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper"></Icon>
          文章管理
        </template>
        <MenuItem name="1-1">文章列表</MenuItem>
        <MenuItem name="1-1">发布文章</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-paper"></Icon>
          评论管理
        </template>
        <MenuItem name="1-1">评论列表</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          标签管理
        </template>
        <MenuItem name="2-1">标签列表</MenuItem>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          资源管理
        </template>
        <MenuItem name="2-1">资源列表</MenuItem>
        <MenuItem name="2-1">友链列表</MenuItem>
      </Submenu>
      <Submenu name="5">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          用户管理
        </template>
        <MenuItem name="2-1">用户列表</MenuItem>
        <MenuItem name="2-2">活跃榜单</MenuItem>
      </Submenu>
      <Submenu name="6">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          举报管理
        </template>
        <MenuItem name="2-1">待处理</MenuItem>
        <MenuItem name="2-2">黑名单</MenuItem>
      </Submenu>
      <Submenu name="7">
        <template slot="title">
          <Icon type="ios-people"></Icon>
          站长中心
        </template>
        <MenuItem name="2-1">个人信息</MenuItem>
        <MenuItem name="2-2">统计信息</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'side-bar',
  data () {
    return {
      currentOpens: [0]
    }
  },
  computed: {
    sideHeight () {
      let clientHeight = document.body.clientHeight - 60
      return {
        height: `${clientHeight}px`
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar {
    .sidebar-menu {
      height: 100%;
      margin-left: -30px;
    }
  }
</style>

<template>
  <div class="sidebar" :style="sideHeight">
    <Menu theme="dark" active-name="1" class="sidebar-menu">
      <MenuGroup title="内容管理">
        <MenuItem name="1">
          <Icon type="document-text"></Icon>
          文章管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="chatbubbles"></Icon>
          评论管理
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="统计分析">
        <MenuItem name="3">
          <Icon type="heart"></Icon>
          用户留存
        </MenuItem>
        <MenuItem name="4">
          <Icon type="heart-broken"></Icon>
          流失用户
        </MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'side-bar',
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
    }
  }
</style>

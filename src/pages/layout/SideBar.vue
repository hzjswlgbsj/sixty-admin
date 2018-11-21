<template>
  <div class="sidebar">
    <Menu theme="dark" accordion
               class="sidebar-menu"
               :open-names="currentOpens"
               :active-name="activePath"
               @on-select="handleChange"
               @on-open-change="handleOpenChange"
               v-if="sideMenuData && sideMenuData.length > 0">
      <Submenu :name="index" v-for="(menu, index) in sideMenuData" :key="index">
        <template slot="title">
          <Icon :type="menu.icon"></Icon>
          {{menu.title}}
        </template>
        <MenuItem :name="subMenu.path" v-for="(subMenu, idx) in menu.children" :key="idx">{{subMenu.title}}</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import sideMenuData from '../../const/sideMenu'
import { ROUTE_PATH_ARTICLE } from '../../router/const'

export default {
  name: 'side-bar',
  data () {
    return {
      sideMenuData: sideMenuData,
      activePath: ROUTE_PATH_ARTICLE,
      activeIndex: 0,
      currentOpens: [0]
    }
  },
  created () {
    this.activePath = this.$route.path
    this.getOpenIndex()
  },
  methods: {
    handleChange (path) {
      this.activePath = path
      this.$router.push(path)
    },
    handleOpenChange (open) {
      this.currentOpens = open
    },
    getOpenIndex () {
      this.sideMenuData.map((item, index) => {
        item.children.map(subItem => {
          if (subItem.path === this.activePath) {
            this.currentOpens = [index]
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .sidebar {
    height: 100%;
    .sidebar-menu {
      height: 100%;
      margin-left: -30px;
    }
  }
</style>

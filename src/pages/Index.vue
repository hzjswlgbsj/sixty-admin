<template>
  <div class="main-layout-structure-container">
    <div class="main-layout-structure-topbar">
      <top-bar></top-bar>
    </div>
    <div class="main-layout-structure-content" :style="contentHeight">
      <div class="main-layout-structure-sidebar">
        <side-bar></side-bar>
      </div>
      <router-view></router-view>
    </div>
    <!--<div class="main-layout-structure-footbar">
      <foot-bar></foot-bar>
    </div>-->
  </div>
</template>

<script>
import TopBar from './layout/TopBar'
import FootBar from './layout/FootBar'
import SideBar from './layout/SideBar'
export default {
  name: 'Index',
  components: {
    TopBar,
    FootBar,
    SideBar
  },
  data () {
    return {
    }
  },
  computed: {
    contentHeight () {
      let clientHeight = document.body.clientHeight - 60
      return {
        height: `${clientHeight}px`
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .main-layout-structure-container {
    height: 100%;
    width: 100%;
  }
</style>

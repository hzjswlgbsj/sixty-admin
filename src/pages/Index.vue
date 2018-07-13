<template>
  <div class="main-layout-structure-container">
    <div class="main-layout-structure-topbar">
      <top-bar></top-bar>
    </div>
    <div class="main-layout-structure-content" :style="contentHeight">
      <div class="main-layout-structure-sidebar">
        <side-bar></side-bar>
      </div>
      <div class="main-layout-main-content">
        <router-view></router-view>
      </div>
    </div>
    <div class="main-layout-structure-footbar">
      <!--<foot-bar></foot-bar>-->
    </div>
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
      let clientHeight = document.documentElement.clientHeight - 60
      return {
        height: `${clientHeight}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/base/base";
  .main-layout-structure-container {
    height: 100%;
    width: 100%;
    .main-layout-structure-topbar {
    }
    .main-layout-structure-content {
      display: flex;
      .main-layout-structure-sidebar {}
      .main-layout-main-content {
        width: 100%;
        height: 100%;
        color: $theme-background-color;
        padding: 24px;
        overflow-y: scroll;
      }
    }
    .main-layout-structure-footbar {
      margin-top: -20px;
    }
  }
</style>

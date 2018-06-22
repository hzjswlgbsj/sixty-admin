<template>
  <div class="topbar">
    <span>top</span>
  </div>
</template>

<script>
export default {
  name: 'top-bar'
}
</script>

<style lang="scss" scoped>
  @import "../../style/base/base";
  .topbar {
    width: 100%;
    height: 60px;
    background-color: $theme-bar-color;
  }
</style>

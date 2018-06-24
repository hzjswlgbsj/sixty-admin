<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "../src/style/base/base.scss";
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  font-size: $font-size;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-other-color;
  height: 100%;
}
</style>

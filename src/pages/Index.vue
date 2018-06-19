<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span class="test">这里有一段描述</span>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Sixty Admin'
    }
  }
}
</script>

<style lang="scss" scoped>
  .test {
    color: red;
  }
</style>

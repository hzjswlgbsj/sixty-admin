<template>
  <div class="topbar">
    <div class="topbar-logo">
      <a href="http://www.sixtyden.com" target="_blank">Sixty's Den</a>
    </div>
    <div class="topbar-theme">
      首页 > 文章管理 > 文章列表
    </div>
    <div class="topbar-user">
      <Dropdown>
        <Avatar :src="sixtyLogo"></Avatar>
        <a href="javascript:void(0)">
          Sixty
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>个人中心</DropdownItem>
          <DropdownItem>退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import { SIXTY_LOGO } from '../../const'
export default {
  name: 'top-bar',
  data () {
    return {
      sixtyLogo: SIXTY_LOGO
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/base/base";
  .topbar {
    width: 100%;
    height: 60px;
    background-color: $theme-bar-color;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.2em;
    .topbar-logo {
      font-size: 1.4em;
      color: $theme-color;
      min-width: 210px;
      font-weight: 500;
    }
    .topbar-theme {
      width: 100%;
      text-align: left;
      padding-left: 24px;
    }
    .topbar-user {
      font-size: 1em;
      min-width: 300px;
      text-align: left;
      a {
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
</style>

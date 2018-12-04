<template>
  <div class="login-root">
    <div class="login-form-container">
      <Card dis-hover>
        <p slot="title">登录</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
          <FormItem label="用户" prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button :loading="loading" style="margin-left: -60px" type="primary" @click="handleSubmit">登录</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      loading: false,
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      if (!this.formInline.user) {
        this.$Message.error('请输入用户名')
        return
      }
      if (!this.formInline.user) {
        this.$Message.error('请输入密码')
        return
      }
      this.loading = true
      setTimeout( () => {
        this.loading = false
      }, 1000)
      console.log(this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-root {
    width: 100%;
    height: 100%;
    .login-form-container {
      position: fixed;
      top: 30%;
      left: 35%;
      width: 500px;
    }
  }
</style>

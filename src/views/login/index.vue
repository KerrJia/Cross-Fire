<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button, Toast } from 'vant'
import { mapActions } from 'vuex'

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)

export default {
  name: 'Login',
  data () {
    return {
      username: 'admin',
      password: 'admin'
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    ...mapActions(['loginAsync']),

    onSubmit (values) {
      console.log('submit', values)
      this.loginAsync(values)
        .then(res => {
          const { to = '/' } = this.$route.params
          this.$router.push(to)
        })
        .catch(error => {
          console.log(error)
          Toast.fail('用户名或密码错误')
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="mine">
    我的
    <button @click="logoutHandler">退出登录</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Mine',
  created () {
    console.log(this.$store)
  },
  methods: {
    ...mapActions(['logoutAsync']),
    logoutHandler () {
      this.logoutAsync()
        .then(res => {
          console.log('success:', res)
          this.$router.push('/')
        })
        .catch(error => console.log('error: ', error))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

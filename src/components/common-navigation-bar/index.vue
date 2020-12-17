<template>
  <div class="commont-nav-bar">
    <span class="back" @click="back">返回</span>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'CommonNavigationBar',
  data () {
    return {
      title: ''
    }
  },
  methods: {
    back () {
      console.log(this.$router)
      this.$router.back() // 后退
    }
  },
  watch: {
    $route: {
      handler: function (newRoute) {
        // console.log('路由变化 ')
        this.title = newRoute.meta.title
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .commont-nav-bar {
    height: 48px;
    line-height: 48px;
    background: #666;
    color: #ffffff;
    display: flex;

    .back {
      padding: 0 12px;
    }
    .title {
      flex: 1;
      text-align: center;
    }
  }
</style>

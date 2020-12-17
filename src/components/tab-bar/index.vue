<template>
  <ul class="tab-bar">
    <li
      is="router-link"
      tag="li"
      v-for="route in navs"
      :key="route.path"
      :to="route.path"
    >
      <i class="iconfont" v-html="route.meta.icon"></i>
      <span>{{ route.meta.title }}</span>
    </li>
  </ul>
</template>

<script>
import routes from '@/router/routes'
export default {
  name: 'TabBar',
  computed: { // 计算属性
    navs () { // 获取在 tabBar 上需要展示的路由
      return routes.filter(route => route.meta && route.meta.isTabBar)
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_2053503_ch5s8s4o9tw.eot');
  src: url('//at.alicdn.com/t/font_2053503_ch5s8s4o9tw.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2053503_ch5s8s4o9tw.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2053503_ch5s8s4o9tw.woff') format('woff'),
  url('//at.alicdn.com/t/font_2053503_ch5s8s4o9tw.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2053503_ch5s8s4o9tw.svg#iconfont') format('svg');
}

.iconfont{
  font-family:"iconfont" !important;
  font-size:22px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.tab-bar {
  display: flex;
  height: 64px;
  border-top: 1px solid #ccc;

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
  }
  .router-link-exact-active, .router-link-active {
    color: #f00;
  }
}
</style>

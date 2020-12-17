<template>
  <div class="search-nav-bar">
    <input type="text" placeholder="请输入搜索内容" />
  </div>
</template>

<script>
export default {
  name: 'SearchNavigationBar'
}
</script>

<style lang="scss" scoped>
  .search-nav-bar {
    height: 48px;
    line-height: 48px;
    color: #000;
    text-align: center;
  }
</style>

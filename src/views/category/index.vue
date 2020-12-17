<template>
  <div class="category">
    <ul class="category-side">
      <li
        is="router-link"
        tag="li"
        v-for="category in categories"
        :key="category.id"
        :to="'/category/subcategory/' + category.id"
      >
        {{category.name}}
      </li>
    </ul>
    <div class="category-sub">
      <router-view />
    </div>
  </div>
</template>

<script>
import { getAllCategories } from '../../api/category'

export default {
  name: 'Category',
  data () {
    return {
      categories: []
    }
  },
  created () {
    getAllCategories().then(res => {
      console.log('分类：', res)
      res.list.shift()
      this.categories = res.list
      // 编程式导航，向第一项的子分类页面跳转
      this.$router.push({ name: 'sub', params: { cid: res.list[0].id } }).catch(() => {})
    })
  }
}
</script>

<style lang="scss" scoped>
  .category {
    height: 100%;
    display: flex;
    &-side {
      width: 100px;
      overflow-x: hidden;

      li {
        padding: 12px;
        &.router-link-exact-active, &.router-link-active {
          color: #f00;
        }
      }
    }
    &-sub {
      flex: 1;
      overflow-x: hidden;
    }
  }
</style>

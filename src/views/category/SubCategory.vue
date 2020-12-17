<template>
  <ul class="sub-category">
    <li
      v-for="sub in subs"
      :key="sub.id"
      @click="jumpToList(sub.url)"
    >
      <img :src="sub.imageUrl" :alt="sub.title" />
      <span>{{sub.title}}</span>
    </li>
  </ul>
</template>

<script>
import { getSubCategories } from '@/api/category'
export default {
  name: 'SubCategory',
  data () {
    return {
      cid: 0,
      subs: []
    }
  },
  created () {
    console.log('sub created')
  },
  destroyed () {
    console.log('sub destroyed')
  },
  methods: {
    // 获取子分类数据
    async getSubCategoryData () {
      try {
        // 异步获取数据
        const res = await getSubCategories(this.cid)
        console.log('子数据：', res)
        this.subs = res.categories
      } catch (err) {
        console.log('异常：', err)
      } finally {
      }
    },
    // 编程式导航，跳转到列表页面
    jumpToList (url) {

      this.$router.push({
        name: 'list',
        query: {
          url
        }
      })

    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.cid = to.params.cid
      vm.getSubCategoryData()
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('sub before route update')
    this.cid = to.params.cid
    this.getSubCategoryData()
    next()
  }
}
</script>

<style lang="scss" scoped>
  .sub-category {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
      width: 49%;
      border: 1px solid #ccc;
      border-radius: 6px;
      margin: 8px 0;
    }
  }
</style>

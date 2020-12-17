<template>
  <div class="list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="list-products">
        <li
          class="list-products-item"
          v-for="prod in list"
          :key="prod.id"
        >
          <van-image :src="prod.image" :alt="prod.title" />
          <span>{{prod.title}}</span>
          <div>{{prod.price | money}}</div>
          <van-button type="danger" @click="addToCartHandler(prod)">加入购物车</van-button>
        </li>
      </ul>
    </van-list>

    <router-link
      class="cart"
      to="/cart"
      tag="div"
    >购物车</router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import { List, Image, Button } from 'vant'
import { getListByCategory } from '@/api/list'

Vue.use(List)
Vue.use(Image)
Vue.use(Button)

export default {
  name: 'List',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      nextIndex: 0
    }
  },
  methods: {
    // 加载数据
    async onLoad () {
      console.log('load........')
      // 根据分类 url 查询列表数据
      const url = this.$route.query.url
      try {
        // 获取数据
        const result = await getListByCategory(url, this.nextIndex)
        this.list = this.list.concat(result.list)
        this.nextIndex = result.nextIndex
        this.loading = false
        if (result.list.length === 0) {
          this.finished = true
        }
      } catch (error) {
        console.log('读取数据异常：', error)
      }
    },
    // 加入购物车处理
    addToCartHandler ({ id, title, image, price }) {
      // 构建当前选购的商品对象信息
      const currentProduct = {
        id,
        title,
        image,
        price,
        amount: 1 // 选购商品的数量
      }
      // 提交 mutation 方法，实现添加购物车动作
      this.$store.commit('addToCart', currentProduct)
      console.log(this.$store.state)
    }
  }
}
</script>

<style lang="scss" scoped>
  .list {
    &-products {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      &-item {
        width: 48%;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 6px;
        overflow: hidden;
      }
    }

    .cart {
      width: 60px;
      height: 60px;
      position: fixed;
      right: 20px;
      bottom: 50px;
      font-size: 12px;
      background: #eaeaea;
      border-radius: 30px;
      text-align: center;
      line-height: 60px;
    }
  }
</style>

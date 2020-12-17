<template>
  <div class="cart">
    <van-swipe-cell
      v-for="prod in cart"
      :key="prod.id"
    >
      <van-card
        :price="prod.price | money"
        :title="prod.title"
        class="goods-card"
      >
        <template #thumb>
          <van-checkbox :value="prod.checked" @click="changeProdCheckedHandler(prod.id)"></van-checkbox>
          <van-image :src="prod.image" :alt="prod.title" />
        </template>
        <template #num>
          <van-stepper
            :value="prod.amount"
            theme="round"
            button-size="22"
            @change="changeAmountHandler(prod.id, $event)"
          />
        </template>
      </van-card>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="removeFromCartHandler(prod.id)" />
      </template>
    </van-swipe-cell>

    <van-submit-bar :price="totalMoney" button-text="提交订单" @submit="submitHandler">
      <van-checkbox :value="allChecked" @click="checkAllHandler">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { SwipeCell, Card, Button, Stepper, SubmitBar, Checkbox, Image } from 'vant'

Vue.use(SwipeCell)
Vue.use(Card)
Vue.use(Button)
Vue.use(Stepper)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(Image)

export default {
  name: 'Cart',
  created () {
    console.log(this.$store)
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    allChecked () {
      return this.$store.getters.allChecked
    },
    totalMoney () {
      return this.$store.getters.totalMoney * 100
    }
  },
  methods: {
    // 删除购物车商品
    removeFromCartHandler (id) {
      this.$store.commit('removeFromCart', id)
    },
    // 修改购物车商品数量
    changeAmountHandler (id, amount) {
      this.$store.commit('modifyAmount', {
        id,
        amount
      })
    },
    // 选中/取消选中商品
    changeProdCheckedHandler (id) {
      this.$store.commit('changeProdChecked', id)
    },
    // 全选
    checkAllHandler () {
      this.$store.commit('checkAll', this.allChecked)
    },
    // 确认订单
    submitHandler () {
      // console.log(value)
      this.$router.push('/confirm')
    }
  }
}

</script>

<style lang="scss" scoped>
  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }
</style>

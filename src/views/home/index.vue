<template>
  <div class="home">
    <!-- Vant 组件 swipe -->
    <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
      <van-swipe-item
        v-for="banner in banners"
        :key="banner.id"
      >
        <van-image :src="banner.imageUrl">
          <!-- <template #default>
            <span>hello</span>
          </template> -->
        </van-image>
      </van-swipe-item>
    </van-swipe>

    <!-- 使用 Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="banner in banners"
            :key="banner.id"
          >
            <img :src="banner.imageUrl" alt="">
          </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>

    <div class="hot_list"></div>
    <p class="jing_xuan">小编精选，全场特惠 (ง •̀_•́)ง</p>
    <div class="items_list">
      <ul>
        <li
          v-for="itemsList in itemsList"
            :key="itemsList.id"
        >
          <img :src="itemsList.image" alt="">
          <p>{{itemsList.qunTitle}}</p>
          <span>{{itemsList.price}}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Image } from 'vant'
import { getBanners } from '../../api/home'
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.min.css'

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Image)

export default {
  name: 'Home',
  data () {
    return {
      banners: [],
      itemsList: []
    }
  },
  created () {
    console.log(this)

    // 获取轮播图数据
    getBanners().then(res => {
      console.log('页面中：', res)
      this.banners = res.banners
      this.itemsList = res.items.list
      console.log('页面中的多条数据：', this.itemsList)
      // $nextTick(callback) 方法的作用：在下一次 DOM 更新后，执行回调函数
      this.$nextTick(() => {
        /* eslint-disable-next-line */
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          autoplay: true, // 自动轮播

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }).catch(err => console.log('加载数据异常：', err))
  },
  mounted () {
    console.log('mounted')
  },
  beforeRouteEnter (to, from, next) {
    console.log('before route enter:', this)
    next()
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  padding-top: calc(100% * 378 / 1008);
  height: 0;
  position: relative;

  .swiper-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.home{
  overflow: hidden;
  .jing_xuan{
    text-align: center;
    margin-top: 10px;
  }
  .items_list{
    &>ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        width: 48%;
        background-color: red;
        margin-bottom: 60px;
        img{
          width: 100%;
          height: 100%;
        }
        span{
          color: red;
          font-size: .53rem;
          line-height: .4rem;
        }
      }
    }
  }
}
</style>

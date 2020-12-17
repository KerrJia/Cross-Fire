import Home from '@/views/home'
import Category from '@/views/category'
import SubCategory from '@/views/category/SubCategory'
import List from '@/views/list'
import Cart from '@/views/cart'
import Mine from '@/views/mine'
import Detail from '@/views/detail'
import Login from '@/views/login'
import Register from '@/views/register'
import Confirm from '@/views/confirm'
import CommonNavigationBar from '@/components/common-navigation-bar'
// import SearchNavigationBar from '@/components/search-navigation-bar'
import TabBar from '@/components/tab-bar'

// 路由表
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home', // 路由路径
    // component: Home, // 路由组件
    components: {
      header: CommonNavigationBar,
      default: Home,
      footer: TabBar
    },
    meta: { // 路由元信息：携带的额外数据，可以在开发时使用到
      isTabBar: true,
      title: '首页',
      icon: '&#xe64f;'
    }
  },
  {
    path: '/category',
    // component: Category,
    components: {
      header: CommonNavigationBar,
      default: Category,
      footer: TabBar
    },
    children: [ // 嵌套路由，子路由
      {
        path: 'subcategory/:cid', // 定义动态路径参数
        component: SubCategory,
        name: 'sub',
        meta: {}
      }
    ],
    meta: {
      isTabBar: true,
      title: '分类',
      icon: '&#xe65f;'
    }
  },
  {
    path: '/list/:id?',
    // component: List,
    components: {
      header: CommonNavigationBar,
      default: List
    },
    name: 'list',
    meta: {
      title: '列表'
    }
  },
  {
    path: '/detail',
    // component: Detail,
    components: {
      header: CommonNavigationBar,
      default: Detail
    },
    meta: {
      title: '详情'
    }
  },
  {
    path: '/cart',
    // component: Cart,
    components: {
      header: CommonNavigationBar,
      default: Cart
    },
    meta: {
      isTabBar: true,
      title: '购物车',
      icon: '&#xe619;'
    }
  },
  {
    path: '/mine',
    // component: Mine,
    components: {
      header: CommonNavigationBar,
      default: Mine,
      footer: TabBar
    },
    meta: {
      isTabBar: true,
      title: '我的',
      icon: '&#xe6a3;'
    }
  },
  {
    path: '/register',
    // component: Register,
    components: {
      header: CommonNavigationBar,
      default: Register
    },
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/login',
    name: 'login',
    // component: Login,
    components: {
      header: CommonNavigationBar,
      default: Login
    },
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/confirm',
    components: {
      header: CommonNavigationBar,
      default: Confirm
    },
    meta: {
      title: '确认订单'
    }
  }
]

export default routes

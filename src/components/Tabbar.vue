<template>
  <div
    v-if="
      $route.name == 'home' || $route.name == 'money' || $route.name == 'user'
    "
  >
    <van-tabbar
      v-model="active"
      inactive-color="#666666"
      active-color="#5796f5"
      fixed
      placeholder
    >
      <van-tabbar-item
        replace
        v-for="(item, index) in tabbarList"
        :key="index"
        :to="item.path"
      >
        <span>{{ item.title }}</span>
        <img
          class="vant-img"
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.normal"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import home from '../assets/img/tabbar/home.png';
import homea from '../assets/img/tabbar/home-a.png';
import money from '../assets/img/tabbar/money.png';
import moneya from '../assets/img/tabbar/money-a.png';
import user from '../assets/img/tabbar/user.png';
import usera from '../assets/img/tabbar/user-a.png';
export default {
  name: 'tabbar',
  data() {
    return {
      active: 0,
      tabbarList: [
        {
          path: '/',
          title: '首页',
          normal: home,
          active: homea,
        },
        {
          path: '/money',
          title: '赚钱',
          normal: money,
          active: moneya,
        },
        {
          path: '/user',
          title: '我的',
          normal: user,
          active: usera,
        },
      ],
    };
  },

  watch: {
    $route(to) {
      if (to.name == 'home') {
        this.active = 0;
      }
    },
  },

  methods: {
    activeTab(path) {
      var index = this.tabbarList.map((item) => item.path).indexOf(path);
      // console.log(index);
      if (index != -1) {
        this.active = index;
      }
    },
  },
};
</script>
<style>
.vant-img {
  height: 50px !important;
}
</style>

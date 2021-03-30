<template>
  <div>
    <div
      class="tikuan-li flex middle between"
      v-for="(item, index) in listData"
      :key="index"
    >
      <div class="tikuan-date">2020-12-25</div>
      <div class="tikuan-name bluecolor">游戏广告</div>
      <div class="tikuan-num">+20</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  props: {
    listData: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },

  watch: {
    $route(to) {},
    listData(val) {
      this.listData = val;
    },
    type(val) {
      this.type = val;
    },
  },

  methods: {},
};
</script>
<style lang="less" scoped>
.tikuan-li {
  font-size: 34px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ccc;
}
.bluecolor {
  color: @color;
}
</style>

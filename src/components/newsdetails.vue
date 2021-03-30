<template>
  <div>
    <div class="read-top">
      <div class="read-title">
        {{ newsData.title }}
      </div>
      <div class="read-date-btm">{{ newsData.date }}</div>
    </div>
    <div class="read-content">
      {{ newsData.content }}
    </div>
    <div class="zwei"></div>
  </div>
</template>
<script>
export default {
  name: 'newsdetails',
  props: {
    newsData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },

  watch: {
    $route(to) {},
    newsData(val) {
      this.newsData = val;
    },
  },

  methods: {},
};
</script>
<style lang="less" scoped>
.read-top {
  padding: 50px 30px 0;
  border-bottom: 4px solid #f3f3f3;

  .read-title {
    line-height: 46px;
    color: #333;
    font-size: 36px;
    font-weight: 500;
    text-align: left;
  }
  .read-date-btm {
    font-size: 32px;
    font-weight: 200;
    color: #ccc;
    display: block;
    line-height: 80px;
    padding: 0px;
    text-align: left;
  }
}
.read-content {
  padding: 30px 50px;
  background: #fff;
  text-align: left;
}
</style>

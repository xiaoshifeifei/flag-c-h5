<template>
  <div>
    <div class="nodata flex middle center column">
      <img src="@/assets/img/details/none.png" alt="" />
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'nodata',
  data() {
    return {
      buttonFlag: false,
    };
  },

  watch: {
    $route(to) {},
  },

  methods: {},
};
</script>
<style lang="less" scoped>
.nodata {
  img {
    width: 300px;
    height: 300px;
  }
  p {
    font-size: 36px;
    margin-top: 30px;
    color: #333;
  }
}
</style>

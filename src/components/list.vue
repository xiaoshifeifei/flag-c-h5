<template>
  <div>
    <div class="list-li gray-shadow flex">
      <div class="list-left">
        <img
          src="https://ma-res.yilewan.com/uploads/file/20201130/ccvv3KG9iLVC33sSKaVc.jpeg"
          alt=""
        />
      </div>
      <div class="list-middle Po_Rela">
        <p class="Beyond_one list-p-one">
          游戏名游戏名游戏名游戏名游戏名游戏名游戏名游戏名
        </p>
        <p class="Beyond_two list-p-two">
          简介简介简介简介简介简介简介简介简
        </p>
        <div class="go flex middle center gray-shadow">
          <span class="span-one">马上玩</span>
          <span class="span-two">GO</span>
        </div>
      </div>
      <!-- <div class="list-right"></div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "list",
  props: {
    listData: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
      default: "",
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
.list-li {
  background-color: #fff;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  .list-left {
    height: 220px;
    img {
      width: 250px;
      height: 100%;
      object-fit: cover;
    }
  }
  .list-middle {
    width: calc(100% - 250px);
    padding: 15px;
  }
}
.list-p-one {
  font-weight: bold;
  font-size: 36px;
  width: 100%;
  text-align: left;
}
.list-p-two {
  font-size: 32px;
  width: 100%;
  text-align: left;
}
.go {
  position: absolute;
  right: 15px;
  bottom: 15px;
  border: 1px solid #fff;
  padding: 5px 20px;
  background-color: #fff;
  border-radius: 30px;
  font-weight: bold;
  animation: mymove 1s ease infinite;
  //   animation: heart 0.6s ease-in-out infinite alternate;
}
.span-one {
  font-size: 26px;
}
.span-two {
  background-color: #ff2d2f;
  padding: 4px 10px;
  border-radius: 30px;
  margin-left: 10px;
  font-weight: bold;
  color: #fff;
  font-size: 28px;
}
</style>

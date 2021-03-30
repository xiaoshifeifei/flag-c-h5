<template>
  <div>
    <div
      class="button Po_Fixed flex middle center"
      @click="onClick"
      @mousedown="down"
      @touchstart="down"
      @mousemove="move"
      @touchmove="move"
      @mouseup="end"
      @touchend="end"
      ref="fu"
    >
      <img
        @click="leftClick()"
        class="box-b"
        src="@/assets/img/details/close.gif"
        alt=""
      />
      <div class="flex middle around homeCon" :class="buttonFlag ? 'on' : ''">
        <img @click="goHome()" src="@/assets/img/button/home-b.png" alt="" />
        <img @click="goPhone()" src="@/assets/img/button/phone-b.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'buttons',
  data() {
    return {
      buttonFlag: false,
      flags: false, //控制使用
      position: {
        x: 0,
        y: 0,
      },
      nx: '',
      ny: '',
      dx: '',
      dy: '',
      xPum: '',
      yPum: '',
    };
  },

  watch: {
    $route(to) {
      // this.activeTab(to.path);
    },
  },

  methods: {
    leftClick() {
      console.log('yyyy');
      this.buttonFlag = !this.buttonFlag;
    },
    goHome() {
      this.$router.push({
        path: '/',
      });
    },
    goPhone() {},

    // 移动
    down() {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = this.$refs.fu.offsetLeft;
      this.dy = this.$refs.fu.offsetTop;
    },
    move() {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        let width = window.innerWidth - this.$refs.fu.offsetWidth; //屏幕宽度减去自身控件宽度
        let height = window.innerHeight - this.$refs.fu.offsetHeight; //屏幕高度减去自身控件高度
        this.xPum < 0 && (this.xPum = 0);
        this.yPum < 0 && (this.yPum = 0);
        this.xPum > width && (this.xPum = width);
        this.yPum > height && (this.yPum = height);
        // if (this.xPum >= 0 && this.yPum >= 0 && this.xPum<= width &&this.yPum<= height) {
        this.$refs.fu.style.left = this.xPum + 'px';
        this.$refs.fu.style.top = this.yPum + 'px';
        // }
        //阻止页面的滑动默认事件
        document.addEventListener(
          'touchmove',
          function() {
            event.preventDefault();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    },
    onClick() {
      //在这里我是作为子组件来使用的
      this.$emit('click');
    },
  },
};
</script>
<style lang="less" scoped>
.button {
  left: 30px;
  bottom: 180px;
  .box-b {
    width: 100px;
    height: 100px;
    transform: rotate(-90deg);
  }
  .homeCon {
    border-radius: 60px;
    margin-left: 20px;
    display: none;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .homeCon.on {
    display: flex;
    width: 200px;
    height: 90px;
    opacity: 1;
    animation: bounceInLeft 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    // margin-bottom: 10px;
    background: #f44939 !important;
  }
}
</style>

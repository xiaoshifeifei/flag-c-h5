<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="child-view" />
      </navigation>
    </transition>
    <tabbar />
    <!-- <tplbutton v-show="pathFlag"></tplbutton> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: '',
      platformClass: 'platform-ios',
      path: '',
      pathFlag: true,
    };
  },
  created() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      this.platformClass = 'platform-ios';
    } else {
      this.platformClass = 'platform-ios'; // 先都用ios的动画，android的动画有点快
    }
    document.querySelector('body').className = this.platformClass;

    this.$navigation.on('forward', (to, from) => {
      if (from.route.name === null) {
        // 初始化进入程序
        this.transitionName = '';
        return;
      }
      this.transitionName = 'forward';
    });
    this.$navigation.on('back', (to, from) => {
      this.transitionName = 'back';
    });
    this.$navigation.on('replace', (to, from) => {
      this.transitionName = '';
    });
  },
  mounted() {
    this.path = this.$route.path;
  },
  watch: {
    $route(to, from) {
      this.path = to.path;
      if (
        this.path == '/home' ||
        this.path == '/money' ||
        this.path == '/user' ||
        this.path == '/login'
      ) {
        this.pathFlag = false;
      } else {
        this.pathFlag = true;
      }
    },
  },
};
</script>

<style lang="less">
// 新
//全局的大按钮样式，比如登陆、登出
.large-button {
  margin: 5px 20px;
}
.grayPageBG {
  background-color: #f3f3f3 !important;
}

.column-view {
  background-color: #f3f3f3 !important;

  display: flex;
  flex: 1;
  flex-direction: column;
}
.flex1 {
  flex: 1;
}

.height0 {
  height: 0;
}
.fill {
  flex-grow: 1;
}
.topBarBottomLine {
  background-color: #eeeeee;
  height: 1px;
}

.orderBar {
  display: flex;
  background-color: white;

  div {
    display: flex;
    /*display: -webkit-flex;*/
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }

  span {
    font-size: 16px;
    color: #6d6d6d;
  }
}

.order-selected {
  color: #000 !important;
  font-weight: bold;
}

.flex-row {
  display: flex;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-justify-center {
  justify-content: center;
}

.flex-align-center {
  align-items: center;
}

.flex-center {
  justify-content: center;
  align-items: center;
}

// .left {
//   float: left;
// }

// .right {
//   float: right;
// }

.line {
  widows: 100%;
  height: 10px;
  background-color: #f4f3f7;
}
.zwei {
  height: 120px;
}
@import './common/css/base.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.child-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.debug {
  position: absolute;
  top: 0;
  left: 20%;
  font-size: 20px;
  background: #fff;
  overflow: hidden;
  z-index: 9999;
}

.forward-enter-active,
.forward-leave-active,
.back-enter-active,
.back-leave-active,
.platform-ios .forward-enter-active,
.platform-ios .forward-leave-active,
.platform-ios .back-enter-active,
.platform-ios .back-leave-active {
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-timing-function: cubic-bezier(0.36, 0.66, 0.04, 1);
  transition-timing-function: cubic-bezier(0.36, 0.66, 0.04, 1);
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
}

.platform-android .forward-enter-active,
.platform-android .forward-leave-active,
.platform-android .back-enter-active,
.platform-android .back-leave-active {
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0.6, 0.2, 1);
  transition-timing-function: cubic-bezier(0.4, 0.6, 0.2, 1);
}

.view-right() {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.view-left() {
  -webkit-transform: translateX(-33%);
  transform: translateX(-33%);
}

.view-center() {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.forward-enter {
  .view-right();
  opacity: 1;
  z-index: 2;
}

.forward-enter-active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.forward-enter-to {
  .view-center();
  opacity: 1;
  z-index: 2;
}

.forward-leave {
  .view-center();
  opacity: 0.8;
  z-index: 1;
}

.forward-leave-to {
  .view-left();
  opacity: 0;
  z-index: 1;
}

.back-enter {
  .view-left();
  opacity: 0.8;
  z-index: 1;
}

.back-enter-to {
  .view-center();
  opacity: 1;
  z-index: 1;
}

.back-leave {
  .view-center();
  opacity: 1;
  z-index: 2;
}

.back-leave-active {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.back-leave-to {
  .view-right();
  opacity: 1;
  z-index: 2;
}

.banner {
  padding: 0 20px;
  .gray-btm {
    padding: 20px;
    width: 100%;
    left: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(21, 18, 18, 0),
      rgba(21, 18, 18, 0.61),
      rgba(0, 0, 0, 0.78)
    );
    border-radius: 0 0 5px 5px;
    .gray-one {
      color: #fff;
      font-weight: bold;
      font-size: 36px;
    }
    .gray-two {
      color: #fff;
      font-size: 32px;
    }
  }
}
.banner .banner-c {
  height: 300px;
  width: 100%;
  border-radius: 30px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  .gray-right {
    right: 20px;
    bottom: 50%;
    transform: translateY(-50%);
    border: 1px solid #fff;
    padding: 5px 20px;
    background-color: #fff;
    border-radius: 30px;
    font-weight: bold;
    height: 60px;
    animation: heart 0.6s ease-in-out infinite alternate;
    // animation:mymove 1s ease infinite;
  }
}
.banner img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

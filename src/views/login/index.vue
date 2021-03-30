<template>
  <div id="login">
    <div class="el-sign-header">欢迎登录</div>
    <div class="el-sign-content">
      <div class="el-password">
        <input
          type="text"
          placeholder="请输入手机号"
          v-model.trim="phone"
          maxlength="11"
        />
        <span @click="getCode" v-show="!isCountDown">获取验证码</span>
        <span v-show="isCountDown">{{ countDownText }}</span>
      </div>
      <div class="el-password">
        <input
          type="text"
          placeholder="请输入验证码"
          v-model.trim="code"
          maxlength="11"
        />
      </div>
      <div class="el-btn btn-green" @click="login">登录</div>
      <div class="el-third-party-login">
        <van-divider
          :style="{
            color: '#40d8b1',
            borderColor: '#40d8b1',
            padding: '0 16px',
          }"
        >
          快速登录
        </van-divider>
        <div class="el-third-party">
          <img
            src="@/assets/img/login/login_icon_weixin_default@2x.png"
            alt=""
            @click="wxPreLogin"
          />
        </div>
      </div>
      <div class="el-footer">登录即同意<span class="el-span"><a href="/xieyi">《用户协议》和《隐私协议》</a></span></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      phone: '',
      password: '',

      code: '',
      isCountDown: false,
      countDownText: '60s',
      T: null,
    };
  },
  computed: {
    // ...mapState({
    //   uid: state => state.vux.uid,
    //   token: state => state.vux.token,
    //   isWX: state => state.vux.isWX,
    //   wxUserInfo: state => state.vux.wxUserInfo
    // })
  },
  created() {
    // console.log(2)
  },
  activated() {
    console.log(this.$route.query);
  },
  components: {},
  methods: {
    getCode() {
      if (this.phone === '') {
        this.$toast('手机号不能为空');
        return;
      }
      if (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.phone)) {
        this.$toast.success('验证码已发送');
        this.countDown();
      } else {
        this.$toast('手机号格式不正确');
      }
    },
    countDown() {
      this.T && clearInterval(this.T);
      let count = 59;
      this.isCountDown = true;
      this.countDownText = '60s';
      this.T = setInterval(() => {
        if (count > -1) {
          this.countDownText = count + 's';
          count--;
        } else {
          clearInterval(this.T);
          this.countDownText = '重新获取';
          this.isCountDown = false;
        }
      }, 1000);
    },

    login() {
      // console.log(this.$store)
      this.$store.dispatch('user/login', '106');
      this.$router.push({
        path: '/home',
      });
    },
    wxPreLogin() {},
  },
};
</script>

<style lang="less" scoped>
.el-sign-header {
  color: #333;
  font-weight: bold;
  font-size: 48px;
  text-align: center;
  padding-top: 150px;
  margin-bottom: 105px;
}
.el-sign-content {
  width: 80%;
  margin: 0 auto;
  input {
    height: 96px;
    background-color: #edeef0;
    border-radius: 96px;
    width: 100%;
    outline: none;
    font-size: 32px;
    color: #666;
    border: none;
    text-indent: 1em;
    display: block;
  }
  .el-password {
    position: relative;
    margin-top: 50px;
    margin-bottom: 50px;
    a {
      display: block;
      text-align: right;
      color: #aaa;
      font-size: 24px;
      padding-right: 1em;
      line-height: 50px;
    }
    i {
      font-size: 48px;
      position: absolute;
      top: 24px;
      right: 24px;
    }
    span {
      font-size: 32px;
      position: absolute;
      top: 24px;
      right: 24px;
      color: #40d8b1;
    }
  }
  .el-password-show {
    position: relative;
    display: none;
  }
  .el-user-agreement {
    text-align: center;
    font-size: 24px;
    color: #aaa;
    margin-top: -50px;
    margin-bottom: 50px;
    a {
      color: #40d8b1;
    }
  }
  .el-register {
    display: block;
    font-size: 32px;
    color: #40d8b1;
    text-align: center;
    margin-bottom: 50px;
    margin-top: 20px;
  }
  .el-third-party-login {
    margin-top: 80px;
    p {
      text-align: center;
      font-size: 24px;
      color: #aaa;
    }
    .el-third-party {
      width: 80%;
      margin: 0 auto;
      display: flex;
      padding: 20px 0;
      justify-content: center;
      img {
        display: block;
        height: 100px;
        width: 100px;
        margin: 0 40px;
      }
    }
  }
}
#login {
  min-height: 100%;
  background-color: #fff;
}
/* 按钮样式 begin*/
.el-btn {
  text-align: center;
  height: 90px;
  font-size: 36px;
  line-height: 90px;
  border-radius: 90px;
  margin: 45px auto 0;
  display: block;
  letter-spacing: 0.1em;
  position: relative;
}
.btn-green {
  background-color: #40d8b1;
  color: #fff;
}
.btn-green-empty {
  height: 88px;
  line-height: 88px;
  border: 1px solid #40d8b1; /* no*/
  color: #40d8b1;
}
.btn-shadow::after {
  content: ' ';
  position: absolute;
  width: 80%;
  height: 20px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 15px 30px #98e7d4;
}
/* 按钮样式 end*/
.el-footer{
  margin-top: 50px;
  font-size: 32px;
}
.el-footer .el-span a{
  color: #40d8b1;
}
</style>

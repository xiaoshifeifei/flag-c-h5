<template>
  <div class="Box">
    <div class="main">
      <div class="content">
        <div class="content-title flex middle center content-public">
          <div class="content-tx">
            <img
              :src="
                flagInfo.avatar
                  ? flagInfo.avatar
                  : 'http://bytetest.oss-cn-zhangjiakou.aliyuncs.com/store/avatar/%5C20200921%5Cb2b7f18f78e1842208bc0a8bd7ee3c31.jpg'
              "
              alt=""
            />
          </div>
          <div class="content-text">
            <p class="p-one">
              {{ flagInfo.nickname }}正在参与{{ flagInfo.type_text }}
            </p>
            <p class="p-two">推荐了一个好玩的app给您，请查收！</p>
          </div>
        </div>
        <div class="content-middle content-public">
          <img
            :src="flagInfo.product ? flagInfo.product.product_img : ''"
            alt=""
          />
          <div class="shop-title">
            {{ flagInfo.product ? flagInfo.product.product_name : '' }}
          </div>
          <div class="shop-price">￥{{ flagInfo.money/100 }}</div>
        </div>
        <div class="from-box flex middle center">
          <div class="from">
            <div class="input-box flex middle center">
              <div class="from-input" style="flex:1;">
                <van-field
                  v-model="phone"
                  placeholder="请输入手机号"
                  error-message
                />
              </div>
            </div>

            <div class="input-box flex middle center">
              <div class="from-input" style="flex:1;">
                <van-field
                  v-model="code"
                  placeholder="请输入验证码"
                  error-message
                />
              </div>
              <div v-if="isShowGetCode" @click="getCode()" class="code-btn">
                获取验证码
              </div>
              <div v-else class="code-btn">已获取({{ countdown }}s)</div>
            </div>

            <div class="input-box flex middel center">
              <div @click="signUp" class="from-inputh flex middle center">
                立即参与
              </div>
            </div>
          </div>
        </div>
        <div class="footer-text content-public">更多品质好货等着你</div>
      </div>
    </div>

    <!-- 弹窗 -->
    <div class="message" v-if="isSuccess">
      <div class="message-dialog">
        <div class="message-content">
          <div class="message-header">
            <img src="../../assets/img/titleicon.png" alt />
          </div>
          <div class="message-body">
            <div class="message-body-content">
              <p class="message-title">参与成功</p>
              <p class="message-xq">
                肥狗是一款网购省钱、养成自律习惯的应用平台，完成既定目标，低价或者免费拿商品，邀请亲朋好友来围观监督你设置的flag目标，当你目标挑战失败，围观人群可瓜分你的挑战金，同时促进社区交友，寻找志趣相同有共同目标的购友。点击下载玩转肥狗App吧!
              </p>
            </div>
          </div>
          <div class="message-footer flex middle center">
            <div @click="goToDown()" class="message-bg-box message-bg">
              立即下载
            </div>
          </div>
        </div>
        <img
          @click.prevent="closeBtn()"
          class="close"
          src="../../assets/img/close.png"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/user';
import validate from '../../utils/validate';
export default {
  data() {
    return {
      // 倒计时
      phone: '',
      code: '',
      countdown: 60,
      timer: '',
      isShowGetCode: true,
      isSuccess: false,

      tel: '18060703873',

      // 链接获取参数
      yqCode: '',
      flagInfo: {},
      flag_id: '',
      andHref:
        'http://dxktest.oss-cn-zhangjiakou.aliyuncs.com/client/20210226/f7ffddbd844c81d2379534ef0f7b79dc.apk', //安卓app下载地址
    };
  },
  mounted() {
    this.flag_id = validate.getQueryVariable('flag_id');
    this.getFlagInfo();
  },
  methods: {
    closeBtn() {
      this.isSuccess = false;
      this.phone = '';
      this.code = '';
    },

    async getCode() {
      if (!validate.mobile(this.phone, this)) {
      } else {
        this.countDown();
        this.isShowGetCode = false;
        let res = await api.getCode({ username: this.phone });
        if (res.code == 0) {
          this.$toast({
            message: res.msg,
            duration: 2000,
          });
        } else {
          this.$toast(res.msg);
        }
      }
    },
    countDown() {
      const self = this;
      this.timer = setInterval(() => {
        self.countdown--;
        if (self.countdown === 0) {
          clearInterval(self.timer);
          self.countdown = 60;
          self.isShowGetCode = true;
        }
      }, 1000);
    },

    async getFlagInfo() {
      let res = await api.getMyFlagDetail({
        flag_id: this.flag_id,
      });
      if (res.code == 0) {
        console.log('res', res);
        this.flagInfo = res.data;
      } else {
        if (res.msg) {
          this.$toast(res.msg);
        }
      }
    },
    async signUp() {
      var reg = new RegExp('^.{4}$');
      if (!reg.test(this.code)) {
        this.$toast('请输入4位验证码');
        return false;
      }
      if (!validate.mobile(this.phone, this)) {
      } else {
        let res = await api.signUp({
          username: this.phone,
          verify: this.code,
          flag_id: this.flag_id,
        });
        if (res.code == 0) {
          console.log('res', res);
          this.isSuccess = true;
        } else {
          if (res.msg) {
            this.$toast(res.msg);
             this.isSuccess = true;
          }
        }
      }
    },
    closeMsg() {
      this.isCanjia = false;
      this.phone = '';
      this.code = '';
    },

    goToDown() {
      // window.location.href = this.andHref;
      this.$router.push({
        path:'/down'
      })
      this.isSuccess = false;
      // this.$router.push({ path: `/mzldown?qdId=${this.qdId}`})
    },
    callPhone() {
      // window.location.href = "tel://" + phoneNumber ;
      this.$router.push({
        path: `/huodonglc/${this.id}/${this.qdId}`,
      });
    },
  },
};
</script>
<style>
.Box .van-field__control {
  color: #000 !important;
}
.Box input[type='text']::placeholder {
  color: #cbcbcb !important;
}
</style>
<style scoped lang="less" type="text/less">
.Box {
  .main {
    .content {
      width: 90%;
      margin: 0 auto;
      background: linear-gradient(#edca86, #f1d49c, #fefef9);
      margin-top: 60px;
      margin-bottom: 60px;
      padding-top: 60px;
      padding-bottom: 60px;
      border-radius: 20px;
      box-shadow: 0px 4px 13px 3px rgb(190 190 190 / 31%);
      .content-public {
        width: 90%;
        margin: 0 auto;
      }
      .content-title {
        text-align: left;

        margin-bottom: 30px;
        .content-tx {
          width: 120px;
          height: 120px;
          border: 2px solid #fff;
          border-radius: 50%;
          margin-right: 20px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .content-text {
          .p-one {
            font-size: 34px;
            margin-bottom: 15px;
          }
          .p-two {
            font-size: 26px;
          }
        }
      }
      .content-middle {
        img {
          width: 100%;
          max-height: 600px;
          object-fit: fill;
          border-radius: 10px;
        }
        .shop-title {
          text-align: left;
          font-size: 36px;
          font-weight: bold;
        }
        .shop-price {
          color: #e0202b;
          font-size: 34px;
          text-align: left;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 20px;
        }
      }
      .from-box {
        .activity-no {
          img {
            width: 346px;
            height: 286px;
          }
          p {
            margin-top: 35px;
            font-size: 26px;
            font-family: Source Han Sans CN, Source Han Sans CN-Bold;
            font-weight: 700;
            text-align: center;
            color: #e74435;
          }
        }
        .from {
          width: 90%;
          background: #fff;
          border-radius: 10px;
          .from-title {
            margin-top: 70px;
            img {
              width: 32px;
              height: 32px;
            }
            .from-text {
              margin-left: 20px;
              margin-right: 20px;
              font-size: 35px;
              font-family: PingFang SC, PingFang SC-Bold;
              font-weight: bold;
              color: #333333;
            }
          }
          .input-box {
            margin-top: 30px;
            padding: 0 20px !important;
            margin-bottom: 30px;
            .from-input {
              width: 100%;
              background: #f8f8f8 !important;
              font-size: 26px;
              border-radius: 10px;
              .van-cell {
                background: #f8f8f8 !important;
                height: 40px;
                padding: 0;
                padding-top: 8px;
                padding-left: 10px;
                color: #fff !important;
                border-radius: 10px;
              }
            }
            .from-inputh {
              width: 100%;
              height: 80px;
              background: #edca86 !important;
              color: #fff;
              border-radius: 10px;
              font-size: 28px !important;
            }
            .code-btn {
              width: 200px;
              height: 75px;
              line-height: 75px;
              text-align: center;
              background: #edca86;
              border-radius: 10px;
              color: #ffffff;
              margin-left: 10px;
              font-size: 28px;
            }
            .new-input {
              padding-left: 20px;
              width: 100%;
              height: 76px;
              border-radius: 10px;
            }
          }
        }
      }
      .footer-text {
        font-size: 30px;
        font-weight: bold;
        text-align: left;
        margin-top: 20px;
        color: #edc688;
      }
    }
  }

  // 弹窗
  // 弹窗
  .message {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: table;
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.6);
    .message-dialog {
      width: 622px;
      // height: 495px;
      background: #ffffff;
      border-radius: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      .close {
        position: absolute;
        left: 50%;
        bottom: -140px;
        transform: translateX(-50%);
        z-index: -1;
        height: 200px;
      }
      .message-content {
        max-width: 540px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 20px;
        box-sizing: border-box;
        .message-header {
          img {
            margin-top: -112px;
            width: 320px;
            height: 224px;
          }
        }
        .message-body {
          position: relative;
          // max-height: 300px;
          overflow: auto !important;
          .message-body-content {
            .message-title {
              font-size: 32px;
              font-family: PingFang SC, PingFang SC-Bold;
              font-weight: bold;
              text-align: center;
              color: #333333;
              margin-bottom: 32px;
              margin-top: 35px;
            }
            .message-xq {
              margin-bottom: 70px;
              font-size: 24px;
              font-family: PingFang SC, PingFang SC-Regular;
              text-align: left;
              color: #333333;
            }
          }
        }
        .message-footer {
          margin-bottom: 46px;
          .message-bg-box {
            height: 76px;
            line-height: 76px;
            background-image: url('../../assets/img/btn.png');
            background-position: center;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #fff;
            font-size: 28px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: bold;
            text-align: center;
          }
          .message-bg {
            width: 542px;
          }
          .message-new {
            width: 311px;
          }
          .message-new-xz {
            width: 200px;
            margin-left: 20px;
          }
        }
      }
    }
  }
}

.popup-noprize {
  width: 80%;
  height: 300px;
  .popupContent-img1 {
    font-size: 32px;
    font-weight: 700;
  }
  .popupContent-1 {
    width: 80%;
    height: 70px;
    margin: 60px auto 0;
    border-radius: 25px;
    line-height: 70px;
    font-size: 30px;
    font-weight: 700;
    background-color: yellow;
  }
}
</style>

<template>
  <div class="page">
    <div class="header">
      <img src="@/assets/img/static/logo.png" mode="" />
      <div>
        <div>
          {{ appName }}
        </div>
        <div style="margin-top:5px;">
          {{ appDes }}
        </div>
      </div>
    </div>
    <div class="bg"></div>
    <div class="content">
      <img src="@/assets/img/static/content.png" mode="" />
    </div>
    <div class="btns">
      <div @click="down('and')">
        <div class="icon">
          <img src="@/assets/img/static/and.png" mode="" />
        </div>
        <div class="text">
          <div>Andriod版</div>
          <div>免费下载</div>
        </div>
      </div>
      <!-- <div @click="down('ios')">
        <div class="icon">
          <img src="@/assets/img/static/ios.png" mode="" />
        </div>
        <div class="text">
          <div>ios版</div>
          <div>免费下载</div>
        </div>
      </div> -->
    </div>
    <div class="wx" v-if="weixin"></div>
  </div>
</template>

<script>
import api from '@/api/user';
import validate from '../../utils/validate';
export default {
  data() {
    return {
      // 新
      appLogo: 'https://hellouniapp.dcloud.net.cn/static/img/uni.e19b3310.png', //app logo图片路径
      appName: '肥狗', //app名称
      appDes: '肥狗是一款网购省钱养成自律习惯的应用平台', //app简述
      andHref:'http://dxktest.oss-cn-zhangjiakou.aliyuncs.com/client/20210226/f7ffddbd844c81d2379534ef0f7b79dc.apk', //安卓app下载地址		
      iosHref:
        'https://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8', //苹果appStore链接
      weixin: false, //是否为微信内浏览器打开
      scheme: '', //scheme地址 如果已安装app直接打开，置空则不执行
    };
  },

  mounted() {
    // this.Down();
    // 判断该页面是否为微信内置浏览器内打开 true>显示浏览器内打开引导
    this.isWX();
    // 如果需要通过scheme直接打开app
    this.openApp();
  },
  methods: {
    isWX() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.weixin = true;
      } else {
        this.weixin = false;
      }
    },
    openApp() {
      if (this.scheme) {
        window.location = this.scheme;
      }
    },
    down(type) {
      if (type == 'and') {
        window.location.href = this.andHref;
      } else {
        window.open(this.iosHref);
      }
    },

    async Down() {
      let res = await api.down({
        versionNoType: 1,
      });
      if (res.status == 200) {
        if (res.data != null) {
          this.url = res.data.cdnurl;
        } else {
          this.msg = res.msg;
        }
      } else {
        this.$toast(res.msg);
      }
    },

  },
};
</script>
<style lang="less">
	@BgColor: #f37b1d; //主题背景色

	.page {
		background-color: #f8f8f8;
		width: 100vw;
		// height: 100vh;
		overflow: hidden;

		.header {
			width: 100vw;
			height: 450px;
			background-color: @BgColor;
			padding-top: 110px;
			display: flex;
			justify-content: center;

			img {
				width: 120px;
				height: 120px;
				margin-right: 30px;
			}

			>div {
				height: 120px;
				color: #fff;
				font-weight: 700;
				display: flex;
				flex-direction: column;
        justify-content: center;
        text-align: left;

				div:nth-child(1) {
					font-size: 34px;
				}

				div:nth-child(2) {
					font-size: 28px;
				}
			}
		}

		.bg {
			width: 100vw;
			height: 210px;
			background-image: url(../../assets/img/static/bg.png);
			background-size: 100%;
			background-position: center bottom;
			background-repeat: no-repeat;
			position: absolute;
			left: 0;
			top: 300px;
		}

		.content {
			width: 750px;
			height: 750px;
			position: absolute;
			top: 49%;
			left:50%;
			transform: translate(-50%,-50%);
			overflow: hidden;

			img {
				width: 750px;
				height: 750px;
			}
		}

		.btns {
			width: 100vw;
			height: 300px;
			position: absolute;
			bottom: 2%;
			left: 0;

			>div {
				width: 380px;
				height: 120px;
				background-color: @BgColor;
				color: #FFFFFF;
				display: flex;
				margin: 0 auto;
				margin-bottom: 40px;
				border-radius: 15px;
				box-shadow: 0 10px 24px -10px @BgColor;
				;

				.icon {
					width: 120px;
					height: 120px;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.text {
					display: flex;
					flex-direction: column;
					justify-content: center;

					div:nth-child(1) {
						font-size: 34px;
					}

					div:nth-child(2) {
						font-size: 28px;
					}
				}

				img {
					width: 50px;
					height: 50px;
				}
			}

			>div:nth-child(2) {
				margin-bottom: 0px;
			}
		}

		.wx {
			position: fixed;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, .7);
			width: 100vw;
			height: 100vh;
			background-image: url(../../assets/img/static/wx.png);
			background-size: 100%;
			background-position: center 100px;
			background-repeat: no-repeat;
		}
	}
</style>

<template>
  <div id="userAgreement">
    <div class="el-userAgreement-content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: `<h1>用户协议</h1>`,
    };
  },
  created() {},
};
</script>

<style lang="less" scoped>
.el-userAgreement-content {
  padding: 32px;
}
</style>

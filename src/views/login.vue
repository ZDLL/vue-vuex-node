<template lang="html">
  <div class="login ">
    <h2>{{title}}</h2>
    <div class="login-box">
      <el-input
        placeholder="用户名"
        v-model="name"
        clearable>
      </el-input>
      <el-input  class="mt30" placeholder="请输入密码" v-model="pwd" show-password></el-input>
      <button class='isOk' @click='ayncIsOK'>确定</button>
      <el-button  class="mt30 floatleft" @click='login'>登录</el-button>
      <el-button  class='mt30 floatright' @click='regis'>注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  props: [],
  data() {
    return {
      name: '',
      pwd: '',
      title: "登录",
      showSore: false,
      resBackData: this.$store.state.userModule.resData
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      let _this = this;
      _this.title = '登录';
      _this.showSore = true;
    },
    regis() {
      let _this = this;
      _this.title = '注册';
      _this.showSore = true;
    },
    async ayncIsOK() { //变成同步函数
      let _this = this;
      if (_this.title == '注册') {
        _this.$store.dispatch("userModule/asyncResData", {
          name: _this.name,
          pwd: _this.pwd
        })
        if (this.$store.state.userModule.resData2.data.code == 1) {
          this.$router.push({ //语法
            path: '/home', //跳转的路径
            query: { //路由传递参数
              id: "123",
            }
          })
        }
      } else if (_this.title == '登录') {
        await _this.$store.dispatch("userModule/asyncGetData", {
          name: _this.name,
          pwd: _this.pwd
        });
        if (this.$store.state.userModule.resData.data.code == 1) {
          this.$router.push({ //语法
            path: '/home', //跳转的路径
            query: { //路由传递参数
              id:this.$store.state.userModule.resData.data.data,
            }
          })
        }
      }else {
        alert("错误")
      }
    }

  },
  watch: {}
}
</script>

<style lang="scss"> //scoped 为了解决样式私有化而存在，不可修改
@import '../style/common.scss';
.login {
    padding-top: 30px;
    h2 {
        font-size: 18px;
        margin-bottom: 20px;
    }
    .mt30 {
        margin-top: 30px;
    }
    .login-box {
        padding: 30px;
        width: 400px;
        height: auto;
        border: 1px #dcdcdc solid;
        margin: 1px auto;
        border-radius: 4px;
        overflow: hidden;
    }
    .isOk {
        // width:80%;
        // left: 10%;
        width: 100%;
        border: 1px #409EFF solid;
        color: #409EFF;
        font-size: 16px;
        text-align: center;
        height: 44px;
        line-height: 44px;
        border-radius: 4px;
        overflow: hidden;
        margin-top: 30px;
    }
}
</style>

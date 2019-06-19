<template lang="html">
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">
          <div class='aside'>
            <router-link :to="{ path: '/home/adduser'}" replace>
                添加用户
              </router-link>
          </div>
          <div class='aside'>
            <router-link :to="{ path: '/home/addlist'}" replace>
              新增列表
            </router-link>
          </div>

          </el-aside>
          <el-main>
             <router-view></router-view>
          </el-main>
        </el-container>
  </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  props: [],
  data() {
    return {

    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  watch: {},
  filters: {}
};
</script>
<style lang="scss">
@import '../style/common.scss';
@import '../style/module/home.scss';
</style>

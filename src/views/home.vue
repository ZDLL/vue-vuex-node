<template>
  <div class="home">
    <el-container>

      <el-header>
        <Heade></Heade>
      </el-header>
        <el-container>
          <el-aside width="200px">
          <div>
            <router-link :to="{ path: '/home/adduser',query:{'id':token}}" replace class='a-aside'>
                用户列表
              </router-link>
          </div>
          <div>
            <router-link :to="{ path: '/home/addlist',query:{'id':token}}" replace class='a-aside'>
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
import Heade from '../components/heade.vue';

export default {
  name: "home",
  props: [],
  data() {
    return {
      token:''
    };
  },
  components:{
    Heade
  },
  computed: {},
  created() {},
  mounted() {
    this.token = this.$route.query.id;
  },
  methods: {},
  watch: {},
  filters: {}
};
</script>
<style lang="scss">
@import '../style/common.scss';
@import '../style/module/home.scss';
</style>

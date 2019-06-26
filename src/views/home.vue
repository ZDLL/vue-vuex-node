<template>
  <div class="home">
    <el-container>

      <el-header>
        <Heade></Heade>
      </el-header>
        <el-container>
          <el-aside width="200px">
          <div v-if='right.length>0' v-for='(itm,index) in right' :key='index'>
            <router-link :to="{ path: '/home/'+itm.key+'',query:{'id':token}}" replace class='a-aside'>
              {{itm.name}}
              </router-link>
          </div>
          <!-- <div>
            <router-link :to="{ path: '/home/addlist',query:{'id':token}}" replace class='a-aside'>
              新增列表
            </router-link>
          </div> -->

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
import until from '../common/until.js';

export default {
  name: "home",
  props: [],
  data() {
    return {
      token:'',
      right:[]
    };
  },
  components:{
    Heade
  },
  computed: {},
  created() {
    let userInfo = JSON.parse(until.getStore("userInfo"))
    let right = userInfo.right;
    this.right = right

  },
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

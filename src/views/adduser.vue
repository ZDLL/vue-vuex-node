<template lang="html">
  <div class="add_user">
      <h2>用户列表</h2>
      <div v-for='itm in list'>
        {{itm.username}}---{{itm.userId}}
      </div>
  </div>
</template>

<script>
export default {
  name:"",
  props:[],
  data() {
    return {
      list:[]
    };
  },
  computed: {},
  created(){
    this.getLIst()
  },
  mounted(){},
  methods: {
    async getLIst(){
      await this.$store.dispatch("userModule/asyncGetUserList",{})
      this.list = this.$store.state.userModule.userList
    }
  },
  watch: {},
  filters:{}
};
</script>

<style lang="scss">
  @import '../style/common.scss';

</style>

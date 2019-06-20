<template lang="html">
  <div class="vheade">
    <div class='userName'>
      {{phone}}
    </div>
    <div class='userPhone'>
      {{name}}
    </div>
  </div>
</template>
<script>
export default {
  name: "heade",
  props: [],
  data() {
    return {
    };
  },
  created() {
    this.token = this.$route.query.id;
    this.$store.dispatch('userModule/asyncGetUserInfo',{token:this.token});
  },
  computed: {
    name() {
      return this.$store.state.userModule.userData.username;
    },
    phone(){
        return this.$store.state.userModule.userData.phone
    }
  },
  mounted() {},
  methods: {},
  watch: {},
  filters: {}
};
</script>
<style lang="scss">
@import '../style/common.scss';
.vheade {
    overflow: hidden;
    clear: both;
    .userName,
    .userPhone {
        float: right;
        color: #fff;
    }
    .userPhone {
        margin-right: 30px;
    }
}
</style>

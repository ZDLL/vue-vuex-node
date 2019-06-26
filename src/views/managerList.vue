<template lang="html">
  <div class="add_user">
      <el-row>
        <el-button @click='getMangData("")'>添加管理员</el-button>
      </el-row>
      <div class="mangerList">
        <el-table
          :data="list"
          border
          style="width: 100%">
          <el-table-column
            label="日期">
            <template slot-scope="scope">
              {{scope.row.createTime | timeFormat}}
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="userToken"
            label="用戶id"
            width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click='getMangData(scope.row)'>編輯</el-button>
              <el-button size="small" @click='deleteMang(scope.row)'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="添加管理员"
        :visible.sync="dialogVisible"
        width="50%">
        <el-input v-model="addMangData.name" placeholder="姓名"></el-input>
        <el-input v-model="addMangData.pwd" placeholder="设置密码"></el-input>
        <el-input v-model="addMangData.phone" placeholder="手机号"></el-input>
        <el-select v-model="addMangData.right" multiple placeholder="请选择">
          <el-option
            v-for="item in parentRight"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click='addMan'>确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import until from '../common/until.js'
export default {
  name: "",
  props: [],
  data() {
    return {
      list: [],
      dialogVisible:false,
      parentRight:[],
      addMangData: {
        name: '',
        pwd: "",
        phone:'',
        right:[],
        state: 1
      },
      deleteData:{
        userToken:''
      }
    };
  },
  computed: {},
  created() {
    this.getLIst();
    let rig =JSON.parse(until.getStore('userInfo')).right;
    this.parentRight = rig
    console.log(rig)
  },
  mounted() {},
  methods: {
    async getLIst() {
      await this.$store.dispatch("userModule/asyncGetUserList", {})
      this.list = this.$store.state.userModule.userList
    },
    async addMan() {
      this.dialogVisible =  false;
      try {
        JSON.parse(this.addMangData.right)
      } catch (e) {
          this.addMangData.right = JSON.stringify(this.addMangData.right)
      } finally {

      }

      await this.$store.dispatch("userModule/asyncSetAddMang",this.addMangData)
      if(this.$store.state.userModule.addMang.code=1){
        this.getLIst();
      }
    },
    async deleteMan(){
      await this.$store.dispatch("userModule/asyncDeleteMang",this.deleteData);
      if(this.$store.state.userModule.deleteMang.code==1){
        this.getLIst();
      }
    },
    getMangData(row) {
      let _this = this;
      _this.dialogVisible = true;
      if(row){
        _this.addMangData={
          name: row.username,
          pwd: row.password,
          phone:'',
          right:JSON.parse(row.right),
          state: row.state,
          userToken:row.userToken
        }
      }else {
        _this.addMangData={
          name: '',
          pwd: '',
          phone:'',
          right:'',
          state:'',
          userToken:''
        }
      }
    },
    deleteMang(row){
      this.deleteData.userToken= row.userToken;
      this.deleteMan();
    }
  },
  watch: {},
  filters: {
    timeFormat(val) {
      if(val){
        return until.greenTimeChange(val)
      }

    }
  }
};
</script>

<style lang="scss">
@import '../style/common.scss';
.add_user {
    text-align: left;
    .mangerList {
        margin-top: 30px;
    }
}
</style>

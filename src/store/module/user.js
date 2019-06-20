import api from '../../config/api.js';
import axios from "axios"
let getData = function(url,payload){
   return new Promise((res,rej)=>{
    axios.post(url,payload).then(data=>{
        res(data)
     }).catch(err=>{
        rej(err)
     })
  })
};

const state = {
  resData:'',
  resData2:'',
  userData:{
    name:"",
    phone:''
  },
  userList:[]
}
// getters
const getters = {//同步

}
// actions
const actions = {//异步

  async asyncGetData(context, payload){
     context.commit("getLoginData", await getData(api.login,payload))//等待 getData 执行完成后再commit
  },
  async asyncResData(context, payload){
     context.commit("getResData", await getData(api.regist,payload))//等待 getData 执行完成后再commit
  },
  async asyncGetUserInfo(context,data){
    context.commit("getUserInfo",await getData(api.userInfo,data))
  },
  async asyncGetUserList(context,data){
    context.commit("getUserList",await getData(api.userList,data))

  }
}

// mutations
const mutations = {//同步
  getLoginData(state,data){
      state.resData = data
  },
  getResData(state,data){
      state.resData2 =  data
  },
  getUserInfo(state,data){
    state.userData = data.data.data;
    state.userData.phone = '123';
  },
  getUserList(state,data){
    state.userList = data.data.data
  }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}

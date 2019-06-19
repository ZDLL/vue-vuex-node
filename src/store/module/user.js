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
  resData2:''
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
  }
}

// mutations
const mutations = {//同步
  getLoginData(state,data){
      state.resData = data
  },
  getResData(state,data){
      state.resData2 =  data
  }
}

export default {
  namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
  state,
  getters,
  actions,
  mutations
}

import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './module/user.js'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    userModule
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
})

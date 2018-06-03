import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDialog : false
  },
  mutations: {
    isShowDeleteBox (state,flag){
      state.isDialog = flag;
    }
  },
  actions: {
    isShowDeleteBox (flag){
      flag.commit('isShowDeleteBox');
    }
  },
});

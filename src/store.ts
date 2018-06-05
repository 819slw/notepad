import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDialog : false,
    addnote:''
  },
  mutations: {
    isShowDeleteBox (state,flag){
      state.isDialog = flag;
    },
    addNoteitem(state,conetnt){
      state.addnote = conetnt;
    }
  },
  actions: {
    isShowDeleteBox (flag){
      flag.commit('isShowDeleteBox');
    },
    addNoteitem(conetnt){
      conetnt.commit('addNoteitem');
    }
  },
});

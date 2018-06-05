import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import AddNewNote from './components/AddNewNote.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/addNewNote',
      name: 'addNewNote',
      component: AddNewNote,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});

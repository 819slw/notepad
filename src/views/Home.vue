<template>
  <div class="home">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Notepad</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>check_circle</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="index" avatar ripple @click="">               
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon color="grey lighten-1" @click="checkContent()">delete</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                <hr/>
            </template>
          </v-list>
            <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="pink"
            >
              <v-icon>add</v-icon>
            </v-btn> 
        </v-card>
      </v-flex>
      <DeleteNote />
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AddNewNote from '@/components/AddNewNote.vue'; // @ is an alias to /src  
import DeleteNote from '@/components/DeleteNote.vue'; // @ is an alias to /src  
import { create } from 'domain';

@Component({
  components: {
    AddNewNote,
    DeleteNote
  },
})
export default class Home extends Vue {
  private items:any =[
          { title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
          { title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
          { title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
          { title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
          { title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
  ] 
  private obj: Array<object> =[
    {
      title:'asd',
      content:'dasdasdasdasdasdas'
    }
  ]

  created(){
    /*
    *判断是否存在 不需要判断是否有值
    */
    let localStorageStr = localStorage.getItem('ooooo');
    if(localStorageStr){
      let arr = JSON.parse(localStorageStr);
      this.items = arr;
    }else{ //当用户第一次 进入该应用或者保存的localstroage已经失效会进来重新建立一次保存
      let str = JSON.stringify('[]');
      localStorage.setItem('ooooo',str);
    }
  }


  //事件
  checkContent() {
    this.$store.commit('isShowDeleteBox',true);
  }



}
</script>

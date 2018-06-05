<template>
  <v-app >
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="height:100%">
          <v-toolbar color="pink" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Notepad</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn @click="AddNote" icon>
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="index" avatar ripple @click="()=>{}">  
                <input type="checkbox" v-bind="{checked:item.checkbox}" @click="changeChecked(index)"/>
                <v-list-tile-content>      
                  <v-list-tile-title @click="modify(index)" :class="{finished:item.checkbox}">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon color="grey lighten-1" @click="checkContent(index)">delete</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>

      <v-dialog v-model="isDialog" max-width="500px">
        <v-card>
          <v-card-title>
            您忍心删除自己的笔记吗？
          </v-card-title>
            asdasda
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog2=false" @click="isDelete(false)">不忍心</v-btn>
            <v-btn color="primary" flat @click.stop="dialog2=false" @click="isDelete(true)">忍心</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- <DeleteNote /> -->
    </v-layout>
  </v-app>
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
  private items:any =[]
  private checkbox:boolean = true
  private deleteIndex:number = 0

  private obj: object ={
      title:'asd',
      content:'dasdasdasdasdasdas',
      checkbox:false
    }
  
  private isDialog: boolean = false;

  created(){
    /*
    *判断是否存在 不需要判断是否有值
    */
   let str = JSON.stringify(this.obj);
    let localStorageStr = localStorage.getItem('yyy');
    if(localStorageStr){
      this.items = this.adjustmentData();
    }else{ //当用户第一次 直接给一个空值
      this.items = []
    }
  }


  //事件
  checkContent(index) {
    this.$store.commit('isShowDeleteBox',true);
    this.isDialog = true;
    this.deleteIndex = index;
  }

  adjustmentData(){
    let localStorageStr = localStorage.getItem('yyy');
    let arr = localStorageStr.split('+');
    let transformArr = [];
    arr.map((item,index)=>{
      transformArr.push(JSON.parse(item));
    })
    return transformArr
  }

  adjustmentDataStr(data ){
    let str = ''
    let length = data.length;
    if(length <= 1){
      str = JSON.stringify(data[0]);
    }else{
      data.map((item,index)=>{
        if(index == 0){
          str = JSON.stringify(data[0]);
        }else{
          str += '+'+ JSON.stringify(item);
        }
      })
    }
    return str;
  }  

  changeChecked(index:number){
    console.log('萨达萨达撒');
    this.items[index].checkbox = !this.items[index].checkbox;
    let str = this.adjustmentDataStr(this.items);
    localStorage.setItem('yyy',str);
  }

  isDelete (flag:boolean){
    let index = this.deleteIndex;
    if(flag){ 
      this.items.splice(index,1);
      let newArr = this.adjustmentDataStr(this.items);
      if(newArr){
        localStorage.setItem('yyy',newArr);   //****
      }else{
        localStorage.setItem('yyy','');
      }
      
    }
    this.isDialog = false;
    // this.$store.commit('isShowDeleteBox',false)
  }

  AddNote(){
    this.$router.push({
      path: '/addNewNote'
    });
  }

  modify(index){
    this.$router.push({
      path: '/addNewNote?modify='+index+''
    });
  }

}
</script>
<style>
.finished{
  text-decoration:line-through;
  color: chartreuse;
}
</style>
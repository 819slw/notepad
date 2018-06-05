<template>
  <div class="hello">
    <v-alert :value="alert" type="error">
      至少输入标题或者内容中的一种!
    </v-alert>
      <v-layout class="pt-0 pb-0 pr-0 pl-0 mt-0 mr-0 ml-0 mb-0" row>
        <v-flex xs12 sm6 offset-sm3 class="pt-0 pb-0 pr-0 pl-0 mt-0 mr-0 ml-0 mb-0">
          <v-card dark color="pink" class="d-flex">
            <v-card-text class="text-sm-left px-0" @click="cancel()">取消</v-card-text>
            <v-card-text class="text-sm-right px-0" @click="saveContent()">保存</v-card-text>
          </v-card>
          <input type="text" class="pt-2" v-model="title" id="input_title" placeholder="请输入你的标题" />
          <textarea v-model="msg" id="input_content" placeholder="请输入你要记录的内容"></textarea>
        </v-flex>
      </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { setFlagsFromString } from 'v8';

interface ITodoItem {
  id: string
  content: string
  isDone: boolean
}

@Component({
})
export default class AddNewNote extends Vue {
  private msg: string = '';
  private title: string = '';
  private alert: boolean = false;

  @Watch("$store.state.addnote") 
  "$store.state.addnote"(n:any, o:any){
    
  }

  mounted(){
    let index = this.$route.query.modify;
    if(index){
      let nowTotal = this.adjustmentDataArr();
      this.title = nowTotal[index].title;
      this.msg = nowTotal[index].content;
    }else{
      let inputContent = document.getElementById('input_title');
      inputContent.focus();
    }
  }

  saveContent(){
    let index = this.$route.query.modify;
    if( this.title =='' || this.msg==''){
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 1000);
    }else{
      if(index){
        let arr = this.adjustmentDataArr();
        arr[index].title = this.title;
        arr[index].content = this.msg;
        let str = this.adjustmentDataStr(arr);
        localStorage.setItem('yyy',str);
      }else{
        let content = {
          title:this.title,
          content:this.msg,
          checkbox:false
        };
        let locContent = localStorage.getItem('yyy');   //str
        let newNote = JSON.stringify(content);
        let willSaveNote = '';
        if(locContent){
          let length = locContent.length;
          if(length > 1){
            willSaveNote = locContent +'+'+ newNote;
          }else{
            willSaveNote = newNote;
          }
        }else{
          willSaveNote = newNote;
        }
        localStorage.setItem('yyy',willSaveNote);
      }
      this.$router.push({
        path:'/'
      })   
    }
  }

  adjustmentDataStr(data){
    let str = ''
    let length = data.length;
    if(length <= 1){
      str = JSON.stringify(data[0]);
    }else{
      data.map((item,index:number)=>{
        if(index == 0){
          str = JSON.stringify(data[0]);
        }else{
          str += '+'+ JSON.stringify(item);
        }
      })
    }
    return str;
  }

  adjustmentDataArr() :Array<ITodoItem>{
    let localStorageStr = localStorage.getItem('yyy');
    let arr = localStorageStr && localStorageStr.split('+');
    let transformArr: Array<ITodoItem> = [];
    arr && arr.map((item,index)=>{
      transformArr.push(JSON.parse(item) as ITodoItem);
    })
    return transformArr
  }

  cancel(){
    this.$router.push({
      path:'/'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#input_content{
  width: 100%;
  height: calc( 100vh - 115px );
}
.hello{
  
}
</style>

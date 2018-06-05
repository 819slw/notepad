<template>
  <div class="DeleteNote">
    <v-layout row justify-center>
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
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { watch } from 'fs';
import { log } from 'util';

@Component({
    components:{

    },
    ...mapState(['isDialog'])
})
export default class DeleteNote extends Vue {

  isDelete (flag:boolean){
    if(flag){
      // console.log('删除');
    }else{
      // console.log('不删除');
    }
    this.$store.commit('isShowDeleteBox',false)
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
</style>

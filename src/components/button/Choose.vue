<template>
  <el-button type="success" :icon="Refresh" circle @click="chooseCharacter"/>
  <el-dialog
      v-model="centerDialogVisible"
      title="选择角色"
      align-center
      center
      ref="dialog"
      @open="openDialog"
  >
    <el-table :data="list" style="height: 460px">
      <el-table-column prop="name1">
        <template #default="scope">
          <el-button style="width: 100%" v-show="scope.row.name1!==''" type="primary" plain
                     @click="clickCharacter(scope.row.name1)">{{ scope.row.name1 }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name2">
        <template #default="scope">
          <el-button style="width: 100%" v-show="scope.row.name2!==''" type="primary" plain
                     @click="clickCharacter(scope.row.name2)">{{ scope.row.name2 }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name3">
        <template #default="scope">
          <el-button style="width: 100%" v-show="scope.row.name3!==''" type="primary" plain
                     @click="clickCharacter(scope.row.name3)">{{ scope.row.name3 }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    <el-button v-for="item in list" type="primary" plain :autofocus="item===this.name" @click="this.name = item">{{item}}</el-button>-->
    <el-text style="width: 100%;text-align: center">当前角色：{{name}}</el-text>
<!--    <el-input v-model="this.character" placeholder="输入角色名"/>-->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false" plain>取消</el-button>
        <el-button type="info" disabled plain v-if="!isExist">
          查无此人
        </el-button>
        <el-button type="primary" @click="changeCharacter" plain v-else :disabled="!change">
          就是你了
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Choose",
  props: {
    name: {type: String, defaultValue: ''},
    list: {type:Array, defaultValue: []},
    nameList: {type: Array, defaultValue: []}
  },
  data() {
    return {
      character:"",
      change: false,
      isExist: true,
      centerDialogVisible: false,
    }
  },
  watch: {
    character(newVal,oldVal) {
      if (newVal === oldVal) {
        this.change = false
        this.isExist = true
      } else {
        this.change = true
        this.isExist = this.nameList.includes(newVal)
      }
    }
  },
  emits: ['changeCharacter'],
  methods: {
    changeCharacter() {
      this.centerDialogVisible = false
      this.change = !this.change
      this.$emit('changeCharacter', this.character)
    },
    chooseCharacter() {
      this.centerDialogVisible = true
    },
    openDialog() {
      this.character = this.name
    },
    clickCharacter(e){
      this.character=e
    }
  }
}
</script>
<script setup>
import {Refresh} from "@element-plus/icons-vue";
</script>
<style scoped>

</style>
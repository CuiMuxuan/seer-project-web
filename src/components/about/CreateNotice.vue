<template>
<div class="create-notice">
  <div v-if="!auth" class="flex-display">
    <el-input v-model="input" placeholder="输入口令" class="flex"/>
    <el-button type="primary" plain @click="checkAuth" class="flex">验证口令</el-button>
  </div>
  <div v-if="auth">
    <div class="quill-editor">
      <Editor style="min-height: 500px" ref="quillEditorRef" v-model:content="content"></Editor>
    </div>
    <div style="text-align: center">
      <el-button type="primary" plain @click="upload">发布公告</el-button>
    </div>
  </div>
</div>
</template>

<script>
import {ElMessage} from 'element-plus';
import Editor from "../editor/Editor.vue";

export default {
  name: "CreateNotice",
  components:{
    Editor
  },
  data(){
    return {
      content: '',
      auth:false,
      input:''
    }
  },
  methods:{
    async checkAuth(){
      let config = {
        method: 'POST',
        url: '/notice/auth',
        headers: {
          'Content-Type': 'text/plain'
        },
        data: this.input
      }
      await this.$http(config).then(res => {
            this.auth=res.data.data
          }
      ).catch(error => {

      })
    },
    async handleSetContent() {
      const refs = await this.$refs.quillEditorRef;
      const status = await refs.handleSetHtml(this.content)
    },

    /**
     * 获取编辑器内容
     */
    async handleGetContent() {
      const refs = await this.$refs.quillEditorRef;
      this.content = await refs.handleGetHtml();
    },
    async upload() {
      await this.handleGetContent()
      const config = {
        method: 'post',
        url: '/notice/upload',
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.content
      }
      this.$http(config).then(res => {
            ElMessage({
              showClose: true,
              message: '创建成功',
              type: 'success',
            })
            //成功后跳转到博客详情页
            this.auth=false;
            this.input='';
          }
      ).catch(error => {
        ElMessage({
          showClose: true,
          message: '创建失败',
          type: 'error',
        })
      })
    }
  }
}
</script>

<style scoped>
.create-notice{
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
.quill-editor{
  padding: 5px 0;
}
.flex{
  flex: 1;
}
.flex-display{
  display: flex;
}
</style>
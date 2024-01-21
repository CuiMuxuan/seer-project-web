<template>
  <div class="editor-box">
    <QuillEditor ref="quill" :modules="modules" :toolbar="toolbar" content-type="html" :disabled="true"
                 :content="content" :options="options" style="height: 100%;"/>
  </div>
</template>
<!-- Initialize Quill editor -->
<script>
import {defineComponent} from 'vue'
import { QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ImageUploader from '../../assets/quill.imageUploader.js';
import MarkdownToolbar from 'quill-markdown-toolbar';
import BlotFormatter,{AlignAction,DeleteAction,ImageSpec,ResizeAction} from 'quill-blot-formatter';
import axios from 'axios'
class CustomImageSpec extends ImageSpec {
  getActions() {
    return [AlignAction, DeleteAction, ResizeAction];
  }
}
export default defineComponent({
  components: {
    QuillEditor,
  },
  name: 'Editor',
  props: {
    // 编辑器内容
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 编辑器选项
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{'header': 1}, {'header': 2}],               // custom button values
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
          [{'direction': 'rtl'}],                         // text direction

          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
          [{'header': [1, 2, 3, 4, 5, 6, false]}],

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'font': []}],
          [{'align': []}],
          ['image', 'video'],
          ['markdown'],
          // ['clean'],                                         // remove formatting button
        ],
        handlers: {
          markdown() {
          }
        }
      },
      options:{
        debug: 'warn',
        placeholder: '请输入内容~',
        readOnly: false,
        theme: 'snow',
        modules:{
          blotFormatter: {
            specs: [CustomImageSpec],
          },
          overlay: {
            styles: {
              border: '1px solid #ccc',
              background: 'rgba(0, 0, 0, 0.5)',
            },
          },
        }
      },
    }
  },
  setup:()=>{
    const modules=[]
    modules.push( {
      name: 'imageUploader',
      module: ImageUploader,
      options: {
        upload(file) {
          var fd = new FormData();
          fd.append("file", file);
          const config = {
            url: "http://127.0.0.1:5173/api/notice/uploadImage",
            method: "post",
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: fd,
          }
          return new Promise((resolve, reject) => {
            axios(config).then((res) => {
              resolve("https://" + res.data)
            })
                .catch((err => {
                  reject(err)
                }))
          })
        },
      },
    })
    modules.push({
      name: 'markdownToolbar',
      module: MarkdownToolbar,
    })
    modules.push({
      name: 'blotFormatter',
      module: BlotFormatter,
      options: {
        specs: [CustomImageSpec],
      },
    })
    return {
      modules
    }
  },
  methods: {
    /**
     * 设置编辑器 Text 内容
     */
    async handleSetText(content) {
      const refs = await this.$refs
      refs.quill.setText(content)
      return 'OK'
    },

    /**
     * 获取编辑器 Text 内容
     */
    async handleGetText() {
      const refs = await this.$refs
      return refs.quill.getText();
    },

    /**
     * 设置编辑器 Html 代码
     */
    async handleSetHtml(content) {
      const refs = await this.$refs
      refs.quill.setHTML(content)
      return 'OK'
    },

    /**
     * 获取编辑器 Html 代码
     */
    async handleGetHtml() {
      const refs = await this.$refs
      return refs.quill.getHTML();
    }

  }
})
</script>
<style lang="less" scoped>
.editor-box {
  width: 100%;
  height: 100%;
  // min-height: 300px;
}
</style>
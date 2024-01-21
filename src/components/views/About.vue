<template>
  <div class="about">
    <Notice v-for="item in list" :id="item['id']"></Notice>
  </div>
</template>

<script>
import Notice from "../about/Notice.vue";
export default {
  name: "about",
  components:{
    Notice
  },
  data(){
    return{
      id:1,
      list:[]
    }
  },
  created() {
    this.getAllNotice()
  },
  methods:{
    async getAllNotice(){
      await this.$http.get('/notice/show' ).then((res) => {
        this.list = res.data.data
      })
    }
  }
}
</script>

<style scoped>
.about{
  width: 100%;
}
</style>
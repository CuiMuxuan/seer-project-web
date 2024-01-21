<template>
<!--  <div class="rank" v-loading.fullscreen.lock="isLoading" :element-loading-spinner="this.$loadingSvg" element-loading-text="我知道你很急，但是你先别急">-->
<!--  </div>-->
  <div class="occupy">
    <el-text class="custom-center">作者制作中……</el-text>
  </div>
</template>

<script>
export default {
  name: "Rank.vue",
  data(){
    return{
      isLoading:true,
      vision:"请选择版本号",
      table:[]
    }
  }
}
</script>

<style scoped>

</style>
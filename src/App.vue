<template>
  <div>
    <el-header class="header">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" :router=true
               style="width: 100%">
        <div class="flex-grow"/>
<!--        <el-menu-item index="/top">排行</el-menu-item>-->
        <el-sub-menu index="/t">
          <template #title>排行</template>
          <el-menu-item index="/top">数值</el-menu-item>
          <el-menu-item index="/rank">梯度</el-menu-item>
        </el-sub-menu>
        <div class="flex-grow"/>
        <el-sub-menu index="/character">
          <template #title>角色</template>
          <el-menu-item index="/train">培养</el-menu-item>
          <el-menu-item index="/max">极限</el-menu-item>
        </el-sub-menu>
<!--        <el-menu-item index="/train">培养</el-menu-item>-->
        <div class="flex-grow"/>
        <el-menu-item index="/compute">计算</el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="/about">关于</el-menu-item>
        <div class="flex-grow"/>
      </el-menu>
    </el-header>
    <el-container class="app-container">
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script type="ts">
export default {
  name: 'App',
  watch: {
    $route(to) {
      // console.log(to.path)
      this.activeIndex = to.path
    }
  },
  data() {
    return {
      activeIndex: this.$route.path
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
}

.flex-grow {
  flex-grow: 1;
}
</style>

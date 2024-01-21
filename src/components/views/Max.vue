<template>
  <div class="man-view" v-loading.fullscreen.lock="isLoading" :element-loading-spinner="this.$loadingSvg" element-loading-text="我知道你很急，但是你先别急">
    <Character @changeCharacter="changeCharacter"></Character>
    <el-divider>
      角色数值
    </el-divider>
    <div>
      <el-descriptions
          :column="1"
          size="large"
          border
      >
        <el-descriptions-item align="center" label-align="center" label="属性" style="display: flex">
          {{ "基础数值" }} / {{ "极限数值" }}
        </el-descriptions-item>
        <el-descriptions-item align="center" label-align="center" label="攻击"><el-text type="info">{{ character.attack }}</el-text> / <el-text type="danger">{{max.attack}}</el-text></el-descriptions-item>
        <el-descriptions-item align="center" label-align="center" label="防御"><el-text type="info">{{character.defense}}</el-text>  / <el-text type="danger">{{max.defense}}</el-text></el-descriptions-item>
        <el-descriptions-item align="center" label-align="center" label="生命"><el-text type="info">{{character.life}}</el-text>  / <el-text type="danger">{{max.life}}</el-text></el-descriptions-item>
        <el-descriptions-item align="center" label-align="center" label="速度"><el-text type="info">{{character.speed}}</el-text>  / <el-text type="danger">{{max.speed}}</el-text></el-descriptions-item>
        <el-descriptions-item align="center" label-align="center" label="暴击"><el-text type="info">{{character.crit}}%</el-text>  / <el-text type="danger">{{max.crit}}%</el-text></el-descriptions-item>
        <el-descriptions-item align="center" label-align="center" label="暴伤"><el-text type="info">{{character.criticalDamage}}%</el-text>  / <el-text type="danger">{{max.criticalDamage}}%</el-text></el-descriptions-item>
        <el-descriptions-item align="center" label-align="center" label="精准"><el-text type="info">{{character.precision}}%</el-text>  / <el-text type="danger">{{max.precision}}%</el-text></el-descriptions-item>
        <el-descriptions-item align="center" label-align="center" label="抵抗"><el-text type="info">{{character.resistance}}%</el-text>  / <el-text type="danger">{{max.resistance}}%</el-text></el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import Character from '../max/Character.vue';
export default {
  name: "max",
  components:{
    Character
  },
  data(){
    return {
      isLoading:true,
      character:{
        attack:0,
        defense:0,
        life:0,
        speed:0,
        crit:0,
        criticalDamage:0,
        precision:0,
        resistance:0,
      },
      max:{
        attack:0,
        defense:0,
        life:0,
        speed:0,
        crit:0,
        criticalDamage:0,
        precision:0,
        resistance:0,
      }
    }
  },
  methods:{
    changeCharacter(e){
      this.character=e.character
      this.getMax()
    },
    getMax(){
      this.$http.get("/character/getCharacterMaxById/"+this.character.id).then(res=>{
        this.max=res.data.data
        this.isLoading=false
      })
    }
  }
}
</script>

<style scoped lang="less">
.man-view {
  width: 100%;

}
.flex{
  flex:1
}
</style>
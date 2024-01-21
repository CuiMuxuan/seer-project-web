<template>
  <el-descriptions
      :column="2"
      size="small"
      border
  >
    <el-descriptions-item align="center" label-align="center" label="攻击">{{
        character.attack
      }}
    </el-descriptions-item>
    <el-descriptions-item align="center" label-align="center" label="防御">{{ character.defense }}
    </el-descriptions-item>
    <el-descriptions-item align="center" label-align="center" label="生命">{{ character.life }}
    </el-descriptions-item>
    <el-descriptions-item align="center" label-align="center" label="速度">{{ character.speed }}
    </el-descriptions-item>
    <el-descriptions-item align="center" label-align="center" label="暴击">{{ character.crit }}%
    </el-descriptions-item>
    <el-descriptions-item align="center" label-align="center" label="暴伤">
      {{ character.criticalDamage }}%
    </el-descriptions-item>
    <el-descriptions-item align="center" label-align="center" label="精准">{{ character.precision }}%
    </el-descriptions-item>
    <el-descriptions-item align="center" label-align="center" label="抵抗">{{ character.resistance }}%
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: "Talent",
  props:{
    character:{
      type:Object,
      default:()=>{
        return {
          attack: 0,
          defense: 0,
          life: 0,
          speed: 0,
          crit: 0,
          criticalDamage: 0,
          precision: 0,
          resistance: 0
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
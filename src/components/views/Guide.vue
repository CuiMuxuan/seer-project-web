<template>
  <div class="man-view" v-loading.fullscreen.lock="isLoading" :element-loading-spinner="this.$loadingSvg"
       element-loading-text="我知道你很急，但是你先别急">
    <Character @changeCharacter="changeCharacter"></Character>
    <el-divider>
      {{ this.message }}
    </el-divider>
    <div v-if="show">
      <div v-if="!isLoading">
        <el-descriptions
            :column="2"
            size="large"
            border
        >
          <el-descriptions-item align="left" label-align="center" label="综合评价" span="2">
            {{ characterGuide.overallEvaluation }}
          </el-descriptions-item>
          <el-descriptions-item align="center" label-align="center" label="创建时间">
            {{ new Date(characterGuide.createTime).toLocaleString('zh-CN', {hour12: false}).replace(/\//g, '-').replace('上午', '').replace('下午', '') }}
          </el-descriptions-item>
          <el-descriptions-item align="center" label-align="center" label="更新时间">
            {{ new Date(characterGuide.updateTime).toLocaleString('zh-CN', {hour12: false}).replace(/\//g, '-').replace('上午', '').replace('下午', '') }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <el-divider>
        养成方案
      </el-divider>
      <el-tabs v-if="showScheme" type="border-card" style="margin-top: 1%">
        <el-tab-pane v-for="item in characterSchemeList" :key="item.id" :label="item.name">
          <Scheme :scheme="item"></Scheme>
        </el-tab-pane>
      </el-tabs>
      <div v-else class="flex content-center">
        <el-empty description="空空如也"  :image-size="100"/>
      </div>
    </div>
    <div style="height: 64px" class="custom-center">
      <el-link href="https://space.bilibili.com/589465087" type="primary" :icon="Pointer">作者的其它视频攻略</el-link>
    </div>
  </div>
</template>
<script>
import Character from "../guide/Character.vue";
import Scheme from "../guide/Scheme.vue";
import {Pointer} from "@element-plus/icons-vue";

export default {
  name: "guide",
  computed: {
    Pointer() {
      return Pointer
    }
  },
  components: {
    Character,
    Scheme
  },
  data() {
    return {
      show: false,
      showScheme: false,
      isLoading: true,
      message: '角色攻略',
      characterGuide: {
        id: 0,
        introduction: "string",
        overallEvaluation: "string",
        recommendedStarLevel: 0,
        additionalExplanation: "string",
        createTime: "2024-01-17T11:58:32.000+00:00",
        updateTime: "2024-01-17T12:50:04.000+00:00"
      },
      characterSchemeList: [
        {
          id: 1,
          characterId: 0,
          name: "test",
          applicableGameplay: "test",
          schemeDescription: "test",
          recommendedEngraving: "test",
          passable: {
            attack: 1000,
            crit: 0,
            criticalDamage: 0,
            defense: 0,
            life: 0,
            precision: 0,
            resistance: 0,
            speed: 0
          },
          excellent: {
            attack: 0,
            crit: 0,
            criticalDamage: 0,
            defense: 0,
            life: 0,
            precision: 0,
            resistance: 0,
            speed: 0
          },
          top: {attack: 0, crit: 0, criticalDamage: 0, defense: 0, life: 0, precision: 0, resistance: 0, speed: 0},
          talentPoints: "test",
          skillPoints: "test",
          engraving123: "test",
          engraving4: "test",
          engraving5: "test"
        }
      ]
    }
  },
  methods: {
    changeCharacter(e) {
      this.character = e.character
      this.getGuide()
    },
    getGuide() {
      this.$http.get("/characterGuide/getGuide/" + this.character.id).then(res => {
        if (res.data.status === 200) {
          this.message = "角色攻略"
          this.show = true
          this.characterGuide = res.data.data
          this.getSchemeList()
        } else if (res.data.status === 404) {
          this.message = "暂无攻略"
          this.show = false
        } else {
          this.message = "网络错误"
          this.show = false
        }
        this.isLoading = false
      })
    },
    getSchemeList() {
      this.$http.get("/characterGuide/getSchemeList/" + this.character.id).then(res => {
        this.characterSchemeList = res.data.data
        this.showScheme = this.characterSchemeList.length !== 0;
      })
    }
  }
}
</script>

<style scoped>
.man-view {
  width: 100%;

}

.flex {
  flex: 1
}

</style>
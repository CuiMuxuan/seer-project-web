<template>
  <div class="character">
    <div class="flex">
      <div class="demo-image__error" style="text-align: center">
        <div class="block">
          <el-image :src="'//'+characterVO.character.picture" fit="contain">
            <template #placeholder>
              <div class="image-slot">
                <el-icon class="is-loading">
                  <Loading/>
                </el-icon>
              </div>
            </template>
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <icon-picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </div>
    </div>
    <div class="flex" style="display: flex;flex-direction: column;margin-left: 1%">
      <div class="flex" style="display: flex;flex-direction: row">
        <div class="flex" style="display: flex;flex-direction: column">
          <div class="flex content-center">
            <el-text size="large" tag="b">{{ characterVO.character.name }}</el-text>
          </div>
          <div class="flex content-center">
            <el-text>
              <el-icon :size="16">
                <Position/>
              </el-icon>
              定位：{{ position }}
            </el-text>
          </div>
          <div class="flex content-center">
            <el-text>
              <el-icon :size="16">
                <Aim/>
              </el-icon>
              属性：{{ property }}
            </el-text>
          </div>
        </div>
        <div class="flex content-center" style="flex-direction: column">
          <Choose :list="list" :name-list="nameList" v-model:name="characterVO.character.name"
                  @changeCharacter="changeCharacter"></Choose>
          <el-text type="success">切换角色</el-text>
        </div>
      </div>
      <el-divider>
      </el-divider>
      <div v-if="show" class="flex">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="简介" style="display: flex" label-align="center">
            {{ characterGuide.introduction }}
          </el-descriptions-item>
          <el-descriptions-item label="推荐星级" style="display: flex" label-align="center">
            <el-rate v-model="characterGuide.recommendedStarLevel" disabled allow-half></el-rate>
          </el-descriptions-item>
          <el-descriptions-item label="额外说明" style="display: flex" label-align="center">
            {{ characterGuide.additionalExplanation }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-else class="flex content-center">
        <el-empty description="空空如也"  :image-size="100"/>
      </div>
    </div>
  </div>
</template>

<script>
import {Position, Loading, Aim} from "@element-plus/icons-vue";
import {Picture as IconPicture} from '@element-plus/icons-vue'
import Choose from "../button/Choose.vue";
import Talent from "../talent/Talent.vue";
import {ElLoading} from "element-plus";
// 加载中配置
export default {
  name: "Character",
  components: {
    Aim,
    IconPicture,
    Position,
    Loading,
    Choose,
    Talent
  },
  created() {
    this.getCharacter()
    this.getList()
  },
  data() {
    return {
      position: '',
      property: '',
      show: false,
      list: [],
      nameList: [],
      characterVO: {
        id: 0,
        character: {
          id: 1,
          name: "name",
          position: 0,
          attack: 0,
          defense: 0,
          life: 0,
          speed: 0,
          crit: 0,
          criticalDamage: 0,
          precision: 0,
          resistance: 0,
          picture: "",
          property: "c"
        },
        soul: {
          attack: 0,
          defense: 0,
          life: 0,
          speed: 0,
          crit: 0,
          criticalDamage: 0,
          precision: 0,
          resistance: 0,
        },
        talent: {
          attack: 0,
          defense: 0,
          life: 0,
          speed: 0,
          crit: 0,
          criticalDamage: 0,
          precision: 0,
          resistance: 0,
        }
      },
      characterGuide: {
        id: 0,
        introduction: "string",
        overallEvaluation: "string",
        recommendedStarLevel: 4.5,
        additionalExplanation: "string",
        createTime: "2024-01-17T11:58:32.000+00:00",
        updateTime: "2024-01-17T12:50:04.000+00:00"
      },
      propertyMap: [
        {label: '水', value: "s", suppress: ["h", "dm"], weak: ["s", "c", "sl", "zr"]},
        {label: '火', value: "h", suppress: ["c", "jx", "b"], weak: ["s", "h", "sl", "zr"]},
        {label: '草', value: "c", suppress: ["s", "dm", "g"], weak: ["h", "c", "fx", "jx", "sl", "yg"]},
        {label: '飞行', value: "fx", suppress: ["c", "zd"], weak: ["d", "jx", "cy", "xl", "zr"]},
        {label: '电', value: "d", suppress: ["s", "fx", "a", "cy"], weak: ["c", "d", "dm", "sm", "sl", "zr"]},

        {label: '地面', value: "dm", suppress: ["h", "d", "jx"], weak: ["c", "fx", "cn", "a", "l", "sl"]},
        {label: '机械', value: "jx", suppress: ["b", "zd", "yg", "xl"], weak: ["s", "h", "d", "jx", "cy"]},
        {label: '普通', value: "pt", suppress: [], weak: []},
        {label: '冰', value: "b", suppress: ["c", "fx", "dm", "cy", "yg"], weak: ["s", "h", "jx", "b", "sl"]},
        {label: '超能', value: "cn", suppress: ["zd", "sm", "zr"], weak: ["jx", "cn", "g"]},

        {label: '战斗', value: "zd", suppress: ["jx", "b", "l", "sl"], weak: ["cn", "zd", "a"]},
        {label: '光', value: "g", suppress: ["cn", "a"], weak: ["c", "jx", "b", "g", "sl", "xl"]},
        {label: '暗', value: "a", suppress: ["cn", "a", "cy"], weak: ["jx", "b", "g", "sl", "xl"]},
        {label: '龙', value: "l", suppress: ["b", "l", "sl", "xl"], weak: ["s", "h", "c", "d", "yg"]},
        {label: '神秘', value: "sm", suppress: ["d", "sm", "sl", "zr"], weak: ["dm", "zd", "yg", "xl"]},

        {label: '圣灵', value: "sl", suppress: ["s", "h", "c", "d", "b", "yg"], weak: ["zd", "l", "sm"]},
        {label: '次元', value: "cy", suppress: ["fx", "jx", "cn", "xl", "zr"], weak: ["b", "a"]},
        {label: '远古', value: "yg", suppress: ["c", "fx", "l", "sm"], weak: ["jx", "b"]},
        {label: '邪灵', value: "xl", suppress: ["g", "a", "sm", "cy", "zr"], weak: ["jx", "b", "cn", "sl"]},
        {
          label: '自然',
          value: "zr",
          suppress: ["s", "h", "c", "fx", "d", "dm", "g"],
          weak: ["jx", "cn", "zd", "a", "sm", "cy", "xl"]
        }
      ],
    }
  },
  emits: ['changeCharacter'],
  methods: {
    getPosition() {
      switch (this.characterVO.character.position) {
        case 0:
          return "进攻";
        case 1:
          return "防御";
        case 2:
          return "干扰";
        case 3:
          return "辅助";
      }
    },
    getProperty() {
      return this.propertyMap.find(item => item.value === this.characterVO.character.property).label
    },
    changeCharacter(name) {
      const options = {
        fullscreen: false,
        lock: false,
        text: '加载中',
        spinner: this.$loadingSvg,
        background: 'rgba(255, 255, 255, 0.7)',
      }
      const loadingInstance = ElLoading.service(options)
      this.$http({
        method: 'get',
        url: '/character/getCharacterByName/' + name,
      }).then(res => {
        this.characterVO = res.data.data
        this.$route.params.id= this.characterVO.id
        this.$router.push({path: '/guide/' + this.characterVO.id})
        this.getCharacter()
        loadingInstance.close()
      })
    },
    getCharacter() {
      this.$http(this.generateConfig()).then(res => {
        if (res.data.status === 200) {
          this.characterGuide=res.data.data
          this.show = true
        }else {
          this.show = false
        }
      })
    },
    generateConfig() {
      this.$http.get("/character/getCharacterById/" + this.$route.params.id).then(res => {
        this.characterVO = res.data.data
        this.$emit('changeCharacter', res.data.data)
        this.position = this.getPosition()
        this.property = this.getProperty()

      })
      return {
        method: 'get',
        url: '/characterGuide/getGuide/' + this.$route.params.id,
      }
    },
    getList() {
      this.$http.get('/character/getAllName').then(res => {
        let length = res.data.data.length
        for (let i = 0; i < length; i++) {
          this.nameList.push(res.data.data[i].name)
        }
        for (let i = 0; i < length; i += 3) {
          let obj = {}
          obj.name1 = length - i > 0 ? res.data.data[i].name : ''
          obj.name2 = length - i - 1 > 0 ? res.data.data[i + 1].name : ''
          obj.name3 = length - i - 2 > 0 ? res.data.data[i + 2].name : ''
          this.list.push(obj)
        }
      })
    }
  }
}
</script>
<style scoped>
.demo-image__error .block {
  text-align: center;
  display: inline-block;
  width: 100%;
  max-height: 310px;
  box-sizing: border-box;
  vertical-align: top;
  aspect-ratio: 3/4;
}

.demo-image__error {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.demo-image__error .el-image {
  max-width: 300px;
  aspect-ratio: 3/4;
}

.el-image {
  width: 100%;
  height: 100%;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.character {
  display: flex;
}

.flex {
  flex: 1;
}

/*垂直居中*/
.content-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-icon {
  font-size: 30px;
}
</style>
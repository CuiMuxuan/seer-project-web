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
        </div>
        <div class="flex content-center" style="flex-direction: column">
          <Choose :list="list" :name-list="nameList" v-model:name="characterVO.character.name" @changeCharacter="changeCharacter"></Choose>
          <el-text type="success">切换角色</el-text>
        </div>
      </div>
      <el-divider>
        天赋
      </el-divider>
      <div class="flex">
        <Talent :character="this.characterVO.talent"></Talent>
      </div>
      <el-button v-if="!this.guide===false" type="info" disabled>暂无攻略</el-button>
      <el-button v-else type="success" @click="toGuide">角色攻略</el-button>
    </div>
  </div>
</template>

<script>
import {Position, Loading} from "@element-plus/icons-vue";
import {Picture as IconPicture} from '@element-plus/icons-vue'
import Choose from "../button/Choose.vue";
import Talent from "../talent/Talent.vue";
import {ElLoading} from "element-plus";
// 加载中配置
export default {
  name: "Character",
  components: {
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
      guide:false,
      list: [],
      nameList: [],
      characterVO: {
        id: 1,
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
          picture: ""
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
      }
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
    changeCharacter(name) {
      const options = {
        fullscreen: false,
        lock: false,
        text: '加载中',
        spinner: this.$loadingSvg,
        background: 'rgba(255, 255, 255, 0.7)',
      }
      const loadingInstance = ElLoading.service(options)
      this.$http(this.generateConfig('Name', name)).then(res => {
        this.characterVO = res.data.data
        this.$emit('changeCharacter', res.data.data)
        this.position = this.getPosition()
        loadingInstance.close()
      })
    }
    ,
    getCharacter() {
      let id = this.getRandomInt(1, 59)
      if(id===3){
        id=2
      }
      if (id===50){
        id=49
      }
      this.$http(this.generateConfig('Id', id)).then(res => {
        this.characterVO = res.data.data
        this.$emit('changeCharacter', res.data.data)
        this.position = this.getPosition()
      })
    }
    ,
    generateConfig(e, data) {
      return {
        method: 'get',
        url: '/character/getCharacterBy' + e + '/' + data,
      }
    }
    ,
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
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
    },
    toGuide(){
      this.$router.push({path:'/guide/'+this.characterVO.id})
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
<template>
  <el-tabs type="border-card" v-model="activeName" class="custom-tabs" :stretch="true">
    <el-tab-pane label="选择我方角色" name="templateCharacter">
      <div class="flex-display-row">
        <div class="flex-one flex-display-column">
          <!--      选择角色-->
          <el-select class="flex-one custom-center"
                     v-model="currentCharacter" placeholder="选择角色" @change="characterChange">
            <el-option
                v-for="item in characterList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
          <br/>
          <el-text class="flex-one">角色属性：{{ this.characterProperty }}</el-text>
          <br/>
          <el-text class="flex-one">角色定位：{{ this.getPosition(this.characterPosition) }}</el-text>
          <br/>
          <div class="flex-one custom-center">
            <el-select v-model="soulLevel" placeholder="魂印等级">
              <el-option :key="1" label="魂印Lv1" :value="1"/>
              <el-option :key="2" label="魂印Lv2" :value="2"/>
              <el-option :key="3" label="魂印Lv3" :value="3"/>
              <el-option :key="4" label="魂印Lv4" :value="4"/>
              <el-option :key="5" label="魂印Lv5" :value="5"/>
              <el-option :key="6" label="魂印Lv6" :value="6"/>
            </el-select>
          </div>
          <br/>
          <div class="flex-one custom-center">
            <el-text>天赋：</el-text>
            <el-switch
                v-model="useTalent"
                class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                active-text="开启"
                inactive-text="关闭"
            />
          </div>
        </div>
        <div class="flex-one">
          <div class="demo-image__error" style="text-align: center">
            <div class="block">
              <el-image :src="'//'+characterPicture" fit="contain">
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
      </div>
      <Talent :character="this.characterTalent"></Talent>
      <el-divider>角色技能</el-divider>
      <div v-if="skillList.length===0">
        <el-text type="info" class="custom-center">请选择角色</el-text>
      </div>
      <div class="occupy" v-if="skillList.length!==0">
        <div class="flex-display-row">
          <el-text type="primary" class="flex-one">{{ this.skillOne.name }}</el-text>
          <el-text class="flex-one">威力：
            <el-text type="primary">{{ this.skillOne.power }}</el-text>
          </el-text>
          <el-text class="flex-one">系数：
            <el-text type="primary">{{ this.skillOne.pow }}</el-text>
          </el-text>
        </div>
        <el-radio-group v-model="skillOneLevel" @change="skillOneChange">
          <el-radio v-for="item in skillList[0].map" :label="item.level">lv{{ item.level }}</el-radio>
        </el-radio-group>
        <br/>
        <el-text type="info">{{ this.skillOne.description }}</el-text>
        <br/>
        <div class="flex-display-row">
          <el-text type="primary" class="flex-one">{{ this.skillTwo.name }}</el-text>
          <el-text class="flex-one">威力：
            <el-text type="primary">{{ this.skillTwo.power }}</el-text>
          </el-text>
          <el-text class="flex-one">系数：
            <el-text type="primary">{{ this.skillTwo.pow }}</el-text>
          </el-text>
        </div>
        <el-radio-group v-model="skillTwoLevel" @change="skillTwoChange">
          <el-radio v-for="item in skillList[1].map" :label="item.level">lv{{ item.level }}</el-radio>
        </el-radio-group>
        <br/>
        <el-text type="info">{{ this.skillTwo.description }}</el-text>
        <br/>
        <div class="flex-display-row">
          <el-text type="primary" class="flex-one">{{ this.skillThree.name }}</el-text>
          <el-text class="flex-one">威力：
            <el-text type="primary">{{ this.skillThree.power }}</el-text>
          </el-text>
          <el-text class="flex-one">系数：
            <el-text type="primary">{{ this.skillThree.pow }}</el-text>
          </el-text>
        </div>
        <el-radio-group v-model="skillThreeLevel" @change="skillThreeChange">
          <el-radio v-for="item in skillList[2].map" :label="item.level">lv{{ item.level }}</el-radio>
        </el-radio-group>
        <br/>
        <el-text type="info">{{ this.skillThree.description }}</el-text>
        <br/>
        <el-text>使用技能：</el-text>
        <el-radio-group v-model="useSkill">
          <el-radio :label="1" :disabled="this.skillOne.isActive!==1">{{ this.skillOne.name }}</el-radio>
          <el-radio :label="2" :disabled="this.skillTwo.isActive!==1">{{ this.skillTwo.name }}</el-radio>
          <el-radio :label="3" :disabled="this.skillThree.isActive!==1">{{ this.skillThree.name }}</el-radio>
        </el-radio-group>
      </div>
      <el-divider>角色数值</el-divider>
      <div class="slider-block">
        <el-text class="slider-numerical-value">攻击：</el-text>
        <el-slider v-model="attack" show-input :min="this.characterMin.attack" :max="this.characterMax.attack"/>
      </div>
      <div class="slider-block">
        <el-text class="slider-numerical-value">防御：</el-text>
        <el-slider v-model="defense" show-input :min="this.characterMin.defense" :max="this.characterMax.defense"/>
      </div>
      <div class="slider-block">
        <el-text class="slider-numerical-value">生命：</el-text>
        <el-slider v-model="totalLife" show-input :min="this.characterMin.totalLife"
                   :max="this.characterMax.totalLife"/>
      </div>
      <div class="slider-block">
        <el-text class="slider-numerical-value">当前生命：</el-text>
        <el-slider v-model="currentLife" show-input :min="1" :max="this.totalLife"/>
      </div>
      <div class="slider-block">
        <el-text class="slider-numerical-value">速度：</el-text>
        <el-slider v-model="speed" show-input :min="this.characterMin.speed" :max="this.characterMax.speed"/>
      </div>
      <div class="slider-block">
        <el-text class="slider-numerical-value">暴伤：</el-text>
        <el-slider v-model="criticalDamage" show-input :min="this.characterMin.criticalDamage"
                   :max="this.characterMax.criticalDamage"/>
      </div>
      <el-divider>
        <el-text>暴击：</el-text>
        <el-switch
            v-model="isCrit"
            class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="是"
            inactive-text="否"
        />
      </el-divider>
      <el-divider>
        触发刻印
      </el-divider>
      <el-radio-group v-model="useImprint">
        <el-radio v-for="imprint in imprints" :key="imprint.id" :label="imprint.id">{{
            imprint.name
          }}
        </el-radio>
      </el-radio-group>
      <el-divider>
        角色状态
      </el-divider>
      <el-checkbox-group v-model="characterBuff.list" :min="0" :max="characterBuff.maxNumber">
        <el-checkbox v-for="buff in buffList" :key="buff.id" :label="buff.id"
                     :disabled="buff.isExclusive!==0&&this.characterBase.id!==buff.isExclusive">
          <el-tooltip :content="buff.meaning" placement="top" effect="light">
            <el-text>{{ buff.name }}</el-text>
          </el-tooltip>
        </el-checkbox>
      </el-checkbox-group>
    </el-tab-pane>
    <el-tab-pane label="选择敌方角色" name="templateEnemy">
      <div class="flex-display-row">
        <div class="flex-one flex-display-column">
          <!--      选择角色-->
          <el-select class="flex-one custom-center"
                     v-model="currentEnemy" placeholder="选择角色">
            <el-option
                v-for="item in enemyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
          <br/>
          <el-text class="flex-one">角色属性：{{ this.propertyMap.find(item => item.value === this.enemy.property).label }}
          </el-text>
          <br/>
          <el-text class="flex-one">角色定位：{{ this.getPosition(this.enemy.position) }}</el-text>
          <br/>
          <div class="flex-one custom-center">
            <el-text>天赋：</el-text>
            <el-switch
                v-model="useEnemyTalent"
                class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                active-text="开启"
                inactive-text="关闭"
            />
          </div>
          <div class="flex-one custom-center">
            <el-text>是否已出手：</el-text>
            <el-switch
                v-model="enemyStatus"
                class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                active-text="是"
                inactive-text="否"
            />
          </div>
        </div>
        <div class="flex-one">
          <div class="demo-image__error" style="text-align: center">
            <div class="block">
              <el-image :src="'//'+this.enemy.picture" fit="contain">
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
      </div>
      <el-divider>角色数值</el-divider>
      <div class="slider-block">
        <el-text class="slider-numerical-value">防御：</el-text>
        <el-slider v-model="enemy.defense" show-input :min="50" :max="4000"/>
      </div>
      <div class="slider-block">
        <el-text class="slider-numerical-value">生命：</el-text>
        <el-slider v-model="enemy.totalLife" show-input :min="500" :max="5000"/>
      </div>
      <div class="slider-block">
        <el-text class="slider-numerical-value">当前生命：</el-text>
        <el-slider v-model="enemy.currentLife" show-input :min="1" :max="this.enemy.totalLife"/>
      </div>
      <el-divider>
        刻印套系
      </el-divider>
      <el-radio-group v-model="useEnemyImprint">
        <el-radio v-for="imprint in imprints" :key="imprint.id" :label="imprint.id">{{
            imprint.name
          }}
        </el-radio>
      </el-radio-group>
      <el-divider>
        角色状态
      </el-divider>
      <el-checkbox-group v-model="enemyBuff.list" :min="0" :max="enemyBuff.maxNumber">
        <el-checkbox v-for="buff in buffList" :key="buff.id" :label="buff.id"
                     :disabled="buff.isExclusive!==0&&this.characterBase.id!==buff.isExclusive&&buff.type>=0">
          <el-tooltip :content="buff.meaning" placement="top" effect="light">
            <el-text>{{ buff.name }}</el-text>
          </el-tooltip>
        </el-checkbox>
      </el-checkbox-group>
    </el-tab-pane>
    <el-tab-pane label="自定义计算" name="customCompute">
      <CustomCompute></CustomCompute>
    </el-tab-pane>
    <el-divider>
      战场狂热
    </el-divider>
    <el-radio-group v-model="crazeLevel" class="custom-center">
      <el-radio v-for="c in craze" :key="c.level" :label="c.level">{{
          'Lv'+c.level
        }}</el-radio>
    </el-radio-group>
    <el-divider></el-divider>
    <div class="custom-center">
      <ButtonBatman msg="计算伤害" @click="computeDamage"></ButtonBatman>
    </div>
  </el-tabs>
</template>

<script>
import {Loading, Picture as IconPicture, Position} from "@element-plus/icons-vue";
import Talent from "../talent/Talent.vue";
import ButtonBatman from "../button/ButtonBatman.vue";
import CustomCompute from "./CustomCompute.vue";
import {ElLoading, ElMessageBox} from "element-plus";

export default {
  name: "CharacterCompute.vue",
  components: {
    IconPicture,
    Position,
    Loading,
    Talent,
    ButtonBatman,
    CustomCompute
  },
  data() {
    return {
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
      currentCharacter: '',
      currentEnemy: 1,
      activeName: 'templateCharacter',
      characterList: [],
      enemyList: [
        {
          id: 1, name: '假装是阿潘', picture: 'image.colorcollision.cn/base/64cf1c0b5fa6ed7585c72f5b.jpg',
          property: 'pt', position: 1, defense: 800,
          totalLife: 2000,
          currentLife: 2000,
        },
        {
          id: 2, name: '假装是哈莫', picture: 'image.colorcollision.cn/base/64cf1c0b5fa6ed7585c72f5b.jpg',
          property: 'l', position: 1, defense: 1000,
          totalLife: 3600,
          currentLife: 3600,
        },
        {
          id: 3, name: '假装是托鲁克', picture: 'image.colorcollision.cn/base/64cf1c0b5fa6ed7585c72f5b.jpg',
          property: 'fx', position: 2, defense: 700,
          totalLife: 1800,
          currentLife: 1800,
        },
        {
          id: 4, name: '假装是始祖', picture: 'image.colorcollision.cn/base/64cf1c0b5fa6ed7585c72f5b.jpg',
          property: 'c', position: 3, defense: 800,
          totalLife: 2500,
          currentLife: 2500,
        },
        {
          id: 5, name: '假装是天邪', picture: 'image.colorcollision.cn/base/64cf1c0b5fa6ed7585c72f5b.jpg',
          property: 'xl', position: 2, defense: 700,
          totalLife: 3000,
          currentLife: 3000,
        },
      ],
      characterPicture: '',
      characterProperty: '未知',
      characterPosition: '未知',
      characterTalent: {
        attack: 0,
        defense: 0,
        life: 0,
        speed: 0,
        crit: 0,
        criticalDamage: 0,
        precision: 0,
        resistance: 0
      },
      characterBase: {},
      characterMin: {
        attack: 0,
        defense: 0,
        totalLife: 0,
        speed: 0,
        criticalDamage: 0,
      },
      characterMax: {
        attack: 9999,
        defense: 9999,
        totalLife: 9999,
        speed: 999,
        criticalDamage: 999,
      },
      characterBuff: {
        debuffNumber: 0,
        buffNumber: 0,
        number: 0,
        maxNumber: 8,
        debuffExist: 0,
        buffExist: 0,
        list: []
      },
      enemyBuff: {
        debuffNumber: 0,
        buffNumber: 0,
        number: 0,
        maxNumber: 8,
        debuffExist: 0,
        buffExist: 0,
        list: []
      },
      skillList: [],
      soulList: [],
      character: {},
      enemy: {
        id: 1, name: '假装是阿潘', picture: 'image.colorcollision.cn/base/64cf1c0b5fa6ed7585c72f5b.jpg',
        property: 'pt', position: 1, defense: 800,
        totalLife: 2000,
        currentLife: 2000
      },
      enemyStatus: false,
      soulLevel: 1,
      useTalent: false,
      useEnemyTalent: false,
      useSoul: {},
      useEnemySoul: {},
      useImprint: 0,
      useEnemyImprint: 0,
      useSkill: 1,
      isCrit: true,
      skillOne: {},
      skillOneLevel: 1,
      skillTwo: {},
      skillTwoLevel: 1,
      skillThree: {},
      skillThreeLevel: 1,
      attack: 999,
      defense: 999,
      totalLife: 999,
      currentLife: 99,
      speed: 99,
      criticalDamage: 99,
      imprints: [
        {id: 0, name: '无', prop: "", propZh: ""},
        {id: 1, name: '守护者', prop: "attack", propZh: "攻击+25%", powerIncrease: {'enemy#buff_debuffExist=>1': 0.35}},
        {id: 2, name: '荣耀与责任', prop: "attack", propZh: "攻击+25%", powerIncrease: {'status#=>true': 0.4}},
        {id: 3, name: '蜕变', prop: "attack", propZh: "攻击+25%", powerIncrease: {'enemy#currentLife_more=>0.6': 0.3}},
        {id: 4, name: '强者之证', prop: "crit", propZh: "暴击+10%", penetrate: {'isCrit#=>true': 0.25}},
        {id: 5, name: '终结者', prop: "crit", propZh: "暴击+10%", powerIncrease: {'enemy#currentLife_less=>0.4': 0.3}},
        {id: 6, name: '跨越生死', prop: "resistance", propZh: "抵抗+35%", powerIncrease: {base: 0.5}},
        {id: 7, name: '生于虚空', prop: "life", propZh: "生命+25%", damageIncrease: {'status#=>false': -0.25}}
      ],
      powerIncrease: [],
      addition: [],
      extra: [],
      penetrate: [],
      damageIncrease: [],
      result: 0,
      buffList: [],
      // chooseCharacter: 'template',
      // chooseEnemy: 'template',
      loading: {},
      specialStatus: {},
      specialStatusList: [],
      message: {
        base: 0,
        addition: 0,
        increase: 0,
        penetrate: 0,
        extra: 0,
        attack: 0,
        speed: 0
      },
      crazeLevel:0,
      craze:[
        {level:0,powerIncrease:{base:0}},
        {level:1,powerIncrease:{base:0.5}},
        {level:2,powerIncrease:{base:0.75}},
        {level:3,powerIncrease:{base:1}},
        {level:4,powerIncrease:{base:1.25}},
      ],
      extraRate:1
    };
  },
  watch: {
    useTalent(val) {
      this.getCharacterNumberByTalent(val)
    },
    soulLevel(new_val) {
      if (this.soulList.length !== 0) {
        let newSoul = this.generateSoul(this.soulList, new_val)
        let oldSoul = this.useSoul
        this.getCharacterNumberBySoul(newSoul.soulProperty, oldSoul.soulProperty)
        this.useSoul = newSoul
      }
    },
    currentEnemy(val) {
      this.enemy = this.enemyList.find(item => item.id === val)
    },
    'characterBuff.list'(val) {
      let buffNumber = 0
      let debuffNumber = 0
      for (let i in val) {
        this.buffList.forEach(item => {
          item.id === i && item.type === 1 ? buffNumber++ : debuffNumber++
        })
      }
      this.characterBuff.buffNumber = buffNumber
      this.characterBuff.debuffNumber = debuffNumber
      this.characterBuff.number = buffNumber + debuffNumber
      this.characterBuff.buffExist = buffNumber === 0 ? 0 : 1
      this.characterBuff.debuffExist = debuffNumber === 0 ? 0 : 1
    },
    'enemyBuff.list'(val) {
      let buffNumber = 0
      let debuffNumber = 0
      for (let i in val) {
        this.buffList.forEach(item => {
          item.id === i && item.type === 1 ? buffNumber++ : debuffNumber++
        })
      }
      this.enemyBuff.buffNumber = buffNumber
      this.enemyBuff.debuffNumber = debuffNumber
      this.enemyBuff.number = buffNumber + debuffNumber
      this.enemyBuff.buffExist = buffNumber === 0 ? 0 : 1
      this.enemyBuff.debuffExist = debuffNumber === 0 ? 0 : 1
    },
  },
  created() {
    this.getCharacterList()
    this.getBuffList()
    this.getSpecialStatusList()
  },
  methods: {
    getBuffList() {
      this.$http.get('/damage/getBuffList').then((res) => {
        this.buffList = res.data.data
      })
    },
    getSpecialStatusList() {
      this.$http.get('/damage/getSpecialStatusList').then((res) => {
        this.specialStatusList = res.data.data
      })
    },
    getPosition(position) {
      let result = '未知'
      switch (position) {
        case 0:
          result = "进攻"
          break
        case 1:
          result = "防御";
          break
        case 2:
          result = "干扰";
          break
        case 3:
          result = "辅助";
          break
      }
      return result
    },
    getCharacterList() {
      this.loadingOpen()
      this.$http.get('/damage/getCharacterIsExistPlus').then((res) => {
        this.characterList = res.data.data
        this.loadingClose()
      })
    },
    characterChange(id) {
      this.loadingOpen()
      this.characterPicture = this.characterList.find(item => item.id === id).picture
      this.$http.get('/damage/getCharacterPlusByCharacterId/' + id).then((res) => {
        this.character = res.data.data
        this.characterProperty = this.propertyMap.find(item => item.value === this.character.property).label
        this.skillList = this.character.skillList
        this.soulList = this.character.soulList
        this.skillOne = this.generateSkill(this.skillList[0], this.skillOneLevel)
        this.skillTwo = this.generateSkill(this.skillList[1], this.skillTwoLevel)
        this.skillThree = this.generateSkill(this.skillList[2], this.skillThreeLevel)
        this.useSoul = this.generateSoul(this.soulList, this.soulLevel)
        this.characterBuff.list=[]
        this.loadingClose()
      })
      this.$http({
        method: 'get',
        url: '/character/getCharacterById/' + id
      }).then(res => {
        this.characterBase = res.data.data.character
        this.getCharacterMax()
        this.characterTalent = res.data.data.talent
        this.characterPosition = this.characterBase.position
        this.characterMin.attack = this.characterBase.attack
        this.characterMin.defense = this.characterBase.defense
        this.characterMin.speed = this.characterBase.speed
        this.characterMin.criticalDamage = this.characterBase.criticalDamage
        this.characterMin.totalLife = this.characterBase.life
        this.currentLife = this.characterBase.life
        this.getCharacterNumberByTalent(this.useTalent)
        this.loadingClose()
      })
    },
    getCharacterNumberByTalent(val) {
      let dict = ["attack", "defense", "speed", "criticalDamage"]
      if (val) {
        dict.forEach((item) => {
          this.characterMin[item] = this.characterMin[item] + this.characterTalent[item]
          this.characterMax[item] = this.characterMax[item] + this.characterTalent[item]
        })
        this.characterMin.totalLife = this.characterMin.totalLife + this.characterTalent.life
        this.characterMax.totalLife = this.characterMax.totalLife + this.characterTalent.life
        this.currentLife = this.currentLife + this.characterTalent.life
      } else if (this.characterMin.attack !== this.characterBase.attack) {
        dict.forEach((item) => {
          this.characterMin[item] = this.characterMin[item] - this.characterTalent[item]
          this.characterMax[item] = this.characterMax[item] - this.characterTalent[item]
        })
        this.characterMin.totalLife = this.characterMin.totalLife - this.characterTalent.life
        this.characterMax.totalLife = this.characterMax.totalLife - this.characterTalent.life
        this.currentLife = this.currentLife - this.characterTalent.life
      }
    },
    getCharacterNumberBySoul(newSoulProperty, oldSoulProperty) {
      let dict = ["attack", "defense", "speed", "criticalDamage"]
      dict.forEach((item) => {
        this.characterMin[item] = this.characterMin[item] + newSoulProperty[item] - oldSoulProperty[item]
        this.characterMax[item] = this.characterMax[item] + newSoulProperty[item] - oldSoulProperty[item]
      })
      this.characterMin.totalLife = this.characterMin.totalLife + newSoulProperty.life - oldSoulProperty.life
      this.characterMax.totalLife = this.characterMax.totalLife + newSoulProperty.life - oldSoulProperty.life
      this.currentLife = this.currentLife + newSoulProperty.life - oldSoulProperty.life
    },
    getCharacterMax() {
      for (let i in this.characterMax) {
        switch (i) {
          case "attack":
            this.characterMax[i] = 935 + Math.ceil(this.characterBase[i] * 3.4)
            break
          case "defense":
            this.characterMax[i] = 470 + Math.ceil(this.characterBase[i] * 3.4)
            break
          case "speed":
            this.characterMax[i] = 155 + Math.ceil(this.characterBase[i] * 1.1)
            break
          case "criticalDamage":
            this.characterMax[i] = 130 + this.characterBase[i]
            break
        }
      }
      this.characterMax.totalLife = 1150 + Math.ceil(this.characterBase.life * 3.4)
    },
    skillOneChange(lv) {
      this.skillOne = this.generateSkill(this.skillList[0], lv)
    },
    skillTwoChange(lv) {
      this.skillTwo = this.generateSkill(this.skillList[1], lv)
    },
    skillThreeChange(lv) {
      this.skillThree = this.generateSkill(this.skillList[2], lv)
    },
    generateSkill(skillItem, lv) {
      let skillDamage = skillItem.map.find(item => item.level === lv)
      return {
        id: skillItem.id,
        name: skillItem.name,
        level: lv,
        description: skillDamage.description,
        pow: skillItem.pow,
        power: skillDamage.power,
        isActive: skillItem.isActive,
        isAoe: skillItem.isAoe,
        addition: skillDamage.addition,
        extra: skillDamage.extra,
        penetrate: skillDamage.penetrate,
        powerIncrease: skillDamage.powerIncrease
      }
    },
    generateSoul(soulItem, lv) {
      let soulDamage = soulItem.find(item => item.level === lv)
      let soulProperty = {
        attack: 0,
        defense: 0,
        life: 0,
        speed: 0,
        criticalDamage: 0,
      }
      for (let i in soulDamage.characterSoulDTO) {
        for (let c in this.characterBase) {
          if (i === c) {
            soulProperty[i] = Math.ceil(this.characterBase[c] * soulDamage.characterSoulDTO[i] / 100)
          }
        }
      }
      return {
        level: lv,
        addition: soulDamage.addition,
        extra: soulDamage.extra,
        penetrate: soulDamage.penetrate,
        powerIncrease: soulDamage.powerIncrease,
        soulProperty: soulProperty
      }
    },
    generateUseSkill() {
      let result = {}
      switch (this.useSkill) {
        case 1:
          result = this.skillOne
          break
        case 2:
          result = this.skillTwo
          break
        case 3:
          result = this.skillThree
          break
      }
      return result
    },
    generatePenetrate(obj) {
      if ('penetrate' in obj) {
        for (let i in obj.penetrate) {
          if (i !== 'default') {
            this.penetrate.push({[i]: obj.penetrate[i]})
          }
        }
      }
    },
    generatePowerIncrease(obj) {
      if ('powerIncrease' in obj) {
        for (let i in obj.powerIncrease) {
          if (i !== 'default') {
            this.powerIncrease.push({[i]: obj.powerIncrease[i]})
          }
        }
      }
    },
    generateAddition(obj) {
      if ('addition' in obj) {
        if (JSON.stringify(obj.addition) !== "{}") {
          this.addition.push(obj.addition)
        }
      }
    },
    generateExtra(obj) {
      if ('extra' in obj) {
        if (JSON.stringify(obj.extra) !== "{}") {
          this.extra.push(obj.extra)
        }
      }
    },
    generateDamageIncrease(obj) {
      if ('damageIncrease' in obj) {
        for (let i in obj.damageIncrease) {
          if (i !== 'default') {
            this.damageIncrease.push({[i]: obj.damageIncrease[i]})
          }
        }
      }
    },
    generateDamageComposition(obj) {
      this.generateAddition(obj)
      this.generatePowerIncrease(obj)
      this.generateExtra(obj)
      this.generatePenetrate(obj)
      this.generateDamageIncrease(obj)
    },
    judgeCondition(condition) {
      let judge = false
      if (condition === "base") {
        judge = true
      }
      if (condition.includes("_or_")) {
        let conditionList = condition.split("_or_")
        conditionList.forEach(item => {
            judge = judge||this.judgeCondition(item)
        })
      } else if (condition.includes("#")) {
        let conditionList = condition.split("#")
        let conditionValue = conditionList[1]
        let conditionObject = conditionList[0]
        let conditionMap = conditionValue.split("=>")
        let key = conditionMap[0]
        let value = conditionMap[1]
        if (conditionObject === "self") {
          let keyList = key.split("_")
          let key1 = keyList[0]
          let key2 = keyList[1]
          if (key1 === 'buff') {
            if (key2 === 'id') {
              if (this.characterBuff.list.includes(parseInt(value))) {
                judge = true
              }
            } else if (this.characterBuff[key2] === parseInt(value)) {
              judge = true
            }
          } else {
            if (key1 === "currentLife") {
              if (key2 === "more") {
                if (this.currentLife / this.totalLife > parseFloat(value)) {
                  judge = true
                }
              } else if (key2 === "less") {
                if (this.currentLife / this.totalLife < parseFloat(value)) {
                  judge = true
                }
              }
            }
          }
        } else if (conditionObject === "enemy") {
          let keyList = key.split("_")
          let key1 = keyList[0]
          let key2 = keyList[1]
          if (key1 === 'buff') {
            if (key2 === 'id') {
              if (this.enemyBuff.list.includes(parseInt(value))) {
                judge = true
              }
            } else if (this.enemyBuff[key2] === parseInt(value)) {
              judge = true
            }
          } else {
            if (key1 === "currentLife") {
              if (key2 === "more") {
                if (this.enemy.currentLife / this.enemy.totalLife > parseFloat(value)) {
                  judge = true
                }
              } else if (key2 === "less") {
                if (this.enemy.currentLife / this.enemy.totalLife < parseFloat(value)) {
                  judge = true
                }
              }
            }
          }
        } else if (conditionObject === "skill") {
          if (this.generateUseSkill()[key] === parseInt(value)) {
            judge = true
          }
        } else if (conditionObject === "status") {
          if (this.enemyStatus.toString() === value) {
            judge = true
          }
        } else if (conditionObject === "isCrit") {
          if (this.isCrit.toString() === value) {
            judge = true
          }
        }
      }
      return judge
    },
    generateFightData(penetrate, powerIncrease, damageIncrease) {
      let finalPenetrate = 0
      let finalPowerIncrease = 1
      let finalDamageIncrease = 1
      let currentAttack = this.attack
      let currentSpeed = this.speed
      let criticalDamage = this.criticalDamage
      this.characterBuff.list.forEach(item => {
        let buff = this.buffList.find(buff => buff.id === item)
        if (buff.property === 'attack') {
          currentAttack = currentAttack + Math.ceil(buff.rate / 100 * this.attack * buff.type)
        }
        if (buff.property === 'speed') {
          currentSpeed = currentSpeed + Math.ceil(buff.rate / 100 * this.speed * buff.type)
        }
        if (buff.isExclusive !== 0) {
          let level = this.soulLevel
          let specialStatus = this.specialStatusList.find(item => item.relyId === buff.id && item.type === 'buff')
          let currentStatus = specialStatus.map.find(item => item.level === level)
          for (let i in currentStatus) {
            if (i === "attack") {
              currentAttack = currentAttack + Math.ceil(currentStatus[i] / 100 * this.attack)
            } else if (i === "speed") {
              currentSpeed = currentSpeed + Math.ceil(currentStatus[i] / 100 * this.speed)
            } else if (i === "criticalDamage") {
              criticalDamage = criticalDamage + currentStatus[i]
            }
          }
        }

      })
      //todo:遍历技能列表，查看是否有被动技能（isActive===0）
      let currentDefense = this.enemy.defense
      this.enemyBuff.list.forEach(item => {
        let buff = this.buffList.find(buff => buff.id === item)
        if (buff.property === 'defense') {
          currentDefense = currentDefense + Math.ceil(buff.rate / 100 * this.enemy.defense * buff.type)
        }
        if (buff.isExclusive === 1) {
          let level = this.soulLevel
        }
      })
      if (penetrate.length !== 0) {
        for (let i in penetrate) {
          for (let k in penetrate[i]) {
            if (this.judgeCondition(k)) {
              finalPenetrate = finalPenetrate >= penetrate[i][k] ? finalPenetrate : penetrate[i][k]
            }
          }
        }
      }
      if (powerIncrease.length !== 0) {
        for (let i in powerIncrease) {
          for (let k in powerIncrease[i]) {
            if (this.judgeCondition(k)) {
              finalPowerIncrease = finalPowerIncrease + powerIncrease[i][k]
            }
          }
        }
      }
      if (damageIncrease.length !== 0) {
        for (let i in damageIncrease) {
          for (let k in damageIncrease[i]) {
            if (this.judgeCondition(k)) {
              finalDamageIncrease = finalDamageIncrease + damageIncrease[i][k]
            }
          }
        }
      }
      if (this.characterPosition === 0 && this.useTalent) {
        finalDamageIncrease = finalDamageIncrease + 0.05
      }
      currentDefense = currentDefense - Math.ceil(currentDefense * finalPenetrate)
      let suppressRate = this.computeSuppressRate()
      let critRate = this.isCrit ? criticalDamage / 100 : 1
      let aoeRate = this.useSkill.isAoe === 1 ? 0.8 : 1
      this.message.increase = Math.ceil((finalDamageIncrease + finalPowerIncrease - 1) * 100) + "%"
      this.message.attack = currentAttack
      this.message.speed = currentSpeed
      this.message.penetrate = finalPenetrate * 100 + "%"
      return {
        damageIncrease: finalDamageIncrease,
        powerIncrease: finalPowerIncrease,
        increase: finalDamageIncrease + finalPowerIncrease - 1,
        suppressRate: suppressRate,
        critRate: critRate,
        aoeRate: aoeRate,
        attack: currentAttack,
        defense: currentDefense,
        speed: currentSpeed
      }
    },
    generateSpecialDamage(damageList, data) {
      let finalDamage = 0
      if (damageList.length !== 0) {
        damageList.forEach(item => {
          let damage = 0
          let condition = item.condition
          let judge = true
          for (let i in condition) {
            judge = judge && this.judgeCondition(condition[i])
          }
          if (judge) {
            if (item.object === 0) {
              if (item.property === "attack") {
                damage = data.attack * item.rate
              } else if (item.property === "speed") {
                damage = data.speed * item.rate
              } else if (item.property === "lostLife") {
                damage = (this.totalLife - this.currentLife) * item.rate
              } else if (item.property === "totalLife") {
                damage = this.totalLife * item.rate
              } else if (item.property === "currentLife") {
                damage = this.currentLife * item.rate
              } else if (item.property === "defense") {
                damage = this.defense * item.rate
              }
            } else {
              if (item.property === "defense") {
                damage = data.defense * item.rate
              } else if (item.property === "lostLife") {
                damage = (this.enemy.totalLife - this.enemy.currentLife) * item.rate
              } else {
                damage = this.enemy[item.property] * item.rate
              }
            }
            let isLimit
            if(typeof item.isLimit==='boolean'){
              isLimit=item.isLimit
            }else {
                isLimit=this.judgeCondition(item.isLimit)
            }
            if (isLimit) {
              let limit = 0
              if (item.limitObject === 0) {
                if (item.limitProperty === "attack") {
                  limit = data.attack * item.limitRate
                } else if (item.limitProperty === "speed") {
                  limit = data.speed * item.limitRate
                } else if (item.limitProperty === "lostLife") {
                  limit = (this.totalLife - this.currentLife) * item.limitRate
                } else if (item.limitProperty === "totalLife") {
                  limit = this.totalLife * item.limitRate
                } else if (item.limitProperty === "currentLife") {
                  limit = this.currentLife * item.limitRate
                } else if (item.limitProperty === "defense") {
                  limit = this.defense * item.limitRate
                }
              } else {
                if (item.limitProperty === "defense") {
                  limit = data.defense * item.limitRate
                } else if (item.limitProperty === "lostLife") {
                  limit = (this.enemy.totalLife - this.enemy.currentLife) * item.limitRate
                } else {
                  limit = this.enemy[item.limitProperty] * item.limitRate
                }
              }
              damage = damage >= limit ? limit : damage
            }
          }
          finalDamage=finalDamage+damage
        })
      }
      return Math.ceil(finalDamage)
    },
    computeSuppressRate() {
      let suppress = this.propertyMap.find(item => item.value === this.character.property).suppress
      let weak = this.propertyMap.find(item => item.value === this.character.property).weak
      if (suppress.includes(this.enemy.property)) {
        return 2
      }
      if (weak.includes(this.enemy.property)) {
        return 0.5
      }
      return 1
    },
    beforeDamage() {
      let useSkill = this.generateUseSkill()
      this.generateDamageComposition(useSkill)
      this.generateDamageComposition(this.useSoul)
      this.craze.forEach(craze=>{
        if (this.crazeLevel===craze.level){
          this.generatePowerIncrease(craze)
        }
      })
      let useImprint = this.imprints.find(item => item.id === this.useImprint)
      for (let i in useImprint) {
        if (i === "penetrate" || i === "powerIncrease") {
          for (let k in useImprint[i]) {
            if (this.judgeCondition(k)) {
              console.log(useImprint)
              this.generateDamageComposition(useImprint)
            }
          }
        }
      }
      let fightData = this.generateFightData(this.penetrate, this.powerIncrease, this.damageIncrease)
      let addition = this.generateSpecialDamage(this.addition, fightData)
      return {
        pow: useSkill.pow,
        power: useSkill.power,
        data: fightData,
        addition: addition
      }
    },
    computeRedDamage(data) {
      let damageDecrease = 1
      this.damageIncrease = []
      let useImprint = this.imprints.find(item => item.id === this.useEnemyImprint)
      for (let i in useImprint) {
        if (i === "damageIncrease") {
          for (let k in useImprint[i]) {
            if (this.judgeCondition(k)) {
              this.generateDamageComposition(useImprint)
            }
          }
        }
      }
      if (this.damageIncrease.length !== 0) {
        for (let i in this.damageIncrease) {
          for (let k in this.damageIncrease[i]) {
            if (this.judgeCondition(k)) {
              damageDecrease = 1 + this.damageIncrease[i][k]
            }
          }
        }
      }
      if (this.enemy.position !== 0 && this.useEnemyTalent) {
        damageDecrease = damageDecrease - 0.05
      }
      let baseDamage = Math.ceil(data.data.attack * (100 / (100 + data.data.defense)) * (data.power / 150) * data.pow * data.data.suppressRate * data.data.critRate * data.data.aoeRate * data.data.increase)
      this.message.base = baseDamage
      let additionDamage = data.addition
      this.message.addition = additionDamage
      this.message.decrease = ((1 - damageDecrease) * 100).toFixed(0) + "%"
      return Math.ceil((baseDamage + additionDamage) * damageDecrease)
    },
    afterDamage() {
      this.penetrate = []
      this.powerIncrease = []
      this.damageIncrease = []
      this.extra = []
      this.addition = []
    },
    computeDamage() {
      //判断character是否是空json对象
      if (JSON.stringify(this.character) === "{}") {
        this.$message({
          message: '请选择角色',
          type: 'warning'
        })
        return
      }
      this.loadingOpen()
      let damageData = this.beforeDamage()
      let redDamage = this.computeRedDamage(damageData)
      let signLife = this.enemy.currentLife
      this.enemy.currentLife = this.enemy.currentLife - redDamage >= 0 ? this.enemy.currentLife - redDamage : 0
      let yellowDamage = this.generateSpecialDamage(this.extra, damageData.data)
      this.message.extra = yellowDamage
      this.afterDamage()
      this.enemy.currentLife = signLife
      this.loadingClose()
      ElMessageBox.alert(
          '<div style="text-align: center">' +
          '<p>攻击：' + this.message.attack + '</p>' +
          '<p>速度：' + this.message.speed + '</p>' +
          '<p>穿透：' + this.message.penetrate + '</p>' +
          '<p>伤害增幅：' + this.message.increase + '</p>' +
          '<p>基础伤害：' + this.message.base + '</p>' +
          '<p>额外伤害：' + this.message.addition + '</p>' +
          '<p>伤害减免：' + this.message.decrease + '</p>' +
          '<p style="color:#c01818;">最终红伤：' + redDamage + '</p>' +
          '<p>附加伤害：' + this.message.extra + '</p>' +
          '<p style="color:#cbcb1a;">最终黄伤：' + yellowDamage + '</p>' +
          '<p><b>伤害总计：' + (yellowDamage+redDamage) + '</b></p>' +
          '</div>',
          '伤害计算结果',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            closeOnClickModal:true,
            closeOnPressEscape:true,

          }
      )
    },
    loadingOpen() {
      const options = {
        fullscreen: false,
        lock: false,
        text: '加载中',
        spinner: this.$loadingSvg,
        background: 'rgba(255, 255, 255, 0.7)',
      }
      this.loading = ElLoading.service(options)
    },
    loadingClose() {
      this.loading.close()
    },
    chooseChange(val) {
      this.chooseCharacter = val
      if(val==='custom'){
        ElMessageBox.alert(
            "还没做呢，年底再来吧！",
            '咕咕',
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确定',
              type: 'success'
            }
        )
        this.chooseCharacter = 'template'
      }
    },
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

.custom-tabs {
  width: 100%;
}

.slider-block {
  display: flex;
  align-items: center;
}

.el-slider .slider-block {
  margin-top: 0;
  margin-left: 12px;
}

.slider-block .slider-numerical-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-block .slider-numerical-value + .el-slider {
  flex: 0 0 80%;
}

.col-100 {
  width: 100%;
}

:deep(.is-top) {
  margin-bottom: 0;
}
</style>
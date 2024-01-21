<template xmlns="http://www.w3.org/1999/html">
  <div class="custom-center">
    <el-button text @click="open">了解一下？</el-button>
  </div>
  <el-divider>攻击方属性</el-divider>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">攻击值</el-text>
    <el-input-number v-model="attack" controls-position="right" :min="0" :max="5000" :step="2"
                     size="small"/>
    <el-text class="flex-one custom-center">速度值</el-text>
    <el-input-number v-model="speed" controls-position="right" :min="100" :max="10000" :step="100"
                     size="small"/>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">当前生命</el-text>
    <el-input-number v-model="attackCurrentHealth" controls-position="right" :min="1"
                     :max="attackTotalHealth" :step="10" size="small"/>
    <el-text class="flex-one custom-center">总生命</el-text>
    <el-input-number v-model="attackTotalHealth" controls-position="right" :min="10" :max="10000"
                     :step="100" size="small"/>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">暴伤</el-text>
    <el-input-number v-model="critDamage" controls-position="right" :min="150" :max="1000" :step="10" size="small"/>
    <el-text class="flex-one custom-center">伤害提升</el-text>
    <el-input-number v-model="damageIncrease" controls-position="right" :min="0" :max="1000" :step="5" size="small"/>
  </el-row>
  <el-divider>防守方属性</el-divider>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">防御值</el-text>
    <el-input-number v-model="defense" controls-position="right" :min="0" :max="1000000" :step="100" size="small"/>
    <el-text class="flex-one custom-center">当前生命</el-text>
    <el-input-number v-model="currentHealth" controls-position="right" :min="1" :max="totalHealth" :step="10"
                     size="small"/>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">总生命</el-text>
    <el-input-number v-model="totalHealth" controls-position="right" :min="10" :max="10000" :step="100" size="small"/>
    <el-text class="flex-one custom-center">伤害减免</el-text>
    <el-input-number v-model="damageDecrease" controls-position="right" :min="0" :max="1000" :step="1" step-strictly
                     size="small"/>
  </el-row>
  <el-divider>其它参数</el-divider>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">技能pow比率</el-text>
    <el-input-number v-model="skillPowRatio" :precision="2" controls-position="right" :min="0" :max="2" :step="0.01"
                     size="small"/>
    <el-text class="flex-one custom-center">技能威力</el-text>
    <el-input-number v-model="skillPow" controls-position="right" :min="0" :max="200" :step="5" step-strictly
                     size="small"/>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">贯穿防御</el-text>
    <el-input-number v-model="penetrateDefense" controls-position="right" :min="0" :max="100" :step="1" step-strictly
                     size="small"/>
    <el-text class="flex-one custom-center">属性倍率</el-text>
    <el-radio-group class="flex-one custom-center" v-model="attributeRatio">
      <el-radio :label="1" size="small">1</el-radio>
      <el-radio :label="0.5" size="small">0.5</el-radio>
      <el-radio :label="2" size="small">2</el-radio>
    </el-radio-group>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <div class="flex-one custom-center">
      <el-text>威力提升</el-text>
      <el-input-number v-model="powIncrease" controls-position="right" :min="0" :max="1000" :step="5" size="small"/>
    </div>
  </el-row>
  <el-divider>提升伤害</el-divider>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">选取目标</el-text>
    <el-radio-group class="flex-one custom-center" v-model="damageIncreaseObject">
      <el-radio :label="'self'">己方</el-radio>
      <el-radio :label="'enemy'">对方</el-radio>
    </el-radio-group>
    <el-text class="flex-one custom-center">是否触发</el-text>
    <el-switch class="flex-one custom-center" v-model="damageIncreaseBasis"/>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">依据属性</el-text>
    <el-select class="flex-one custom-center" v-model="damageIncreaseProperty" placeholder="Select" size="small">
      <el-option
          v-for="item in basis"
          :key="item.label"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-text class="flex-one custom-center">比率</el-text>
    <el-input-number v-model="damageIncreaseRatio" controls-position="right" :min="0"
                     :max="1000" :step="1"
                     step-strictly size="small"/>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <div class="flex-one custom-center">
      <el-text>触发次数</el-text>
      <el-input-number v-model="damageIncreaseActionCount" controls-position="right" :min="1"
                       :max="10" :step="1"
                       step-strictly size="small"/>
    </div>
  </el-row>
  <el-divider>附加伤害</el-divider>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">选取目标</el-text>
    <el-radio-group class="flex-one custom-center" v-model="damageFixedObject">
      <el-radio :label="'self'">己方</el-radio>
      <el-radio :label="'enemy'">对方</el-radio>
    </el-radio-group>
    <el-text class="flex-one custom-center">是否触发</el-text>
    <el-switch class="flex-one custom-center" v-model="damageFixedBasis"/>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">依据属性</el-text>
    <el-select class="flex-one custom-center" v-model="damageFixedProperty" placeholder="Select" size="small">
      <el-option
          v-for="item in basis"
          :key="item.label"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-text class="flex-one custom-center">比率</el-text>
    <el-input-number v-model="damageFixedRatio" controls-position="right" :min="0" :max="1000" :step="1" step-strictly
                     size="small"/>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <div class="flex-one custom-center">
      <el-text>触发次数</el-text>
      <el-input-number v-model="damageFixedActionCount" controls-position="right" :min="1"
                       :max="10" :step="1"
                       step-strictly size="small"/>
    </div>
  </el-row>
  <el-row justify="center" class="flex-display-row">
    <el-text class="flex-one custom-center">流血伤害:{{ Math.ceil(this.attack * 0.1) }}</el-text>
    <el-text class="flex-one custom-center">冻伤、烧伤伤害:{{ Math.ceil(this.attack * 0.05) }}</el-text>
  </el-row>
  <el-table :data="result" style="width: 100%">
    <el-table-column prop="label" label="刻印套系"/>
    <el-table-column prop="AOE" label="群体攻击"/>
    <el-table-column prop="SOLO" label="单体攻击"/>
    <el-table-column prop="AOEcrit" label="群体暴击"/>
    <el-table-column prop="SOLOcrit" label="单体暴击"/>
    <el-table-column prop="damageIncrease" label="提升伤害"/>
    <el-table-column prop="damageFixed" label="固定伤害"/>
  </el-table>
</template>

<script>
import {ElMessageBox} from "element-plus";

export default {
  name: "CustomCompute",
  data() {
    return {
      attack: 1000,
      speed: 0,
      attackCurrentHealth: 1,
      attackTotalHealth: 10,
      defense: 500,
      currentHealth: 1,
      totalHealth: 10,
      critDamage: 150,
      skillPowRatio: 0.99,
      skillPow: 100,
      penetrateDefense: 0,
      attributeRatio: 1,
      damageIncrease: 0,
      powIncrease: 0,
      damageDecrease: 0,
      effectiveBuffCount: 0,
      damageIncreaseObject: 'self',
      damageIncreaseBasis: false,
      damageIncreaseActionCount: 1,
      damageIncreaseProperty: 'attack',
      damageIncreaseRatio: 0,
      damageFixedObject: 'self',
      damageFixedBasis: false,
      damageFixedActionCount: 1,
      damageFixedProperty: 'attack',
      damageFixedRatio: 0,
      result: [
        {
          name: 'default',
          label: '默认',
          AOE: 0,
          SOLO: 0,
          AOEcrit: 0,
          SOLOcrit: 0,
          damageIncrease: 0,
          damageFixed: 0,
        },
        {
          name: 'strongProof',
          label: '强者之证',
          AOE: 0,
          SOLO: 0,
          AOEcrit: 0,
          SOLOcrit: 0,
          damageIncrease: 0,
          damageFixed: 0,
        },
        {
          name: 'honorAndDuty',
          label: '荣耀与责任',
          AOE: 0,
          SOLO: 0,
          AOEcrit: 0,
          SOLOcrit: 0,
          damageIncrease: 0,
          damageFixed: 0,
        },
        {
          name: 'guardian',
          label: '守护者',
          AOE: 0,
          SOLO: 0,
          AOEcrit: 0,
          SOLOcrit: 0,
          damageIncrease: 0,
          damageFixed: 0,
        },
        {
          name: 'evolution',
          label: '蜕变',
          AOE: 0,
          SOLO: 0,
          AOEcrit: 0,
          SOLOcrit: 0,
          damageIncrease: 0,
          damageFixed: 0,
        },
        {
          name: 'terminator',
          label: '终结者',
          AOE: 0,
          SOLO: 0,
          AOEcrit: 0,
          SOLOcrit: 0,
          damageIncrease: 0,
          damageFixed: 0,
        },
        {
          name: 'lifeAndDeath',
          label: '跨越生死',
          AOE: 0,
          SOLO: 0,
          AOEcrit: 0,
          SOLOcrit: 0,
          damageIncrease: 0,
          damageFixed: 0,
        },
      ],
      bleedingDamage: 0,
      frozenBurnDamage: 0,
      basis: [
        {value: 'attack', label: '攻击'},
        {value: 'speed', label: '速度'},
        {value: 'defense', label: '防御'},
        {value: 'currentHealth', label: '当前生命'},
        {value: 'totalHealth', label: '总生命'},
        {value: 'lostHealth', label: '已损生命'},
        {value: 'damage', label: '造成伤害'},
      ],
      baseDamage: 0,
      increaseDamage: 0,
      fixedDamage: 0
    }
  },
  created() {
    this.computeBase()
    this.computeIncrease()
    this.computeFixed()
    this.outputExtra()
  },
  watch: {
    attack() {
      this.computeBase()
    },
    defense() {
      this.computeBase()
    },
    penetrateDefense() {
      this.computeBase()
    },
    skillPow() {
      this.computeBase()
    },
    skillPowRatio() {
      this.computeBase()
    },
    attributeRatio() {
      this.computeBase()
    },
    powIncrease() {
      this.computeBase()
    },
    damageIncrease() {
      this.computeBase()
    },
    speed() {
      this.computeIncrease()
      this.computeFixed()
      this.outputExtra()
    },
    currentHealth() {
      this.computeIncrease()
      this.computeFixed()
      this.outputExtra()
    },
    totalHealth() {
      this.computeIncrease()
      this.computeFixed()
      this.outputExtra()
    },
    attackCurrentHealth() {
      this.computeIncrease()
      this.computeFixed()
      this.outputExtra()
    },
    attackTotalHealth() {
      this.computeIncrease()
      this.computeFixed()
      this.outputExtra()
    },
    damageDecrease() {
      this.outputResult()
    },
    critDamage() {
      this.outputResult()
    },
    damageIncreaseObject() {
      this.computeIncrease()
      this.outputExtra()
    },
    damageIncreaseBasis() {
      this.computeIncrease()
      this.outputExtra()
    },
    damageIncreaseProperty() {
      this.computeIncrease()
      this.outputExtra()
    },
    damageIncreaseRatio() {
      this.computeIncrease()
      this.outputExtra()
    },
    damageIncreaseActionCount(){
      this.computeIncrease()
      this.outputExtra()
    },
    damageFixedObject() {
      this.computeFixed()
      this.outputExtra()
    },
    damageFixedBasis() {
      this.computeFixed()
      this.outputExtra()
    },
    damageFixedProperty() {
      this.computeFixed()
      this.outputExtra()
    },
    damageFixedRatio() {
      this.computeFixed()
      this.outputExtra()
    },
    damageFixedActionCount(){
      this.computeFixed()
      this.outputExtra()
    }
  },
  methods: {
    open() {
      ElMessageBox.alert('这种自定义肯定是不如隔壁模板角色考虑完整的，首先如果有多段提升伤害或者固定伤害，自定义是不考虑的，比如说天邪龙王的魂印和技能，这边最多计算一个效果。其次，属性选取是不完整的，只有当前生命、总生命、已损生命是区分敌我双方的，别的选择没有区别（所以没有输入防守方攻击和速度的框）。主要是因为把所有的情况都考虑清楚的话，这个页面就太复杂了。最后，计算结果是有误差的，一般在0~20，如果超过20，那大概率是角色天赋的增伤减伤没有给对，有误差的原因是官方的取整机制和我这里不一样，我这里是全部伤害算完再向上取整，官方应该是多段逻辑取整后再叠加，误差不多，也够用了。', '别太较真', {
        confirmButtonText: 'OK'
      })
    },
    computeBase() {
      this.baseDamage = Math.ceil(this.attack * (100 / (100 + this.defense * (100 - this.penetrateDefense) / 100)) * (this.skillPow / 150) * this.skillPowRatio * this.attributeRatio * (1 + (this.powIncrease + this.damageIncrease) / 100))
      this.outputResult()
    },
    computeIncrease() {
      if (this.damageIncreaseBasis) {
        if (this.damageIncreaseObject === 'self') {
          switch (this.damageIncreaseProperty) {
            case 'attack':
              this.increaseDamage = Math.ceil(this.attack * this.damageIncreaseRatio / 100)
              break
            case 'speed':
              this.increaseDamage = Math.ceil(this.speed * this.damageIncreaseRatio / 100)
              break
            case 'defense':
              this.increaseDamage = Math.ceil(this.defense * this.damageIncreaseRatio / 100)
              break
            case 'currentHealth':
              this.increaseDamage = Math.ceil(this.attackCurrentHealth * this.damageIncreaseRatio / 100)
              break
            case 'totalHealth':
              this.increaseDamage = Math.ceil(this.attackTotalHealth * this.damageIncreaseRatio / 100)
              break
            case 'lostHealth':
              this.increaseDamage = Math.ceil((this.attackTotalHealth - this.attackCurrentHealth) * this.damageIncreaseRatio / 100)
              break
            case 'damage':
              this.increaseDamage = Math.ceil(this.baseDamage * this.damageIncreaseRatio / 100)
              break
          }
        } else if (this.damageIncreaseObject === 'enemy') {
          switch (this.damageIncreaseProperty) {
            case 'attack':
              this.increaseDamage = Math.ceil(this.attack * this.damageIncreaseRatio / 100)
              break
            case 'speed':
              this.increaseDamage = Math.ceil(this.speed * this.damageIncreaseRatio / 100)
              break
            case 'defense':
              this.increaseDamage = Math.ceil(this.defense * this.damageIncreaseRatio / 100)
              break
            case 'currentHealth':
              this.increaseDamage = Math.ceil(this.currentHealth * this.damageIncreaseRatio / 100)
              break
            case 'totalHealth':
              this.increaseDamage = Math.ceil(this.totalHealth * this.damageIncreaseRatio / 100)
              break
            case 'lostHealth':
              this.increaseDamage = Math.ceil((this.totalHealth - this.currentHealth) * this.damageIncreaseRatio / 100)
              break
            case 'damage':
              this.increaseDamage = Math.ceil(this.baseDamage * this.damageIncreaseRatio / 100)
              break
          }
        }
        this.increaseDamage = this.increaseDamage * this.damageIncreaseActionCount
      } else {
        this.increaseDamage = 0
      }
    },
    computeFixed() {
      if (this.damageFixedBasis) {
        if (this.damageFixedObject === 'self') {
          switch (this.damageFixedProperty) {
            case 'attack':
              this.fixedDamage = Math.ceil(this.attack * this.damageFixedRatio / 100)
              break
            case 'speed':
              this.fixedDamage = Math.ceil(this.speed * this.damageFixedRatio / 100)
              break
            case 'defense':
              this.fixedDamage = Math.ceil(this.defense * this.damageFixedRatio / 100)
              break
            case 'currentHealth':
              this.fixedDamage = Math.ceil(this.attackCurrentHealth * this.damageFixedRatio / 100)
              break
            case 'totalHealth':
              this.fixedDamage = Math.ceil(this.attackTotalHealth * this.damageFixedRatio / 100)
              break
            case 'lostHealth':
              this.fixedDamage = Math.ceil((this.attackTotalHealth - this.attackCurrentHealth) * this.damageFixedRatio / 100)
              break
            case 'damage':
              this.fixedDamage = Math.ceil(this.baseDamage * this.damageFixedRatio / 100)
              break
          }
        } else if (this.damageFixedObject === 'enemy') {
          switch (this.damageFixedProperty) {
            case 'attack':
              this.fixedDamage = Math.ceil(this.attack * this.damageFixedRatio / 100)
              break
            case 'speed':
              this.fixedDamage = Math.ceil(this.speed * this.damageFixedRatio / 100)
              break
            case 'defense':
              this.fixedDamage = Math.ceil(this.defense * this.damageFixedRatio / 100)
              break
            case 'currentHealth':
              this.fixedDamage = Math.ceil(this.currentHealth * this.damageFixedRatio / 100)
              break
            case 'totalHealth':
              this.fixedDamage = Math.ceil(this.totalHealth * this.damageFixedRatio / 100)
              break
            case 'lostHealth':
              this.fixedDamage = Math.ceil((this.totalHealth - this.currentHealth) * this.damageFixedRatio / 100)
              break
            case 'damage':
              this.fixedDamage = Math.ceil(this.baseDamage * this.damageFixedRatio / 100)
              break
          }
        }
        this.fixedDamage = this.fixedDamage * this.damageFixedActionCount
      } else {
        this.fixedDamage = 0
      }
    },
    outputResult() {
      this.result.forEach(item => {
        let decrease = 1 - this.damageDecrease / 100
        let base = Math.ceil(this.baseDamage * decrease)
        let critRate = this.critDamage / 100
        switch (item.name) {
          case 'default':
            break
          case 'strongProof':
            base = this.attack * (100 / (100 + this.defense * 0.75)) * (this.skillPow / 150) * this.skillPowRatio * this.attributeRatio * (1 + (this.powIncrease + this.damageIncrease) / 100) * decrease
            break
          case 'honorAndDuty':
            base = base * 1.4
            break
          case 'guardian':
            base = base * 1.35
            break
          case 'evolution':
            base = base * 1.3
            break
          case 'terminator':
            base = base * 1.4
            break
          case 'lifeAndDeath':
            base = base * 1.5
            break
        }
        item.AOE = Math.ceil(0.8 * base)
        item.SOLO = Math.ceil(base)
        item.AOEcrit = Math.ceil(0.8 * critRate * base)
        item.SOLOcrit = Math.ceil(critRate * base)
      })
    },
    outputExtra(){
      this.result.forEach(item=>{
        item.damageIncrease = this.increaseDamage
        item.damageFixed = this.fixedDamage
      })
    }
  }
}
</script>

<style scoped>

</style>
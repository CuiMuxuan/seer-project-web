<template>
  <div class="train" v-loading.fullscreen.lock="isLoading" :element-loading-spinner="this.$loadingSvg" element-loading-text="我知道你很急，但是你先别急">
    <Character @changeCharacter="changeCharacter"></Character>
    <div class="imprint">
      <el-divider>
        刻印套系
      </el-divider>
      <el-checkbox-group v-model="imprintList" :min="0" :max="2">
        <el-checkbox @change="imprintChange" v-for="imprint in imprints" :key="imprint.name" :label="imprint.name">{{
            imprint.name
          }}
        </el-checkbox>
      </el-checkbox-group>
      <el-divider>
        词条选择
      </el-divider>
      <div class="flex-display">
        <el-text class="flex" type="info">剩余大词条:</el-text>
        <el-text class="flex" :type="this.totalBigPoint===0?'danger':'success'" tag="b">{{ totalBigPoint }}</el-text>
        <el-text class="flex" type="info">剩余小词条:</el-text>
        <el-text class="flex" :type="this.totalSmallPoint===0?'danger':'success'" tag="b">{{ totalSmallPoint }}
        </el-text>
        <div class="flex">
          <el-button v-if="totalSmallPoint!==20||totalBigPoint!==4" class="flex" type="success" @click="refreshPoint">
            重置词条
          </el-button>
          <el-button type="info" v-else disabled>重置词条</el-button>
        </div>
      </div>
      <el-table stripe :data="entryList" style="width: 100%" :span-method="spanMethod" :row-style="{height:0}">
        <el-table-column fixed label="属性" prop="name" align="center"/>
        <el-table-column label="大词条" prop="bigPoint" align="center">
          <template #default="scope">
            <el-input-number v-model="scope.row.bigPoint" :min="scope.row.minBigPoint" :max="scope.row.maxBigPoint" @change="bigPointChange"
                             class="col-100" size="small"
                             :disabled="this.totalBigPoint===0||scope.row.bigPoint+scope.row.smallPoint===5"/>
          </template>
        </el-table-column>
        <el-table-column label="小词条" prop="smallPoint" align="center">
          <template #default="scope">
            <el-input-number v-model="scope.row.smallPoint" :min="0" :max="5" @change="smallPointChange" class="col-100"
                             size="small"
                             :disabled="this.totalSmallPoint===0||scope.row.bigPoint+scope.row.smallPoint===5"/>
          </template>
        </el-table-column>
        <el-table-column label="基础数值" prop="base" align="center">
          <template #default="scope">
            <el-text type="info">{{ scope.row.base }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="面板极限" prop="max" align="center">
          <template #default="scope">
            <el-text type="danger">{{ scope.row.max }}</el-text>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <el-table stripe :data="percentTable" style="width: 100%" :row-style="{height:0}">
        <el-table-column fixed label="百分比词条" prop="name" align="center"></el-table-column>
        <el-table-column v-for="i in 16" :label="i+14+'%'" prop="base" align="center">
          <template #default="scope">
            <el-text>{{Math.ceil(scope.row.base*(i+14)/100)}}</el-text>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <el-alert
          title="关于词条点数的性价比"
          type="success"
          description="已知：
大词条：三维百分比50%=双暴50%=速度45=精准抵抗50%=三维200/100/250
小词条：三维百分比30%=暴击15%=暴伤20%=速度20=精准抵抗20%=三维135/70/150 可以得出如下结论："
          show-icon
      />
      <el-alert title="大词条：1抵抗/精准/暴击/暴伤=1%三维=0.9速=三维4/2/5" type="success" center />
      <el-alert title="小词条：1抵抗/精准/暴伤=1.5%三维=0.75暴击=1速度=三维6.75/3.5/7.5" type="success" center />
      <el-alert title="基础生命小于500时大小生命数值词条都优于生命百分比词条" type="success" center />
      <el-alert title="基础攻击小于450时小攻击数值词条优于攻击百分比词条" type="success" center />
      <el-alert title="基础攻击小于400时大攻击数值词条优于攻击百分比词条" type="success" center />
      <el-alert title="基础防御小于231时小防御数值词条都优于防御百分比词条" type="success" center />
      <el-alert title="基础防御小于200时大防御数值词条都优于防御百分比词条" type="success" center />
      <el-alert title="省流：数值词条大概率不如百分比词条" type="success" center />
      <el-alert
          title="关于计算公式"
          type="info"
          description="计算公式详见公告页。"
          show-icon
      />
      <el-alert
          title="关于极限数值"
          type="error"
          description="默认极限数值为Ⅰ、Ⅱ、Ⅲ号可以满级且天赋点满的情况，计算内容包括刻印套系。"
          show-icon
      />

    </div>
  </div>
</template>

<script>
import Character from "../max/Character.vue";
import {ref, nextTick, provide, inject} from "vue";

export default {
  name: "train",
  components: {
    Character
  },
  data() {
    return {
      isLoading:true,
      character: {
        attack: 0,
        defense: 0,
        life: 0,
        speed: 0,
        crit: 0,
        criticalDamage: 0,
        precision: 0,
        resistance: 0,
      },
      max: {
        attack: 0,
        defense: 0,
        life: 0,
        speed: 0,
        crit: 0,
        criticalDamage: 0,
        precision: 0,
        resistance: 0,
      },
      imprintList: [],
      imprintPoint: 2,
      totalBigPoint: 4,
      totalSmallPoint: 20,
      percentTable:[],
      entryList: [
        {
          name: "攻击",
          entry: "attack",
          maxBigPoint: 4,
          minBigPoint: 2,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0,
          max: 0
        },
        {
          name: "攻击百分比",
          entry: "attackPercentage",
          maxBigPoint: 2,
          minBigPoint: 0,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0, imprint: 0,
          max: 0
        },
        {
          name: "防御",
          entry: "defense",
          maxBigPoint: 4,
          minBigPoint: 2,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0,
          max: 0
        },
        {
          name: "防御百分比",
          entry: "defensePercentage",
          maxBigPoint: 2,
          minBigPoint: 0,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0, max: 0
        },
        {
          name: "生命",
          entry: "life",
          maxBigPoint: 4,
          minBigPoint: 2,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0,
          max: 0
        },
        {
          name: "生命百分比",
          entry: "lifePercentage",
          maxBigPoint: 2,
          minBigPoint: 0,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0, max: 0
        },
        {
          name: "速度",
          entry: "speed",
          maxBigPoint: 1,
          minBigPoint: 0,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0,
          max: 0
        },
        {
          name: "暴击",
          entry: "crit",
          maxBigPoint: 1,
          minBigPoint: 0,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0,
          max: 0
        },
        {
          name: "暴伤",
          entry: "criticalDamage",
          maxBigPoint: 1,
          minBigPoint: 0,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0, max: 0
        },
        {
          name: "精准",
          entry: "precision",
          maxBigPoint: 2,
          minBigPoint: 0,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0, max: 0
        },
        {
          name: "抵抗",
          entry: "resistance",
          maxBigPoint: 2,
          minBigPoint: 0,
          bigPoint: 0,
          smallPoint: 0,
          base: 0,
          talent: 0,
          soul: 0,
          imprint: 0, max: 0
        },
      ]
    }
  },
  watch: {
    totalBigPoint() {
      this.computeMax()
    },
    totalSmallPoint() {
      this.computeMax()
    }
  },
  methods: {
    computeMax() {
      let attack = this.entryList.find(entry => entry.entry === "attack")
      let defense = this.entryList.find(entry => entry.entry === "defense")
      let life = this.entryList.find(entry => entry.entry === "life")
      this.entryList.forEach(entry => {
            switch (entry.entry) {
              case "attack":
                entry.max = 135 * entry.smallPoint + 200 * entry.bigPoint + entry.base + entry.talent
                break
              case "attackPercentage":
                entry.max = Math.ceil(attack.base * (attack.soul + 25 * attack.imprint + 50 * entry.bigPoint + 30 * entry.smallPoint) / 100)
                break
              case "defense":
                entry.max = + 70 * entry.smallPoint + 100 * entry.bigPoint + entry.base + entry.talent
                break;
              case "defensePercentage":
                entry.max = Math.ceil(defense.base * (defense.soul + 25 * defense.imprint + 50 * entry.bigPoint + 30 * entry.smallPoint) / 100)
                break;
              case "life":
                entry.max = + 150 * entry.smallPoint + 250 * entry.bigPoint + entry.base + entry.talent
                break;
              case "lifePercentage":
                entry.max = Math.ceil(life.base * (life.soul + 25 * life.imprint + 50 * entry.bigPoint + 30 * entry.smallPoint) / 100)
                break
              case "speed":
                entry.max = 20 * entry.smallPoint + 45 * entry.bigPoint + entry.base + entry.talent + Math.ceil((entry.base * entry.soul) / 100) + Math.ceil(entry.base * (10 * entry.imprint) / 100)
                break
              case "crit":
                entry.max = 10 * entry.imprint + 15 * entry.smallPoint + 50 * entry.bigPoint + entry.base + entry.talent + entry.soul
                break
              case "criticalDamage":
                entry.max = 20 * entry.smallPoint + 50 * entry.bigPoint + entry.base + entry.talent + entry.soul
                break
              case "precision":
              case "resistance":
                entry.max = 35 * entry.imprint + 20 * entry.smallPoint + 50 * entry.bigPoint + entry.base + entry.talent + entry.soul
                break
            }
          }
      )
      this.entryList.find(entry => entry.entry === "attack").max += this.entryList.find(entry => entry.entry === "attackPercentage").max
      this.entryList.find(entry => entry.entry === "defense").max += this.entryList.find(entry => entry.entry === "defensePercentage").max
      this.entryList.find(entry => entry.entry === "life").max += this.entryList.find(entry => entry.entry === "lifePercentage").max
    },
    changeCharacter(e) {
      this.character = e.character
      this.percentTable=[]
      this.entryList.forEach(entry => {
        if (entry.entry in e.character) {
          entry.base = e.character[entry.entry]
          entry.talent = e.talent[entry.entry]
          entry.soul = e.soul[entry.entry]
          entry.max = entry.base + entry.talent
        }
        if(entry.entry.indexOf('Percentage')!==-1){
          let p=entry.entry.split('Percentage')[0]
          let b
          this.entryList.forEach(item=>{
            if(item.entry===p){
              b=item.base
            }
          })
          entry.base=b
          this.percentTable.push(entry)
        }
        this.computeMax()
      })
      this.isLoading=false
    },
    imprintChange(e) {
      e ? this.imprintPoint-- : this.imprintPoint++
      this.entryList.forEach(entry => {
        entry.imprint = 0
      })
      this.imprintList.forEach(imprint => {
        this.entryList.find(entry => entry.entry === this.imprints.find(entity => entity.name === imprint).prop).imprint += 1
      })
      this.computeMax()
    },
    bigPointChange(number) {
      let totalBigPoint = 0
      this.entryList.forEach(entry => {
        totalBigPoint += entry.bigPoint
      })
      this.totalBigPoint = 10 - totalBigPoint
    },
    smallPointChange(number) {
      let totalSmallPoint = 0
      this.entryList.forEach(entry => {
        totalSmallPoint += entry.smallPoint
      })
      this.totalSmallPoint = 20 - totalSmallPoint
    },
    refreshPoint() {
      this.totalBigPoint = 4
      this.totalSmallPoint = 20
      this.entryList.forEach(entry => {
        entry.bigPoint = 0
        entry.smallPoint = 0
        if (entry.entry === "speed" || entry.entry === "crit" || entry.entry === "criticalDamage") {
          entry.maxBigPoint = 1
        } else {
          entry.maxBigPoint = 2
        }
      })
    },
  },
  setup() {
    const imprints = [
      {name: '守护者', prop: "attack", propZh: "攻击+25%"},
      {name: '向光而行', prop: "attack", propZh: "攻击+25%"},
      {name: '荣耀与责任', prop: "attack", propZh: "攻击+25%"},
      {name: '蜕变', prop: "attack", propZh: "攻击+25%"},
      {name: '强者之证', prop: "crit", propZh: "暴击+10%"},
      {name: '终结者', prop: "crit", propZh: "暴击+10%"},
      {name: '强弩之末', prop: "precision", propZh: "精准+35%"},
      {name: '火焰之心', prop: "precision", propZh: "精准+35%"},
      {name: '雪原追忆', prop: "precision", propZh: "精准+35%"},
      {name: '无悔牺牲', prop: "defense", propZh: "防御+25%"},
      {name: '跨越生死', prop: "resistance", propZh: "抵抗+35%"},
      {name: '涅槃', prop: "life", propZh: "生命+25%"},
      {name: '生于虚空', prop: "life", propZh: "生命+25%"},
      {name: '不变的坚持', prop: "speed", propZh: "速度+10%"},
      {name: '耀光万象', prop: "life", propZh: "生命+25%"},
      {name: '破空之翼', prop: "speed", propZh: "速度+10%"},
      {name: '魔影', prop: "defense", propZh: "防御+25%"},
      {name: '飞叶与鲜血', prop: "precision", propZh: "精准+35%"},
      {name: '指引者', prop: "resistance", propZh: "抵抗+35%"}]
    const spanMethod = ({
                          row,
                          column,
                          rowIndex,
                          columnIndex,
                        }) => {
      if (columnIndex === 4 || columnIndex === 3) {
        if (rowIndex % 2 === 0 && rowIndex <= 5) {
          return {
            rowspan: 2,
            colspan: 1,
          }
        }
      }
    }
    return {
      spanMethod,
      imprints
    }
  }
}
</script>

<style scoped>
.train {
  width: 100%;
}

.imprint {
  width: 100%
}

.flex-display {
  display: flex;
  align-items: center;
}

.flex {
  flex: 1;
}

.col-100 {
  width: 100%;
}
</style>
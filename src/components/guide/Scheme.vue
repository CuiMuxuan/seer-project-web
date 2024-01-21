<template>
  <!--展示scheme数据-->
  <div class="scheme">
    <el-card class="box-card">
      <el-row>
        <el-descriptions :title="scheme.name" :border="false">
          <el-descriptions-item>{{ scheme.schemeDescription }}</el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-descriptions title="推荐铭文" :border="false">
            <el-descriptions-item>{{ scheme.recommendedEngraving }}</el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span="12">
          <el-descriptions title="适用玩法" :border="false">
            <el-descriptions-item>{{ scheme.applicableGameplay }}</el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
      <el-row>
        <el-descriptions title="面板数值标准（及格/优良/极品）" :border="false">
          <el-descriptions-item>
            <el-table :data="panelValues" :row-class-name="tableRowClassName" style="width: 100%" size="small">
              <el-table-column prop="attack" label="攻击" width="60"></el-table-column>
              <el-table-column prop="crit" label="暴击" width="60"></el-table-column>
              <el-table-column prop="criticalDamage" label="暴伤" width="60"></el-table-column>
              <el-table-column prop="defense" label="防御" width="60"></el-table-column>
              <el-table-column prop="life" label="生命" width="60"></el-table-column>
              <el-table-column prop="precision" label="精准" width="60"></el-table-column>
              <el-table-column prop="resistance" label="抵抗" width="60"></el-table-column>
              <el-table-column prop="speed" label="速度" width="60"></el-table-column>
            </el-table>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-descriptions title="天赋加点" :border="false">
            <el-descriptions-item>{{ scheme.talentPoints }}</el-descriptions-item>
          </el-descriptions>
        </el-col>
        <el-col :span="12">
          <el-descriptions title="技能加点" :border="false">
            <el-descriptions-item>{{ scheme.skillPoints }}</el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
      <el-row>
        <el-descriptions title="刻印词条优先级" :column="1" :border="false">
          <el-descriptions-item label="ⅠⅡⅢ">{{ scheme.engraving123 }}</el-descriptions-item>
          <el-descriptions-item label="刻印Ⅳ">{{ scheme.engraving4 }}</el-descriptions-item>
          <el-descriptions-item label="刻印Ⅴ">{{ scheme.engraving5 }}</el-descriptions-item>
        </el-descriptions>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Scheme",
  props: {
    scheme: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      panelValues: []
    }
  },
  created() {
    this.panelValues.push(this.scheme.passable)
    this.panelValues.push(this.scheme.excellent)
    this.panelValues.push(this.scheme.top)

  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 2) {
        return 'success-row'
      }
      return ''
    }
  },
  setup(props) {
    const scheme = props.scheme
    return {
      scheme
    }
  }
}
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
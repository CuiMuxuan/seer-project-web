<template>
  <div class="top">
<!--    <div class="tab">基础数值</div>-->
    <el-row>
      <el-col :span="12" class="col-100"><el-button type="success" :plain="this.choose!=='Base'" @click="this.choose='Base'" class="col-100">基础数值</el-button></el-col>
      <el-col :span="12" class="col-100"><el-button type="success" :plain="this.choose!=='Max'" @click="this.choose='Max'" class="col-100">极限数值</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" :plain="this.propChoose!=='attack'" @click="this.propChoose='attack'" class="col-100">攻击</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" :plain="this.propChoose!=='defense'" @click="this.propChoose='defense'" class="col-100">防御</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" :plain="this.propChoose!=='life'" @click="this.propChoose='life'" class="col-100">生命</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" :plain="this.propChoose!=='speed'" @click="this.propChoose='speed'" class="col-100">速度</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" :plain="this.propChoose!=='crit'" @click="this.propChoose='crit'" class="col-100">暴击</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" :plain="this.propChoose!=='critical_damage'" @click="this.propChoose='critical_damage'" class="col-100">暴伤
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" :plain="this.propChoose!=='precision'" @click="this.propChoose='precision'" class="col-100">精准
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" :plain="this.propChoose!=='resistance'" @click="this.propChoose='resistance'" class="col-100">抵抗
        </el-button>
      </el-col>
    </el-row>
    <el-table  stripe :data="data" style="width: 100%;height: 600px">
      <el-table-column fixed align="center" label="TOP" width="60">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column fixed align="center" prop="name" label="角色名称" width="120"/>
      <el-table-column :fixed="this.propChoose==='attack'" align="center" prop="attack" label="攻击" width="90"/>
      <el-table-column :fixed="this.propChoose==='defense'" align="center" prop="defense" label="防御" width="90"/>
      <el-table-column :fixed="this.propChoose==='life'" align="center" prop="life" label="生命" width="90"/>
      <el-table-column :fixed="this.propChoose==='crit'" align="center" prop="crit" label="暴击" width="90"/>
      <el-table-column :fixed="this.propChoose==='speed'" align="center" prop="speed" label="速度" width="90">
        <template #default="scope">
          <el-tooltip v-if="this.choose==='Max'" class="item" effect="dark" :content="'面板极限：'+String(scope.row.speed-30)" placement="top">
            <div v-show="this.choose==='Max'">{{scope.row.speed}}</div>
          </el-tooltip>
          <div v-show="this.choose==='Base'">{{scope.row.speed}}</div>
        </template>
      </el-table-column>
      <el-table-column :fixed="this.propChoose==='critical_damage'" align="center" prop="criticalDamage" label="暴伤"
                       width="90"/>
      <el-table-column :fixed="this.propChoose==='precision'" align="center" prop="precision" label="精准" width="90"/>
      <el-table-column :fixed="this.propChoose==='resistance'" align="center" prop="resistance" label="抵抗" width="90"/>
    </el-table>
  </div>
</template>

<script>
import {ElLoading} from "element-plus";

export default {
  name: "top",
  data() {
    return {
      data: [],
      propChoose: "attack",
      propChinese: "攻击",
      choose: 'Base'
    }
  },
  watch: {
    propChoose() {
      this.getData()
    },
    choose() {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const options = {
        //是否全屏
        fullscreen: false,
        //是否锁定
        lock: false,
        //加载中的文本
        text: '加载中',
        //加载中的图标
        spinner: this.$loadingSvg,
        //加载中的背景
        background: 'rgba(255, 255, 255, 0.7)',
      }
      const loadingInstance = ElLoading.service(options)
      this.$http.get("/character/get" + this.choose + "ListOrderByProperty?property=" + this.propChoose).then(res => {
        this.data = res.data.data
        loadingInstance.close()
      })
    }
  }
}
</script>

<style scoped>
.top {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.tab{
  text-align: center;
  width:150px;
  height: 40px;
  margin: 0 auto;
  background: #67C23A;
  border-radius: 10px 10px 0 0;
  position: relative;
  transform: perspective(30px) rotateX(21deg);
  transform-origin: center bottom;
}
.tab::before,
.tab::after{
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 0;
  background: #67C23A;
}
.tab::before{
  left: -10px;
  background: radial-gradient(
  circle at 0 0,
  transparent 10px,
  #67C23A 10px
  );
}
.tab::after{
  right: -10px;
  background: radial-gradient(
      circle at 100% 0,
      transparent 10px,
      #67C23A 10px
  );
}
.col-100{
  width: 100%;
}
</style>
<template>
  <div class="notice">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公告</span>
        </div>
      </template>
      <div v-html="notice.content"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Notice",
  props: {
    id: 1
  },
  data() {
    return {
      notice: {
        id: 1,
        content: null,
        createTime: "",
      }
    }
  },
  created() {
    this.getNotice()
  },
  methods: {
    async getNotice() {
      await this.$http.get('/notice/getById?id=' + this.id).then((res) => {
        this.notice = res.data.data
      })
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}

.notice {
  width: 100%;
  margin-top: 5%;
}
</style>
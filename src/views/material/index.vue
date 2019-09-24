<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 自定义上传 -->
    <el-upload :http-request="uploadImg" action="" :show-file-list="false" class='too-difficult'>
      <el-button type="primary">上传图片</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <div class="oprate">
              <i @click="collectOrCancel(item)" :style="{color: item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
              <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页多少条
      }
    }
  },
  methods: {
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      //  获取当前图片的状态，若是turn就询问确定要取消该图片
      this.$confirm(`您确定要${mess}收藏该图片吗`).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected }
        }).then(() => {
          // 收藏或者取消收藏成功都要 重新拉取数据
          this.getMaterial()
        })
      })
    },
    delImg (id) {
      // 询问是否删除
      this.$confirm('您确定要删除该图片吗？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    uploadImg (params) {
      const data = new FormData() // 声明一个新的表单
      data.append('image', params.file)
      // 上传文件
      this.$axios({
        url: '/user/images',
        method: 'post',
        data // data: data
      }).then(() => {
        this.getMaterial()
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    changeTab () { // 当标签页发生改变时，触发此方法
      // 应将当前页归为第一页
      this.page.currentPage = 1
      this.getMaterial() // 再重新刷新页面
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.too-difficult{
  position: absolute;
  right: 20px;
  margin-top: -10px;
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-item {
    width: 180px;
    height: 180px;
    border-radius: 6px;
    margin: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .oprate {
      background-color: #f4f5f6;
      position: absolute;
      width: 100%;
      height: 30px;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>

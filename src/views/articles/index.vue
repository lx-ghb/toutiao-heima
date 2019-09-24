<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          内容列表
      </template>
      </bread-crumb>
       <el-form>
          <el-form-item label="文章状态:">
            <el-radio-group>
                <el-radio>全部</el-radio>
                <el-radio>草稿</el-radio>
                <el-radio>待审核</el-radio>
                <el-radio>审核通过</el-radio>
                <el-radio>审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表:">
                <el-select placeholder="请选择">
                </el-select>
          </el-form-item>
          <el-form-item label="时间选择:">
              <el-date-picker
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
          </el-form-item>
      </el-form>
      <!-- 主体内容开始 -->
      <div class="total">共找到5555条符合条件的内容</div>
        <div class="article-item" v-for="(item,index) in list" :key="index">
            <!-- 左侧布局 -->
            <div class="left">
                <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
                <div class="info">
                    <span class="title">{{item.title}}</span>
                    <el-tag class="status">{{item.status | statusText}}</el-tag>
                    <span class="date">{{item.pubdate}}</span>
                </div>
            </div>
            <!-- 右侧 -->
            <div class="right">
                <span>
                    <i class="el-icon-edit"></i> 修改</span>
                <span>
                   <i class="el-icon-delete"></i> 删除</span>
            </div>
        </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/img/404.png') // 将图片地址转成 base64
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getArticles()
  },
  filters: {
    //   过滤器的第一个参数永远是前面传过来的值
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .total {
        height: 60px;
        line-height: 60px;
        margin-top: 20px;
        border-bottom: 1px dashed #ccc;
    }
    .article-item {
        display: flex;
        justify-content: space-between;  //  对齐方式
        padding: 20px 10px;
        border-bottom: 1px solid #f2f3f5;
        .left{
            display: flex;
            img {
                width: 180px;
                height: 100px;
                border-radius: 4px;
            }
            .info {
                height: 100px;
                display: flex;
                margin-left: 15px;
                flex-direction:column;
                justify-content: space-around;
            }
        }
        .right {
            font-size: 14px;
            span {
                margin-right: 12px;
            }
        }

    }
</style>

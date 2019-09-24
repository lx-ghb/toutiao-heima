<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="title" label="标题" width="600px"></el-table-column>
      <el-table-column
        :formatter="stateFormatter"
        prop="comment_status"
        label="评论状态"
        align="center"
      ></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="closeOropen(obj.row)"
            :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF' }"
          >{{obj.row.comment_status ? "关闭评论" : "打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination @current-change="changePage" :current-page="page.currentPage" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页多少条
      },
      loading: false
    }
  },
  methods: {
    changePage (newPage) { // 有当前参数，传过来就是点击的当前页数
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 把总条数给分页组件的总条数
        this.loading = false
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    closeOropen (row) {
      // 当前行数据
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论`).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          // 成功之后重新拉取数据
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>

<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <!-- 搜索 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input placeholder="请输入内容" v-model="userParam.query" clearable @clear="getUsersInfo">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUsersInfo"
              ></el-button> </el-input
          ></el-col>
          <el-col :span="4">
            <el-button type="primary"> 添加用户 </el-button>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="userList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50px">
          </el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="switchValueChanged(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <!-- <template slot-scope="scope"> -->
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
              <el-tooltip
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="userParam.pagenum"
          :page-size="userParam.pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userParam: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created () {
    this.getUsersInfo()
  },
  methods: {
    async getUsersInfo () {
      const { data: res } = await this.$http.get('users', {
        params: this.userParam
      })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleCurrentChange (pagenum) {
      this.userParam.pagenum = pagenum
      this.getUsersInfo()
    },
    async switchValueChanged (userinfo) {
      // userinfo.mg_state
      // 变更状态
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 10px;
}
</style>

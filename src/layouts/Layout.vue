<template>
  <el-container style="min-height: 100vh">
    <el-header
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
      "
    >
      <div>智能实验室预约系统</div>
      <div style="display: flex; align-items: center">
        <el-dropdown size="large">
          <div style="margin-right: 10px; display: flex; align-items: center">
            <el-avatar :src="avatarIcon" style="margin-right: 10px" />
            <span>{{userInfo?.name}}</span>
            
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="route.path" router class="el-menu-vertical-demo">
          <el-menu-item index="/manager/home">
            <el-icon><Menu /></el-icon>
            <span>系统首页</span>
          </el-menu-item>
          <el-menu-item index="/manager/lab">
            <el-icon><document /></el-icon>
            <span>实验室管理</span>
          </el-menu-item>
          <el-menu-item index="/manager/equipment">
            <el-icon><setting /></el-icon>
            <span>设备列表管理</span>
          </el-menu-item>
          <el-menu-item index="/manager/user">
            <el-icon><setting /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="js">
import { logout } from '@/utils/auth'
import { useUser } from '@/utils/user'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const avatarIcon = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')


const {userInfo} = useUser()
// console.log(userInfo);

const handleLogout = async () => {
    await logout()
    ElMessage.success('成功退出登录')
    router.push('/login')
}
</script>
<style lang="less" scoped>

</style>

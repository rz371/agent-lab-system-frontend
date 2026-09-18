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
        <div style="margin-right: 10px">
          <el-avatar :src="avatarIcon" />
        </div>
        管理员
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const avatarIcon = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
</script>
<style lang="less" scoped></style>

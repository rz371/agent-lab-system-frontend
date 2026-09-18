<template>
  <div>
    <AuthCard>
      <template #firstTitle><h3>实验室智能系统</h3></template>
      <template #secondTitle>基于Agent智能预约系统</template>
      <el-form
        ref="ruleFormRef"
        style="max-width: 700px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="" prop="name">
          <el-input
            v-model="ruleForm.name"
            style="width: 320px"
            prefix-icon="Female"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            prefix-icon="Lock"
            show-password
            style="width: 320px"
            placeholder="请输入密码"
          />
        </el-form-item>
        <div class="form-btn">
          <el-button type="primary" style="width: 100%">登录</el-button>
          <div class="register">
            还没有账号？请<a href="/register" style="color: var(--el-color-primary)">注册</a>
          </div>
        </div>
      </el-form>
    </AuthCard>
  </div>
</template>
<script setup lang="js">
import { reactive, ref } from 'vue'
import AuthCard from '@/layouts/AuthCard.vue'
const ruleForm = reactive({
  name: '',
  password: ''
})
const ruleFormRef = ref(null)
const rules = reactive({
  name: [
    { required: true, message: '用户名是必需的', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度是3到5位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 5, message: '密码长度是3到5位', trigger: 'blur' }
  ]
})
</script>
<style lang="less" scoped>
.form-btn {
  .register {
    text-align: right;
    font-size: 12px;
    margin-top: 20px;
  }
}
</style>

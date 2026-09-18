<template>
  <div>
    <AuthCard>
      <template #firstTitle>欢迎注册实验室预约系统</template>
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
        <el-form-item label="" prop="checkPassword">
          <el-input
            v-model="ruleForm.checkPassword"
            type="password"
            prefix-icon="Lock"
            show-password
            style="width: 320px"
            placeholder="请再次输入密码"
          />
        </el-form-item>
        <div class="form-btn">
          <el-button type="primary" style="width: 100%">注册</el-button>
          <div class="login">
            已有账户，请<a href="/login" style="color: var(--el-color-primary)">登录</a>
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
  password: '',
  checkPassword: ''
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
  ],
  checkPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
</script>
<style lang="less" scoped>
.form-btn {
  .login {
    text-align: right;
    font-size: 12px;
    margin-top: 20px;
  }
}
</style>

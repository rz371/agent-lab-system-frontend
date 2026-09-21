<template>
  <div v-loading="loading">
    <AuthCard>
      <template #firstTitle><h3>实验室智能系统</h3></template>
      <template #secondTitle>基于Agent智能预约系统</template>
      <el-form
        ref="ruleFormRef"
        style="max-width: 700px"
        :model="ruleForm"
        :rules="rules"
        label-width="0px"
      >
        <el-form-item label="" prop="username">
          <el-input
            v-model="ruleForm.username"
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
          <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
          <div class="register">
            还没有账号？请<router-link to="/register" style="color: var(--el-color-primary)">注册</router-link>
          </div>
        </div>
      </el-form>
    </AuthCard>
  </div>
</template>
<script setup lang="js">
import { reactive, ref } from 'vue'
import AuthCard from '@/layouts/AuthCard.vue'
import { loginApi } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router' 
import { useUser } from '@/utils/user'
// 组合函数&路由
const router = useRouter()
const {saveLoginData} = useUser()

// 响应式数据
const ruleFormRef = ref(null)
const loading = ref(false)
const ruleForm = reactive({
  username: '',
  password: ''
})

// 校验规则
const rules = reactive({
  username: [
    { required: true, message: '用户名是必需的', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度是3到5位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 5, message: '密码长度是3到5位', trigger: 'blur' }
  ]
})

// 业务方法
const login = async () => {
  // await的作用就是把 Promise对象拆开，取出里面真正包裹的值，所以这个就是取出里面需要的东西要时间
  // 那么 就会暂停当前函数的执行，等结果出来再继续！！
  const valid = await ruleFormRef.value.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  try{
    // const res = loginApi(ruleForm) // <Promise {<pending>}> 没有await就是返回这个
    const res = await loginApi(ruleForm) // 有await就是取出里面真正包裹的值！！
    console.log('值',res);
    
    if(res.code === 200){
      saveLoginData(res.data)
      ElMessage.success('登录成功')
      await router.push('/manager/home')
    }
  } finally{
    loading.value = false
  }
} 

// 生命周期
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

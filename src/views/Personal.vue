<template>
  <el-card style="max-width: 700px">
    <template #header>
      <div class="card-header">
        <span>个人信息</span>
      </div>
    </template>
    <el-form
   
    label-width="100px"
    ref="formRef"
    :rules="rules"
    :model="personalForm"
    style="max-width: 600px"
    v-loading="loading"
  >
    <!-- 用户名，头像 -->
    <el-form-item label="头像"  >
      <el-upload
        class="avatar-uploader"
        :http-request="handleUpload"
        accept="image/jpeg,image/png,image/gif,image/webp"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <el-avatar :size="50" :src="personalForm.avatar" style="cursor: pointer;"/>
      </el-upload>
      
    </el-form-item>
    <el-form-item label="账号" >
      <el-input disabled v-model="personalForm.username" />
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="personalForm.name" />
    </el-form-item>
    <el-form-item label="角色" >
      <el-input disabled v-model="roleLabel" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="personalForm.email"/>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="personalForm.phone"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="submitting" @click="handleSubmit" >保存修改</el-button>
    </el-form-item>
  </el-form>
  </el-card>
    
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import {useUser} from '@/utils/user'
import {getUserInfo,updateUserInfo} from '@/api/user_api'
import { ElMessage } from 'element-plus';
import {updateFileApi} from '@/api/file_api'
const {userInfo,updateUser} = useUser()
const loading = ref(false)
const submitting = ref(false)
const formRef = ref()
const personalForm  = reactive({
    name:'',
    avatar:'',
    email:'',
    phone:'',
    role:'',
})

const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度应在 3 到 5 个字符之间', trigger: 'blur' }
  ],
  // 邮箱（对应 personalForm.email）
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],
  // 手机号（对应 personalForm.phone）
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    // 使用正则校验 11 位手机号
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的 11 位手机号', trigger: 'blur' }
  ],
}

const loadingUserInfo = async () => {
  loading.value = true
  try{
    const res = await getUserInfo(personalForm)
    if(res.code === 200){
      // 把第二个参数的值逐步的赋值给第一个参数的值
      Object.assign(personalForm,res.data)
    }
  }finally{
    loading.value = false
  }
}
const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if(!valid) return
  submitting.value = true
  try{
    const res = await updateUserInfo(personalForm)
    if(res.code === 200){
      updateUser(res.data)
      ElMessage.success('更新成功')
    }
  }finally{
    submitting.value = false
  }
}
// 图片上传前校验
const beforeAvatarUpload =  (file) => {
  const imageTypes = ['image/jpeg','image/png','image/gif','image/webp']
  if(!imageTypes.includes(file.type)){
    ElMessage.error('只能上传图片')
    return false
  } 
  if(file.size / 1024 / 1024 > 2){ // 2MB
    ElMessage.error('上传图片大小不可以超过2M')
    return false
  }
  return true
}
const handleUpload = async ({file}) => {
  try{
    const res = await updateFileApi(file)
    if(res.code === 200){
      personalForm.avatar = res.data.url
    }
  }finally{

  }
  
}

const roleLabel = computed(() => {
 return personalForm.role === 'admin' ? '管理员' 
       : personalForm.role === 'student' ? '学生' 
       : '未知角色'
})
onMounted(() => {
  loadingUserInfo()
})
// const getUserInfo = () => {
//     personalForm.name = userInfo.value.name
// }
// const changeInfo = () => {
//     console.log('改变了',personalForm);
//     updateUser({userInfo,...personalForm})
// }


// getUserInfo()
</script>

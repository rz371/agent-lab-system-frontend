<template>
    <el-card>
        <template #header>修改密码</template>
        <el-form
            label-width="auto"
            :model="pwdForm"
            :rules="rules"
            style="max-width: 600px"
        >
            <el-form-item label="旧密码">
                <el-input v-model="pwdForm.oldPwd" />
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="pwdForm.newPwd" />
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="pwdForm.confirmPwd" />
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" :loading="submitingLoading" @click="handleSubmit">提交修改</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup>
import { logout } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import {updatePwd} from '@/api/user_api'
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
const router = useRouter()
const submitingLoading = ref(false)
const pwdForm = reactive({
    oldPwd:'',
    newPwd:'',
    confirmPwd:'',
})
const validateConfirmPwd = (rule,value,callback) => {
    if(!value){
        callback(new Error('请再次输入新密码'))
    } else if(value !== pwdForm.newPwd){
        callback(new Error('两次输入的密码不一致'))
    } else {
        callback()
    }
}
const rules = reactive({
    oldPwd:[
        { required: true, message: '请输入旧密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度 6-20 位', trigger: 'blur' }
    ],
    newPwd:[
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度 6-20 位', trigger: 'blur' },
    ],
    confirmPwd:[
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        {validator:validateConfirmPwd,trigger:'blur'}
    ]
})
const handleSubmit = async () => {
    submitingLoading.value = false
    try {
        const res = await updatePwd({old_pwd:pwdForm.oldPwd,new_pwd:pwdForm.newPwd})
        if(res.code === 200){
            ElMessage.success('已成功修改，请重新登录')
            logout()
            router.push('/login')
        }
    } finally {
        submitingLoading.value = false
    }
}
</script>

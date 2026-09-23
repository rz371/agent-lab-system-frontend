<template>
    
    <el-card >
    <template #header>
      <div class="card-header">
        <span>用户管理</span>
      </div>
    </template>
    
    <div>
        <el-input placeholder="请输入账号或者昵称进行查询" v-model="paginationData.keyword"
        style="width:300px" 
        clearable
        @clear="handleSearch"
        @keyup.enter="handleSearch"
    ></el-input>
    <el-button type="primary" @click="handleSearch">查询</el-button>
    <el-button type="primary" @click="handleCreate">新增用户</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;margin: 10px 0; " v-loading="tableLoading">
        <el-table-column 
            v-for="item in tableColumns" 
            :prop="item.prop" 
            :label="item.label" 
            :min-width="item.width">
            <template #default="{row}">
                <span v-if="item.prop === 'status'">
                    <el-tag :type="row.status === 1 ? 'success' : 'danger'">
                        {{ row.status === 1 ? '正常' : '禁用' }}
                    </el-tag>
                </span>
                <span v-if="item.prop === 'role'">
                    <el-tag :type="row.role === 'student' ? 'success' : 'danger'">
                        {{ row.role === 'student' ? '学生' : '管理员' }}
                    </el-tag>
                </span>
                <p v-if="item.prop === 'avatar'" style="min-height: 50px;">
                    <el-image 
                     v-if="row.avatar" 
                        style="width: 50px; height: 50px;border-radius: 50%;" 
                        :src="row.avatar"  />
                </p>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
            <template #default="{row}">
                <el-button link type="primary" size="small" @click="handleUpdate(row)">
                    编辑
                </el-button>
                <el-button link type="primary" size="small" @click="handelDelete(row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end;">
        <el-pagination 
            :page-size="paginationData.size"
            layout="total,prev, pager, next"
            :total="total"
            background 
            size='small'
            :current-page="paginationData.page"
            @current-change="changeCurrent"
        />
    </div>
  </el-card>
  <el-dialog v-model="dialogFormVisible" :title="dialogForm.id ? '编辑用户':'新增用户'" width="500">
    <el-form :model="dialogForm" :rules="rules" ref="dialogRef">
      <el-form-item label="账号" prop="username">
        <el-input :disabled="!!dialogForm.id" v-model="dialogForm.username"  />
      </el-form-item>
      <el-form-item label="密码" v-if="!dialogForm.id" prop="password">
        <el-input  v-model="dialogForm.password" type="password" show-password/>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="dialogForm.name"  />
      </el-form-item>
      <el-form-item label="角色" >
        <el-select v-model="dialogForm.role" placeholder="Select" style="width: 240px">
            <el-option
                key="student"
                label="学生"
                value="student"
            />
            <el-option
                key="admin"
                label="管理员"
                value="admin"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="头像" >
        <el-upload
            class="avatar-uploader"
            :http-request="handleUploadAvatar"
            :show-file-list="false"
            accept="image/jpeg,image/png,image/gif,image/webp"
            :before-upload="beforeAvatarUpload"
        >
            <el-avatar shape="square"  :src="dialogForm.avatar" />
        </el-upload>
        
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model="dialogForm.email"  />
      </el-form-item>
      <el-form-item label="手机号" >
        <el-input v-model="dialogForm.phone"  />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="dialogForm.status" placeholder="Select" style="width: 240px">
            <el-option
                key="1"
                label="正常"
                :value="1"
            />
            <el-option
                key="2"
                label="禁用"
                :value="0"
            />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer="{row}">
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave(row)" :loading="dialogLoading">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import {getUserAll,deleteUser,createUser,updateUser} from '@/api/user_api'
import { ElMessage,ElMessageBox } from 'element-plus';
import { updateFileApi } from '@/api/file_api';

const tableColumns = [
    {
        prop:'username',
        label:'账号',
        width:'100px'
    },
    {
        prop:'name',
        label:'用户名',
        width:'100px'
    },
    {
        prop:'role',
        label:'角色',
        width:'100px'
    },
    {
        prop:'avatar',
        label:'头像',
        width:'100px'
    },
    {
        prop:'email',
        label:'邮箱',
        width:'100px'
    },
    {
        prop:'phone',
        label:'手机号',
        width:'100px'
    },
    {
        prop:'status',
        label:'状态',
        width:'100px'
    },
]
const tableLoading = ref(false)
const dialogFormVisible = ref(false)
const dialogLoading = ref(false)
const dialogRef = ref(false)
let tableData = reactive([])
const total = ref(0)
const dialogForm = reactive({
    name:'',
    role:'',
    avatar:'',
    email:'',
    phone:'',
    status:''
})
const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度应在 3 到 5 个字符之间', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password:[
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 3, max: 12, message: '密码长度 3-12 位', trigger: 'blur' },
    ],
})
const paginationData = reactive({
    page:1,
    size:10,
    keyword:''
})
const handleSearch = () => {
    getAllInfo()
}
const getAllInfo = async () => {
    tableLoading.value = true
    tableData = []
    try{
        console.log(paginationData);
        const res = await getUserAll(paginationData)
        if(res.code === 200){
            tableData = res.data?.list
            total.value = res.data?.total
            
        }
    } finally {
        tableLoading.value = false
    }
}

const changeCurrent = (val) => {
    paginationData.page = val
    getAllInfo()
}
// 重置
const resetForm = (obj) => {
    Object.assign(dialogForm,obj)
}
// 新增用户
const handleCreate = () => {
    dialogFormVisible.value = true
    resetForm({
        id:'',
        username:'',
        name:'',
        password:'',
        role:'',
        avatar:'',
        email:'',
        phone:'',
        status:''
    })
   
}

// 删除
const handelDelete = async (user) => {
    ElMessageBox.confirm(
        `是否确认删除用户-${user.username}`,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(() => {
        const res = deleteUser({'user_id':user.id})
        if(res.code === 200){
            ElMessage.success('已成功删除')
            getAllInfo()
        }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}
// 编辑
const handleUpdate = async(user) => {
    console.log(user);
    
    dialogFormVisible.value = true
    // dialogForm = {...user}
    resetForm({
        id:user.id,
        username:user.username,
        name:user.name,
        role:user.role,
        avatar:user.avatar,
        email:user.email,
        phone:user.phone,
        status:user.status
    })
    // console.log(user);
    
}
const handleSave = async () => {
    const valid = await dialogRef.value.validate().catch(() => false)
    if(!valid) return
    dialogLoading.value = true
    try {
        const res = dialogForm.id ?  await updateUser({'user_id':dialogForm.id,...dialogForm}) : await createUser(dialogForm)
        if(res.code === 200){
            ElMessage.success(dialogForm.id ? '编辑成功' : '新增成功')
            getAllInfo()
        }
    } finally {
        dialogLoading.value = false
    }
}
// 修改头像前先限制
const beforeAvatarUpload =  (file) => {
    const options = ['image/jpeg','image/png','image/gif','image/webp']
    if(!options.includes(file.type)){
        ElMessage.error('只能上传图片')
        return false
    }

    if(file.size / 1024 / 1024 > 2){
        ElMessage.error('上传图片大小不可以超过2M')
        return false
    }
    return true
    
}
// 修改头像
const handleUploadAvatar = async ({file}) => {
    try {
        const res = await updateFileApi(file)
        if(res.code === 200){
            dialogForm.avatar = res.data.url
        }
    } finally {

    }
}
onMounted(()=>{
    getAllInfo()
})

</script>

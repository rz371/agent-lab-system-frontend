<template>
    
    <el-card >
    <template #header>
      <div class="card-header">
        <span>实验室管理</span>
      </div>
    </template>
    <div>
        <el-input placeholder="请输入账号进行查询" v-model="paginationData.keyword"
        style="width:300px" 
        clearable
        @clear="handleSearch"
        @keyup.enter="handleSearch"
    ></el-input>
    <el-button type="primary" @click="handleSearch">查询</el-button>
    <el-button type="primary" @click="handleCreate">新增实验室</el-button>
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
                <span v-if="item.prop === 'open_time'">
                    {{ row.open_time  }} - {{ row.close_time }}
                </span>
                <p v-if="item.prop === 'img'" style="min-height: 50px;">
                    <el-image 
                     v-if="row.img" 
                        style="width: 50px; height: 50px;border-radius: 50%;" 
                        :src="row.img"  />
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
  <el-dialog v-model="dialogFormVisible" :title="dialogForm.id ? '编辑实验室':'新增实验室'" width="500">
    <el-form :model="dialogForm" label-position="left" label-width="auto" :rules="rules" ref="dialogRef">
      <el-form-item label="实验室名称" prop="name">
        <el-input v-model="dialogForm.name"  />
      </el-form-item>
      <el-form-item label="封面" >
        <el-upload
            class="avatar-uploader"
            :http-request="handleUploadAvatar"
            :show-file-list="false"
            accept="image/jpeg,image/png,image/gif,image/webp"
            :before-upload="beforeAvatarUpload"
        >
            <el-avatar shape="square"  :src="dialogForm.img" />
        </el-upload>
        
      </el-form-item>
      <el-form-item label="实验室描述" >
        <el-input v-model="dialogForm.description"  />
      </el-form-item>
      <el-form-item label="位置" >
        <el-input v-model="dialogForm.location"/>
      </el-form-item>
      <el-form-item label="容量" >
        <el-input-number v-model="dialogForm.capacity" :min="1"/>
      </el-form-item>
      <el-form-item label="开放时间" >
        <el-time-picker v-model="dialogForm.open_time"
        format="HH:mm"
        value-format="HH:mm"
        placeholder="选择时间" /> 
      </el-form-item>  
      <el-form-item label="关闭时间" >
        <el-time-picker v-model="dialogForm.close_time"
        format="HH:mm"
        value-format="HH:mm"
        placeholder="选择时间"  /> 
      </el-form-item>  
      <el-form-item label="状态" >
        <el-select v-model="dialogForm.status" placeholder="Select" style="width: 240px">
            <el-option
                key="0"
                label="禁用"
                :value="0"
            />
            <el-option
                key="1"
                label="启用"
                :value="1"
            />
        </el-select>
      </el-form-item>     
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="dialogLoading">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import {getLabAll,deleteLab,createLab,updateLab} from '@/api/lab_api'
import { ElMessage,ElMessageBox } from 'element-plus';
import { updateFileApi } from '@/api/file_api';

const tableColumns = [
    {
        prop:'name',
        label:'实验室账号',
        width:'100px'
    },
    {
        prop:'description',
        label:'描述',
        width:'100px'
    },
    {
        prop:'img',
        label:'封面',
        width:'100px'
    },
    {
        prop:'location',
        label:'位置',
        width:'100px'
    },
    {
        prop:'capacity',
        label:'容量',
        width:'100px'
    },
    {
        prop:'open_time',
        label:'开放时间',
        width:'100px'
    },
    
]
const tableLoading = ref(false)
const dialogFormVisible = ref(false)
const dialogLoading = ref(false)
const dialogRef = ref(null)
let tableData = reactive([])
const total = ref(0)
const dialogForm = reactive({
    name:'',
    description:'',
    img:'',
    location:'',
    capacity:0,
    open_time:'08:00',
    close_time:'18:00',
    status:1,
    
})
const rules = reactive({
  name: [
    { required: true, message: '请输入实验室名称', trigger: 'blur' },
   
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
// 获取所有数据
const getAllInfo = async () => {
    tableLoading.value = true
    tableData = reactive([])
    try{
        console.log(paginationData);
        const res = await getLabAll(paginationData)
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
        name:'',
        description:'',
        img:'',
        location:'',
        capacity:0,
        open_time:'08:00',
        close_time:'18:00',
        status:1,
    })
   
}

// 删除
const handelDelete = async (lab) => {
    ElMessageBox.confirm(
        `是否确认删除实验室-${lab.name}`,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(async () => {
        const res = await deleteLab({'lab_id':lab.id})
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
const handleUpdate = async(lab) => {
    console.log(lab);
    
    dialogFormVisible.value = true
    resetForm({
        id:lab.id,
        name:lab.name,
        description:lab.description,
        img:lab.img,
        location:lab.location,
        capacity:lab.capacity,
        open_time:lab.open_time,
        close_time:lab.close_time,
        status:lab.status
    })
    // console.log(lab);
    
}
const handleSave = async () => {
    const valid = await dialogRef.value.validate().catch(() => false)
    if(!valid) return
    dialogLoading.value = true
    try {
        const res = dialogForm.id ? 
                await updateLab({'lab_id':dialogForm.id,...dialogForm}) : 
                await createLab({'open_time':dialogForm.open_time,'close_time':dialogForm.close_time,...dialogForm})
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
            dialogForm.img = res.data.url
        }
    } finally {

    }
}
onMounted(()=>{
    getAllInfo()
})

</script>

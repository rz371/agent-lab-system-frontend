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
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import {getUserAll} from '@/api/user_api'
const tableLoading = ref(false)
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
let tableData = reactive([])
let total = ref(0)
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
// const changeSize = () => {
//     console.log('我改变了1',paginationData);
    
// }
const changeCurrent = (val) => {
    paginationData.page = val
    getAllInfo()

    
}
onMounted(()=>{
    getAllInfo()
})

</script>

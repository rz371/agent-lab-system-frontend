<template>

    <el-card >
        <template #header>
            <div class="card-header">
                <span>{{ currentLab?.name || '实验室'}}设备列表</span>
                <div>
                    <el-button type="primary" size="small">预约实验室</el-button>
                    <el-button type="" size="small" @click='handleReturn'>返回实验室列表</el-button>
                </div>
            </div>
        </template>
        
        <div class="desc">
            <p class="text">简介：{{ currentLab?.description || '--' }}</p>
            <p>
                <span class="text">位置：{{ currentLab?.location || '--' }}  |  </span> 
                <span class="text">容纳：{{ currentLab?.capacity || '--' }}人  |  </span>
                <span class="text">开放：{{ currentLab?.open_time || '--' }} - {{ currentLab?.close_time || '--' }}  </span>
            </p>
        </div>
        <el-table :data="tableData" empty-text="暂无设备" style="width: 100%;margin: 10px 0; " v-loading="tableLoading">
            <el-table-column 
                v-for="item in tableColumns" 
                :prop="item.prop" 
                :label="item.label" 
                :min-width="item.width">
                <template #default="{row}">
                    <span v-if="item.prop === 'status'">
                        <el-tag :type="row.status === 1 ? 'success' : 'danger'">
                            {{ row.status === 1 ? '正常' : '维修' }}
                        </el-tag>
                    </span>
                    <p v-if="item.prop === 'img'" style="min-height: 50px;">
                        <el-image 
                        v-if="row.img" 
                            style="width: 50px; height: 50px;border-radius: 50%;" 
                            :src="row.img"
                            :preview-src-list="[row.img]"
                            :preview-teleported="true"
                            />
                    </p>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="{row}">
                    <el-button link type="primary" size="small" @click="handleReview(row)">
                        预约
                    </el-button>
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
import { onMounted, ref,reactive, watch } from 'vue';
import {useRoute,useRouter} from 'vue-router'
import {descEquip} from '@/api/equip_api'
import {descLab} from '@/api/lab_api'
const route = useRoute()
const router = useRouter()
const tableData = reactive([])
const tableLoading = ref(false)
const total = ref(0)
const paginationData = reactive({
    page:1,
    size:10
})
const tableColumns = [
    {
        prop:'img',
        label:'图片',
        width:'100px'
    },
    {
        prop:'name',
        label:'设备名称',
        width:'100px'
    },
    {
        prop:'spec',
        label:'型号规格',
        width:'100px'
    },
    {
        prop:'quantity',
        label:'数量',
        width:'100px'
    },
    {
        prop:'status',
        label:'状态',
        width:'100px'
    } 
]
// const currentLab = reactive({})
const currentLab = ref({})
const currentId = ref(null)
const getEquipList = async () => {
    tableLoading.value = true
    try{
        const res = await descEquip(Number(currentId.value),{...paginationData})
        tableData.length = 0
        if(res.code === 200){
            tableData.push(...res.data.list)
            total.value = res.data.total
        }
    } finally {
        tableLoading.value = false
    }
}
const getLabCurrent = async () => {
    // 当前实验室
  try{
    const res = await descLab(currentId.value)
    if(res.code === 200){
        // 合并属性，保留响应式
        // Object.assign(currentLab,res.data)
        // 或者，把reactive 变成 ref 
        currentLab.value = {...res.data}
    }
  } finally {

  }
}
const changeCurrent = (val) => {
    paginationData.page = val
    getEquipList()
}
const handleReview = () => {
    // 预约
}
const handleReturn = () => {
    // 返回实验室列表
    router.push('/manager/lablist')
}


watch(
 () => route.params.id,
 (newId) => {
    if(!newId) return
    currentId.value = Number(newId)
    getLabCurrent()
    getEquipList()
 } ,
 {immediate:true}  
)
</script>

<style scoped>
.card-header{
    display: flex;
    justify-content: space-between;
}
.desc{
    color:#807d7f;
    background-color: rgb(244, 244, 246);
    padding: 10px;
    border-radius: 10px;
    
}
.text{
    font-size: 13px;
}
</style>
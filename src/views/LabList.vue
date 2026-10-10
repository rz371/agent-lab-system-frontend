<template>
    
    <el-card >
    <template #header>
      <div class="card-header">
        <span>实验室列表</span>
      </div>
    </template>
    <div>
        <el-input placeholder="请输入名称查询" v-model="paginationData.keyword"
            style="width:300px" 
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
        ></el-input>
        <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>
    <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="6" v-for="item in labList" :key="item.id" style="margin-bottom: 10px;">
            <el-card >
                <img :src="item.img" alt="" >
                <h4>{{ item.name }}</h4>
                <p class="text">位置：{{ item.location || '--'}}</p>
                <p class="text">容量：{{ item.capacity || '--' }}</p>
                <p class="text">开放：{{ item.open_time &&  item.close_time ? `${item.open_time} - ${item.close_time}` : '--'}}</p>
                <div style="margin-top: 10px;width:100%">
                    <el-button size="small" style='width: 49%;' @click="handleShowEquip(item)">查看设备</el-button>
                    <el-button type="primary" size="small" style='width: 45%;'>预约</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <div style="display: flex;justify-content: flex-end;">
        <el-pagination 
            :page-size="paginationData.size"
            layout="total,prev, pager, next"
            :total="labList.length"
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
import {getLabAll} from '@/api/lab_api'
import {useRouter} from 'vue-router';
const router = useRouter()
const paginationData = reactive({
    page:1,
    size:10,
    keyword:''
})
const labList = reactive([])
const changeCurrent = (val) => {
    paginationData.page = val
    getLabList()
}
const getLabList = async () => {
   const res = await getLabAll(paginationData)
   if(res.code === 200){
    labList.length = 0 // 清空了
    labList.push(...res.data.list)
    
   }
}
const handleSearch = () => {
    getLabList()
}
const handleShowEquip = (lab) => {
    // 查看设备
    router.push(`/manager/equipList/${lab.id}`)
}
onMounted(() => {
    getLabList()
})
</script>

<style scoped>
.text{
    font-size: 13px;
    color:#807d7f;
    margin:3px 0;
}
</style>

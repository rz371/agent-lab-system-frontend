<template>
    <el-dialog :model-value="dialogFormVisible" 
    :title="dialogForm.id ? '编辑实验室':'新增实验室'" width="500"
    @close="handleCancel"
    >
    <el-form :model="dialogForm" label-position="right" label-width="auto" 
    :rules="rules" ref="dialogRef">
      <el-form-item  label="实验室" prop="labName">
        <el-input :disabled="true" v-model="dialogForm.labName"  />
      </el-form-item>
      <el-form-item label="设备" prop="equipName">
        <el-input :disabled="true" v-model="dialogForm.equipName"  />
      </el-form-item>
      <el-form-item label="预约日期" prop="date">
        <el-date-picker v-model="dialogForm.date"
        type="date"
        value-format="YYYY-MM-DD"
        format="YYYY-MM-DD"
        placeholder="请选择日期" /> 
      </el-form-item>  
      <el-form-item label="开始时间" >
        <el-time-picker v-model="dialogForm.start_time"
        format="HH:mm"
        value-format="HH:mm"
        placeholder="选择时间"  /> 
      </el-form-item> 
       <el-form-item label="结束时间" >
        <el-time-picker v-model="dialogForm.end_time"
        format="HH:mm"
        value-format="HH:mm"
        placeholder="选择时间"  /> 
      </el-form-item>   
      <el-form-item label="备注">
        <el-input type="textarea" placeholder="备注" v-model="dialogForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="dialogLoading">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { createReserve} from '@/api/reservation'
import { ElMessage } from 'element-plus';
const emit = defineEmits(['changeDialog'])
const handleCancel = () => {
    emit('changeDialog',false)
}
const props = defineProps(['dialogFormVisible','labName','labId',
    'equipName','equipId'
])

const dialogLoading = ref(false)
const dialogForm = reactive({
    lab_id:null,
    labName:'',
    equipName:'',
    date:'',
    start_time:'09:00',
    end_time:'18:00',
    remark:'',
    status:0
})
const dialogRef = ref(null)
const rules = {
    date:[
         { required: true, message: '请选择预约日期', trigger: 'blur' },
    ]
}

const handleSave = async () => {
    await dialogRef.value.validate(async (valid) =>{
        if (!valid) return 
        dialogLoading.value = true
        try{
            const res =  await createReserve(dialogForm)
            if(res.code === 200){
                ElMessage.success('新增成功')
            }
        } finally {
            dialogLoading.value = false
        }
    })
    
   
   
}
watch(() => props.dialogFormVisible,(val)=>{
    if(val){
        Object.assign(dialogForm,{
            // labName:'',
            equipName:'',
            date:'',
            start_time:'09:00',
            end_time:'18:00',
            remark:'',
            status:0
        })
    }
})
watch(()=>props.labId,(val) =>{
    dialogForm.labName = props.labName
    dialogForm.lab_id = props.labId 
})
watch(()=>props.equipId,(val) =>{
    dialogForm.equipName = props.equipName
    dialogForm.equip_id = props.equipId 
})


</script>

<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="mb-3">
                    <v-card-title><h1 class="text-center">ผู้รับการประเมินผล</h1></v-card-title>
                    <v-card-text>
                        <p>ชื่อ-สกุล: {{ header.fname }} {{ header.lname }}</p>
                        <p>รอบการประเมินที่: {{ header.round_sys }} ปี:{{ header.year_sys }}</p>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-title>
                        <h1 class="text-center text-h5">เพิ่มกรรมการ</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <v-form @submit.prevent="saveMember">
                            <v-row v-for="(c,index) in List">
                                <v-col cols="12" md="6">
                                    <v-select :label="`กรรมการประเมินคนที่: ${index+1}`" v-model="c.id_member" :items="MEMBER(index).map((t)=>({title:`${t.fullname_commit}`,value:t.id_member}))"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select :label="`ตำแหน่งกรรมการประเมินคนที่: ${index+1}`" v-model="c.role" :items="ROLE(index)"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-2" color="primary" type="submit">บันทึก</v-btn>
                                        <v-btn class="text-center ma-2" color="error" type="reset">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <!-- <v-text-field class="mt-3" v-model="search" prepend-inner-icon="mdi-magnify"></v-text-field> -->
                        <v-table class="mt-3">
                            <thead>
                                <tr>
                                    <th class="border text-center">ลำดับ</th>
                                    <th class="border text-center">กรรมการประเมิน</th>
                                    <th class="border text-center">ตำแหน่ง</th>
                                    <th class="border text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in List" :key="items.id_commit">
                                    <td class="border text-center">{{ index+1 }}</td>
                                    <td class="border text-center">{{ nameOf(items.id_member) }}</td>
                                    <td class="border text-center">{{ items.role }}</td>
                                    <td class="border text-center">
                                        <center>
                                            <v-btn class="text-center text-white ma-2" color="error" @click="del(items.id_eva)">ลบ</v-btn>
                                        </center>
                                    </td>
                                </tr>
                                <!-- <tr>
                                    <td class="text-center text-red" v-if="result.length === 0" colspan="12">ไม่พบข้อมูล</td>
                                </tr> -->
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { api, staff } from '~/API/base'

const error = ref<Record<string,string>>({})
const pic_user = ref<File | null>(null)
const search = ref('')
const header = ref([])
const people = ref([])
const role = ['ประธาน','กรรมการ','เลขา']
const List = ref([
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''}
])

const id_eva = useRoute().params.id_eva
const token = import.meta.client ? localStorage.getItem('token'):null

const saveMember = async()=>{

    try {
        await axios.post(`${staff}/eva/save`,f,{headers:{Authorization:`Bearer ${token}`}})
        alert("ทำรายการสำเร็จ")
        await reset()
        await fetch()
    } catch (error) {
        console.error("Error save",error);
        
    }

}

const fetch = async()=>{
    try {
        const res = await axios.get(`${staff}/eva/show`,{headers:{Authorization:`Bearer ${token}`}})
        dataResult.value = res.data
        const res2 = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        eva.value = res2.data
        const res3 = await axios.get(`${staff}/system/show`,{headers:{Authorization:`Bearer ${token}`}})
        round.value = res3.data
    } catch (error) {
        console.error("Error get",error);
        
    }
}

const result = computed(()=>{

    if(!search.value)return dataResult.value

    const s = search.value.toLowerCase()

    return dataResult.value.filter((items:any)=>{

        return(
            items.fname?.toLowerCase().includes(s) ||
            items.lname?.toLowerCase().includes(s) 
        )

    })

})

const formatDate = (dateStr:string)=>{
    if(!dateStr)return '-'
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())

    return `${day}/${month}/${year}`
}

const edit = (items:any)=>{
    form.value = {...items}
}

const del = async(id_eva:number)=>{
    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        await axios.delete(`${staff}/eva/delete/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()
        await reset()
    } catch (error) {
        console.error("error delete",error);
        
    }
}

const go = (id_eva:number)=>{

    navigateTo({path:`/Staff/commit-eva-${id_eva}`})

}

onMounted(fetch)

</script>

<style scoped>

</style>
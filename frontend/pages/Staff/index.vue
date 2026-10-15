<template>
   <v-container>
    <v-row justify="center">
        <v-col cols="12" md="12">
            <v-sheet class="pa-3" rounded elevation="5">
                <h1 class="text-center">Dashboard-ฝ่ายบุคลากร</h1>
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box" :key="b">
                        <v-card class="pa-3" elevation="5">
                            <h4 class="text-center">{{ b.title }}</h4>
                            <h4 class="text-center">{{ b.value }}</h4>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box2" :key="b">
                        <v-card class="pa-3" elevation="5">
                            <h4 class="text-center">{{ b.title }}</h4>
                            <h4 class="text-center">{{ b.value }}</h4>
                        </v-card>
                    </v-col>
                </v-row>
            </v-sheet>
            <v-sheet class="pa-3 mt-3" elevation="5" rounded>
                <h1 class="text-center">รายชื่อผู้รับการประเมินผล</h1>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-card class="pa-3" elevation="5">
                            <v-table class="mt-3">
                                <thead>
                                    <tr>
                                        <th class="border text-center">ลำดับ</th>
                                        <th class="border text-center">ชื่อ-สกุล</th>
                                        <th class="border text-center">อีเมล</th>
                                        <th class="border text-center">ชื่อผู้ใช้</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(items,index) in result" :key="items.id_member">
                                        <td class="border text-center">{{ index+1 }}</td>
                                        <td class="border text-center">{{ items.fname }} {{ items.lname }}</td>
                                        <td class="border text-center">{{ items.email }}</td>
                                        <td class="border text-center">{{ items.username }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-center text-red" v-if="result.length === 0" colspan="12">ไม่พบข้อมูล</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>
    </v-row>
   </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';

const token = import.meta.client ? localStorage.getItem('token'):null
const box = ref([])
const box2 = ref([])
const result = ref([])
const fetch=async()=>{
    try {
        
        const res = await axios.get(`${api}/dash/staff`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
        box2.value = res.data.box2
        const res2 = await axios.get(`${staff}/member/showE`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res2.data
    } catch (error) {
        console.error("Error get",error);
        
    }
}


onMounted(fetch)
</script>

<style scoped>

</style>
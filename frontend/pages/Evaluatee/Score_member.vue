<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="font-weight-bold">ผลการประเมินของผู้รับการประเมินผล</h1>
                    <v-card class="pa-5 py-4" :elevation="5" rounded>
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี : {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-tabel class="table">
                                <tr >
                                    <th class="boder pa-1 bg-grey" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="boder pa-1 bg-grey" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="boder pa-1 bg-grey" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="boder pa-1 bg-grey" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="boder pa-1 bg-grey" style="width: 10%;">รายละเอียด</th>
                                    <th class="boder pa-1 bg-grey" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate" >
                                    <td class="boder pa-1 text-center" style="width: 10%;">{{ indicate.name_indicate }}</td>
                                    <td class="boder pa-1 text-center" style="width: 10%;">{{ indicate.detail_indicate }}</td>
                                    <td class="boder pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate }}</td>
                                    <td class="boder pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate*4 }}</td>
                                    <td class="boder pa-1 text-center" style="width: 10%;">{{ indicate.detail_eva }}</td>
                                    <td class="boder pa-1 text-center" style="width: 10%;">{{ indicate.score_member*indicate.point_indicate }}</td>
                                </tr>
                            </v-tabel>
                        </v-col>
                    </v-row>
                    <div class="mt-5 text-center">
                        <v-card color="green"  >คะแนนรวม :</v-card>
                    </div>
                </v-form>
                <v-alert type="success" v-else-if="user.status_eva === 1" color="warning" variant="tonal">ยังไม่ได้ประเมินตัวเอง</v-alert>
                <v-alert type="success" v-else color="error" variant="tonal">ไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { eva } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])


const fetch =async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fetchTopic =async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/score_member/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}

onMounted(async()=>{
    Promise.all([fetch(),fetchTopic()])
})


</script>

<style scoped>

</style>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="font-weight-bold">ผลการประเมินของกรรมการประเมิน</h1>
                    <v-card class="pa-5 py-4" :elevation="5" rounded>
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี : {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-tabel class="table">
                                <tr >
                                    <th class="border pa-1 bg-grey" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="border pa-1 bg-grey" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="border pa-1 bg-grey" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="border pa-1 bg-grey" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="border pa-1 bg-grey" style="width: 10%;">ประธาน</th>
                                    <th class="border pa-1 bg-grey" style="width: 10%;">กรรมการ</th>
                                    <th class="border pa-1 bg-grey" style="width: 10%;">เลขา</th>
                                    <th class="border pa-1 bg-grey" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate" >
                                    <td class="border pa-1 text-center " style="width: 10%;">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-1 text-center " style="width: 10%;">{{ indicate.detail_indicate }}</td>
                                    <td class="border pa-1 text-center " style="width: 10%;">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-1 text-center " style="width: 10%;">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-1 text-center " style="width: 10%;">{{ scores[indicate.id_indicate]?. a ?? 'รอประธานประเมิน' }}</td>
                                    <td class="border pa-1 text-center " style="width: 10%;">{{ scores[indicate.id_indicate]?. b ?? 'รอกรรมการประเมิน' }}</td>
                                    <td class="border pa-1 text-center " style="width: 10%;">{{ scores[indicate.id_indicate]?. c ?? 'รอเลขาประเมิน' }}</td>
                                    <td class="border pa-1 text-center " style="width: 10%;">{{ (((scores[indicate.id_indicate]?. a ?? 0)+(scores[indicate.id_indicate]?. b ?? 0)+(scores[indicate.id_indicate]?. c ?? 0))/3).toFixed(2) }}</td>
                                </tr>
                            </v-tabel>
                        </v-col>
                    </v-row>
                    <div class="mt-5 text-end">
                        <v-card color="green"  >คะแนนรวมสุทธิ : {{ ((user.total_commit)/3).toFixed(2) }} คะแนน</v-card>
                    </div>
                    <div class="mt-5">
                        <v-card class="pa-5 py-4" :elevation="5" rounded>
                            <label for="">ข้อเสนอแนะของกรรมการ</label>
                            <v-row>
                                <v-col cols="12" v-for="commit,c in commits" :key="commit.id_commit">
                                        {{ c+1 }}.{{ commit.level_commit }} : {{ commit.detail_commit || 'รอการประเมิน' }}
                                </v-col>
                            </v-row>
                        </v-card>
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
import { commit, eva, staff } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])
const scores = ref<any>([])
const commits = ref<any>([])

const id_eva = useRoute().params.id_eva
const fetch =async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/score_member/user/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fetchTopic =async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/score_commit/topic/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fetchCommit =async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/score_commit/commit/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        commits.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fetchScore =async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${staff}/score_commit/score/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        scores.value = res.data.scores
    } catch (error) {
        console.error('Error Get user',error)
    }
}

onMounted(async()=>{
    Promise.all([fetch(),fetchTopic(),fetchCommit(),fetchScore()])
})


</script>

<style scoped>
:root{
    background-color: #fff;
}
    @media print {
        .v-app-bar,.v-btn.no-p{
            display: none !important;
            margin: 0 !important;
            margin-top: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }
    }
</style>
<template>
    <v-container>
        <v-card>
            <v-sheet class="pa-5 text-center">
                <h1 class="font-weight-bold">DashBoard - Evaluatee</h1>
            </v-sheet>
            <v-card-text>
                <v-row>
                    <v-col md="4" cols="12" v-for="b in box" :key="b">
                        <v-card :elevation="5" rounded class="pa-5 py-4" >
                            <div class="text-center text-h5">{{ b.title }}</div>
                            <div class="text-center text-h5">{{ b.value }}</div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card class="mt-3 pa-5 py-4" rounded :elevation="5">
            <v-sheet class="pa-5 text-center">
                <h2 class="font-weight-bold">รอบการประเมินทั้งหมด</h2>
            </v-sheet>
            <v-card-text>
                <v-table class="table">
                    <tr >
                        <th  class="bg-grey border pa-1" style="width: 10%;">ลำดับ</th>
                        <th class="bg-grey border pa-1" style="width: 10%;">ชื่อผู้ประเมิน</th>
                        <th class="bg-grey border pa-1" style="width: 10%;">รอบการประเมิน</th>
                        <th class="bg-grey border pa-1" style="width: 10%;">ปีที่ประเมิน</th>
                    </tr>
                    <tr v-for="(round,r) in rounds" :key="round">
                        <td class="border pa-1 text-center" style="width: 10%;">{{ r+1 }}</td>
                        <td class="border pa-1 text-center" style="width: 10%;">{{ round.fname }}-{{ round.lname }}</td>
                        <td class="border pa-1 text-center" style="width: 10%;">{{ round.round_sys }}</td>
                        <td class="border pa-1 text-center" style="width: 10%;">{{ round.year_sys }}</td>
                    </tr>
                </v-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import {api,eva} from '~/API/base'

const box = ref([])
const rounds = ref([])
const id_eva = useRoute().params.id_eva
const fetch = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${api}/dash/eva`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
        const res2 = await axios.get(`${eva}/table`,{headers:{Authorization:`Bearer ${token}`}})
        rounds.value = res2.data
        console.log(rounds)
    } catch (error) {
        console.error('Error Get BOX',error)
    }
}
onMounted(fetch)
</script>

<style scoped>

</style>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form @submit.prevent="saveScore">
                    <h1 class="font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="pa-5 py-4" :elevation="5" rounded>
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมินที่ : {{ user.round_sys }} ปี : {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic">
                        <v-col cols="12">
                            <h1 class="font-weight-bold">{{ t+1 }}.{{ topic.name_topic }}</h1>
                            <v-card class="py-2 pa-5" :elevation="5" rounded>
                                <v-row v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <v-col cols="12">
                                        {{ t+1 }}.{{ i+1 }} {{ indicate.name_indicate }} รายละเอียดตัวชี้วัด : {{ indicate.detail_indicate }} น้ำหนักคะแนน : {{ indicate.point_indicate }} คะแนนเต็ม : {{ indicate.point_indicate*5 }}
                                        <v-textarea class="mt-4" rows="2" label="คำอธิบายเพิ่มเติม(ถ้ามี)" v-model="indicate.detail_eva" variant="solo-filled" ></v-textarea>
                                        <v-file-input label="*** รองรับเฉพาะนามสกุลไฟล์ .png .jpg .pdf *** " v-model="indicate.file_eva" variant="solo-filled" @change="onFilechange($event,topic.id_topic,indicate.id_indicate)" accept=".png,.jpg,.pdf" ></v-file-input>
                                        <v-select v-if="indicate.check_indicate === 'y'" variant="solo-filled" label="ใส่คะแนน 1-4 " :items="[1,2,3,4]" v-model="indicate.score"  ></v-select>
                                        <v-text-field v-else variant="solo-filled" label="ใส่คะแนน 1-4 " type="number" @input="indicate.score > 4 ? indicate.score = 4 :null" :items="[1,2,3,4]" v-model="indicate.score"  ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                    <div class="mt-5 text-center">
                        <v-btn color="blue" type="submit" >บันทึกคะแนน</v-btn>
                    </div>
                </v-form>

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
        const res = await axios.get(`${eva}/selfeva/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}

onMounted(async()=>{
    Promise.all([fetch(),fetchTopic()])
})

const fileMap = ref<Record<string,File>>({})
const onFilechange = (event:Event,id_topic:number,id_indicate:number)=>{
    const file = (event.target as HTMLInputElement)?.files?.[1]
    if(!file)return
    fileMap.value[`${id_topic}-${id_indicate}`] = file
}

const saveScore = async()=>{
    const token = localStorage.getItem('token')
    const formData = new FormData()
    const allScore = topics.value.flatMap((t:any)=>
        t.indicates.map((i:any)=>{
            const key = `${t.id_topic}-${i.id_indicate}`
            const file = fileMap.value[key]
            if(file)formData.append(`file_${key}`,file)
            return{
                id_topic:t.id_topic,
                id_indicate:i.id_indicate,
                score:i.score,
                detail_eva:i.detail_eva,
                file_key:file ? `file_${key}` :null,
            }
        })
    )
    if(allScore.some((s:any)=> !s.score)){
        alert('กรุณากรอกคะแนนให้สมบรูณ์')
        return
    }
    formData.append('score',JSON.stringify(allScore))
    try {
        await axios.post(`${eva}/selfeva/save`,formData,{headers:{Authorization:`Bearer ${token}`}})
        alert('ประเมินสำเร็จ')
        Promise.all([fetch(),fetchTopic()])
    } catch (error) {
        console.error('Error post Score',error)
    }
}

</script>

<style scoped>

</style>
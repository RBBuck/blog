<template>
    <div>
        <n-button @click="showAddModel = true">添加</n-button>
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in categoryList">
                    <td>{{ category.id }}</td>
                    <td>{{ category.name }}</td>
                    <td>
                        <n-space>
                            <n-button @click="toUpdate(category)">修改</n-button>
                            <n-button @click="deleteCategory(category)">删除</n-button>
                        </n-space>
                    </td>
                </tr>

            </tbody>
        </n-table>
                                            <!-- 添加 -->
        <n-modal v-model:show="showAddModel" preset="dialog" title="Dialog">
            <template #header>
                <div>添加分类</div>
            </template>
            <div>
                <n-input v-model:value="addCategory.name" type="text" placeholder="请输入名称" />
            </div>
            <template #action>
                <div>
                    <n-button @click="add">提交</n-button>
                </div>
            </template>
        </n-modal>
                                   <!-- 修改 -->
        <n-modal v-model:show="showUpdateModel" preset="dialog" title="Dialog">
            <template #header>
                <div>修改分类</div>
            </template>
            <div>
                <n-input v-model:value="updateCategory.name" type="text" placeholder="请输入名称" />
            </div>
            <template #action>
                <div>
                    <n-button @click="update">提交</n-button>
                </div>
            </template>
        </n-modal>


    </div>
</template>

<script  setup>

import { AdminStore } from '../../store/AdminStore'
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const message = inject("message")
const dialog = inject("dialog")
const axios = inject("axios")

const adminStore = AdminStore()

const showAddModel = ref(false)
const showUpdateModel = ref(false)

const categoryList = ref([])
const addCategory = reactive({
    name: ""
})

const updateCategory = reactive({
    id:0,
    name: ""
})

onMounted(() => {
    loadDatas()
})

const loadDatas = async () => {
    let res = await axios.get("/category/list")
    categoryList.value = res.data.rows
}
//添加功能区
const add = async () => {
    let res = await axios.post("/category/_token/add", { name: addCategory.name })//需要每次登录验证所以在main中添加拦截器
    if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)//添加成功的弹窗
    } else {
        message.error(res.data.msg)
    }
    showAddModel.value = false;
}

const toUpdate = async (category) =>{
    showUpdateModel.value = true //1.当我点击toupdata的按钮式修改框会出现
    updateCategory.id = category.id//2.修改框里会出现我本来的id赋值给要修改的id
    updateCategory.name = category.name
}
//更新功能区  提交数据
const update = async ()=>{//3.点击跟新之后 先传给服务端然后更新
    let res = await axios.put("/category/_token/update", { id:updateCategory.id, name: updateCategory.name })
    if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
    showUpdateModel.value = false;
}
//删除功能区
const deleteCategory = async (category) => {

dialog.warning({
    title: '警告',
    content: '是否要删除',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
        let res = await axios.delete(`/category/_token/delete?id=${category.id}`)
        if (res.data.code == 200) {
            loadDatas()
            message.info(res.data.msg)
        } else {
            message.error(res.data.msg)
        }
    },
    onNegativeClick: () => { }
})



}

</script>

<style lang="scss" scoped>
</style>
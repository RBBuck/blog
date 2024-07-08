<template>
    <div class="login-panel">
        <n-card title="管理后台登录">
           <n-form :rules="rules" :model="admin"> <!-- 制定规则验证双向绑定 -->
                <n-form-item path="account" label="账号"><!-- 根据path的值判定 -->
                    <n-input v-model:value="admin.account" placeholder="请输入账号" />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="admin.password" type="password" placeholder="请输入密码" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-checkbox v-model:checked="admin.rember" label="记住我" />
                <n-button @click="login">登录</n-button>
            </template>
        </n-card>
    </div>
  </template>
  
  <script  setup>
  //引入vue3方法
  import { ref, reactive, inject } from 'vue'
  import { AdminStore } from '../store/AdminStore'
  import { useRouter,useRoute } from 'vue-router'

//   //注入全局APIinject
  const message = inject("message")
  const axios = inject("axios")//引入后端的端口
  const adminStore = AdminStore()
  const router = useRouter()
  const route = useRoute()


  /**验证表单规则 */
  let rules = {
    account: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 3, max: 12, message: "账号长度在 3 到 12 个字符", trigger: "blur" },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
    ],
  };
  
   const admin = reactive({
    account: localStorage.getItem("account") || "",//绑定input组件
  password: localStorage.getItem("password") || "",
  rember: localStorage.getItem("rember") == 1 || false
   })

  
//   /**登录 */
  const login = async () => {
    let result = await axios.post("/admin/login", {
        account: admin.account,
        password: admin.password
    });
    if (result.data.code == 200) {//登录成功code报200所以进行判断
        adminStore.token = result.data.data.token//注意控制台的路径  把值给adminStore
        adminStore.account = result.data.data.account
        adminStore.id = result.data.data.id
  
       if(admin.rember){//记住我功能实现
          localStorage.setItem("account", admin.account)
          localStorage.setItem("password", admin.password)
          localStorage.setItem("rember", admin.rember ? 1 : 0)//true为1

       }

       router.push("/dashboard/home")

        message.info("登录成功")
     } else {
        message.error("登录失败")
     }
      //console.log(result)检查登录的状态
  }
  
  </script>
  
  <style lang="scss" scoped>
  .login-panel {
    width: 500px;
    margin: 0 auto;
    margin-top: 130px;
  }
  </style>
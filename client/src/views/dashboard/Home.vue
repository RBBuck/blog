<template>
       <h1>
        欢迎来到我的博客后台
       </h1>
   


        <div class="footer">
            <div>Power by XXXX</div>
            <div>XICP备XXXXX号-1</div>
        </div>
   
</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

</script>

<style lang="scss" scoped>
 h1{
     text-align: center;
     
 }
  .footer{
    position: absolute;bottom: 0px;
    left: 50%;-webkit-transform: translatex(-50%);transform:translatex(-50%);
  }
</style>
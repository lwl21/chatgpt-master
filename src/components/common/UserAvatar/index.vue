<script setup lang='ts'>
/* eslint-disable*/
import {mgr} from "@/utils/oidc-client";
import { NAvatar ,useMessage} from 'naive-ui'
import { useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
//import { isString } from '@/utils/is'
import {storeToRefs} from "pinia";
const ms=useMessage()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const handleLogin=function (){
		mgr.createSigninRequest({ state: { returnUrl: '/' } }).then((req) => {
			ms.warning("即将跳转到登录页面")
			setTimeout(()=>{
				location.href = req.url
			},500)
	})
}
if(localStorage.getItem("token")) ms.success("登录成功")

</script>

<template>
  <div class="flex items-center overflow-hidden">
    <div class="w-10 h-10 overflow-hidden rounded-full shrink-0 " >
      <template v-if="userInfo">
        <NAvatar
          size="large"
          round
          :src="userInfo.avatar"
          :fallback-src="defaultAvatar"

        />
      </template>
      <template v-else>
        <NAvatar size="large" round :src="defaultAvatar" />
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-2">
      <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap" v-if="userInfo">
                {{ userInfo.nickName}}
      </h2>
			<!-- <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap cursor-pointer" @click="handleLogin" v-if="!userInfo">
				登录
			</h2> -->
      <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
        <!--        <span
          v-if="isString(userInfo.description) && userInfo.description !== ''"
          v-html="userInfo.description"
        /> -->
      </p>
    </div>
  </div>
</template>

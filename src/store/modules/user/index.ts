/* eslint-disable*/
import { defineStore } from 'pinia'

import {getUserData} from "@/api";

//import {mgr} from "@/utils/oidc-client";

export const useUserStore = defineStore('user-store', {
	state:()=> {  // 存放的就是模块的变量
		return {

			userInfo:JSON.parse(localStorage.getItem("userInfo") as string)
		}
	},
		actions: {
    updateUserInfo() {
			getUserData().then(res=>{
				localStorage.setItem("userInfo",JSON.stringify(res.data))
				this.userInfo =res.data
			})
    },
			clearUserInfo() {
       this.userInfo= {}
				localStorage.removeItem("userInfo")
			},
  },
})

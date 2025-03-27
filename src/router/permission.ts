/* eslint-disable*/
import type { Router } from 'vue-router'

import {useUserStore} from "@/store";
export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
  //如果有token则使用否则跳到登录页面

    if (localStorage.getItem('token')) {
			useUserStore().updateUserInfo()
			next()
    }
    else {
			next()

    }
  })
}


/* eslint-disable*/
import {ss} from '@/utils/storage'
import {getUserData} from "@/api";


const LOCAL_NAME = 'userInfo'

export interface UserInfo {
  avatar: string
  name: string
  description: string
  openAiKey: string
}

export interface UserState {
  userInfo: UserInfo
}

export async function defaultSetting() {
	let res= await getUserData()
	return  res.data
}



export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}

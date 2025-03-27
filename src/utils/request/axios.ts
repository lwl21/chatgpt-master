/* eslint-disable*/
import axios, { type AxiosResponse } from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})

service.interceptors.request.use(
  (config) => {
		const token = JSON.parse(localStorage.getItem("token") as string)
    if (token)
		  config.headers.Authorization = token.token_type+' '+token.access_token
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

service.interceptors.response.use(

  (response: AxiosResponse): AxiosResponse => {
/*		if (response.data.status === 401){
			return response
		}*/

    if (response.status === 200)
      return response
		//401跳到登录页面

    throw new Error(response.status.toString())
  },
  (error) => {

    return Promise.reject(error)
  },
)

export default service

import { create as createAxiosInstance } from 'axios'

const BASE_URL = process.env.VUE_APP_API_URL

const instance = createAxiosInstance({
  baseURL: BASE_URL
})

export default instance
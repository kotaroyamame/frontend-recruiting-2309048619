import axios from 'axios'
import type { Form1, HTTP_RESPONCE } from './apiTypes'
const API_URL = 'https://httpstat.us/201'
export async function Form1__Post (formData: Form1): Promise<HTTP_RESPONCE> {
  const res = await axios.post(API_URL, formData)
  return {
    status: res.status,
    success: res.status === 200,
    statusText: res.statusText || ''
  }
}

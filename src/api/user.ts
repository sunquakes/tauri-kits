import { invoke } from '@tauri-apps/api/core'
import CryptoJS from 'crypto-js'
import { datetime } from '../utils/date'

interface ApiResponse<T> {
  code: number
  message: string
  data: T | null
}

interface PageResponse<T> {
  current: number
  page_size: number
  total: number
  records: T[]
}

export async function pageList(current: number, pageSize: number, _where?: any[][], _orderBy?: string): Promise<any> {
  const result = await invoke<ApiResponse<PageResponse<any>>>('api_user_list', { page: current, pageSize })
  if (result.code !== 200) {
    throw new Error(result.message)
  }
  const data = result.data
  return {
    current: data?.current || current,
    pageSize: data?.page_size || pageSize,
    total: data?.total || 0,
    records: data?.records || []
  }
}

export async function login(username: string, password: string): Promise<any> {
  const result = await invoke<ApiResponse<any>>('api_user_login', { username, password })
  if (result.code !== 200) {
    if (result.message === '用户名不存在') {
      return new Error('login.username_not_exist')
    }
    if (result.message === '密码错误') {
      return new Error('login.wrong_password')
    }
    return new Error(result.message)
  }
  return result.data
}

export async function del(where: any[][]): Promise<any> {
  const id = where[0][1]
  const result = await invoke<ApiResponse<any>>('api_user_delete', { id })
  if (result.code !== 200) {
    throw new Error(result.message)
  }
}

export async function edit(id: number, data: any): Promise<any> {
  const result = await invoke<ApiResponse<any>>('api_user_update', { id, user: data })
  if (result.code !== 200) {
    throw new Error(result.message)
  }
  return result.data
}

export async function add(data: any): Promise<any> {
  const passwordMd5 = CryptoJS.MD5(data.password).toString()
  data.password = passwordMd5
  data.create_time = datetime(new Date())
  data.state = data.state ?? 1  // 默认启用状态
  
  const result = await invoke<ApiResponse<number>>('api_user_create', { user: data })
  if (result.code !== 200) {
    throw new Error(result.message)
  }
  return result.data
}

export async function doCount(_where?: any[][]): Promise<number> {
  const result = await pageList(1, 1)
  return result.total
}
import { invoke } from '@tauri-apps/api/core'

interface DbResult<T> {
  success: boolean
  message: string
  data: T | null
}

interface PageResult<T> {
  current: number
  page_size: number
  total: number
  records: T[]
}

export async function execute(sql: string): Promise<void> {
  const result = await invoke<DbResult<null>>('db_execute', { sql })
  if (!result.success) {
    throw new Error(result.message)
  }
}

export async function save(tableName: string, data: Record<string, any>): Promise<number> {
  const result = await invoke<DbResult<number>>('db_save', { tableName, data })
  if (!result.success) {
    throw new Error(result.message)
  }
  return result.data || 0
}

export async function updateById(tableName: string, id: number, data: Record<string, any>): Promise<number> {
  const result = await invoke<DbResult<number>>('db_update_by_id', { tableName, id, data })
  if (!result.success) {
    throw new Error(result.message)
  }
  return result.data || id
}

export async function list(
  tableName: string,
  where?: any[][],
  orderBy?: string,
  offset?: number,
  limit?: number
): Promise<any[]> {
  const result = await invoke<DbResult<any[]>>('db_list', { tableName, where, orderBy, offset, limit })
  if (!result.success) {
    throw new Error(result.message)
  }
  return result.data || []
}

export async function count(tableName: string, where?: any[][]): Promise<number> {
  const result = await invoke<DbResult<number>>('db_count', { tableName, where })
  if (!result.success) {
    throw new Error(result.message)
  }
  return result.data || 0
}

export async function getOne(tableName: string, where: any[][]): Promise<any | null> {
  const result = await invoke<DbResult<any | null>>('db_get_one', { tableName, where })
  if (!result.success) {
    throw new Error(result.message)
  }
  return result.data || null
}

export async function remove(tableName: string, where: any[][]): Promise<void> {
  const result = await invoke<DbResult<null>>('db_remove', { tableName, where })
  if (!result.success) {
    throw new Error(result.message)
  }
}

export async function page(
  tableName: string,
  current: number,
  pageSize: number,
  where?: any[][],
  orderBy?: string
): Promise<{ current: number; pageSize: number; total: number; records: any[] }> {
  const result = await invoke<DbResult<PageResult<any>>>('db_page', { tableName, current, pageSize, where, orderBy })
  if (!result.success) {
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

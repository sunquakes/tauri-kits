import { invoke } from '@tauri-apps/api/core'

interface ApiResponse<T> {
  code: number
  message: string
  data: T | null
}

export async function initDb(): Promise<void> {
  try {
    const result = await invoke<ApiResponse<void>>('api_db_init')
    if (result.code !== 200) {
      console.error('Failed to initialize database:', result.message)
    }
  } catch (e) {
    console.log('Tauri not available, skipping database initialization')
  }
}
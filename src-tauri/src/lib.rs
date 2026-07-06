mod api;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            api::api_user_login,
            api::api_user_list,
            api::api_user_get,
            api::api_user_create,
            api::api_user_update,
            api::api_user_delete,
            api::api_db_init
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
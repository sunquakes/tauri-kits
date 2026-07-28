mod api;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            api::user::api_user_login,
            api::user::api_user_list,
            api::user::api_user_get,
            api::user::api_user_create,
            api::user::api_user_update,
            api::user::api_user_delete,
            api::user::api_db_init
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
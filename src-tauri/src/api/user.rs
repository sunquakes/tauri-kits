use hex;
use md5::{Digest, Md5};
use serde::{Deserialize, Serialize};
use sqlx::Row;
use tauri::AppHandle;

use super::{
    ApiResponse, PageResponse, get_db_pool, get_db_type, load_init_sql,
    db_delete, db_find_one, db_page_records, db_insert_record, db_update_record,
    db_init_table,
};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: Option<i64>,
    pub username: String,
    pub password: String,
    pub nickname: String,
    pub state: i32,
    pub email: Option<String>,
    pub create_time: Option<String>,
    pub update_time: Option<String>,
}

const USER_COLS: &str = "id, username, password, nickname, state, email, create_time, update_time";
const USER_INSERT_COLS: &str = "username, password, nickname, state, email, create_time, update_time";
const USER_TABLE: &str = "user";

fn map_user(row: sqlx::any::AnyRow) -> User {
    User {
        id: Some(row.get("id")),
        username: row.get("username"),
        password: "".to_string(),
        nickname: row.get("nickname"),
        state: row.get("state"),
        email: row.get("email"),
        create_time: row.get("create_time"),
        update_time: row.get("update_time"),
    }
}

fn hash_password(password: &str) -> String {
    hex::encode(Md5::digest(password.as_bytes()))
}

fn now_string() -> String {
    chrono::Local::now().format("%Y-%m-%d %H:%M:%S").to_string()
}

#[tauri::command]
pub async fn api_user_login(
    username: String,
    password: String,
    app_handle: AppHandle,
) -> ApiResponse<User> {
    let pool = match get_db_pool(&app_handle).await {
        Ok(p) => p,
        Err(e) => return ApiResponse::server_error(&e),
    };

    let row = match db_find_one(&pool, USER_TABLE, USER_COLS, "username", &username).await {
        Ok(Some(r)) => r,
        Ok(None) => return ApiResponse::unauthorized("Username or password error"),
        Err(e) => return ApiResponse::server_error(&e),
    };

    let stored_password: String = row.get("password");
    let password_hash = hash_password(&password);

    if stored_password == password_hash {
        ApiResponse::success(map_user(row))
    } else {
        ApiResponse::unauthorized("Username or password error")
    }
}

#[tauri::command]
pub async fn api_user_list(
    page: i64,
    page_size: i64,
    app_handle: AppHandle,
) -> ApiResponse<PageResponse<User>> {
    let pool = match get_db_pool(&app_handle).await {
        Ok(p) => p,
        Err(e) => return ApiResponse::server_error(&e),
    };

    match db_page_records(&pool, USER_TABLE, USER_COLS, "id DESC", page, page_size).await {
        Ok((rows, total)) => {
            let records = rows.into_iter().map(map_user).collect();
            ApiResponse::success(PageResponse { current: page, page_size, total, records })
        }
        Err(e) => ApiResponse::server_error(&e),
    }
}

#[tauri::command]
pub async fn api_user_create(user: User, app_handle: AppHandle) -> ApiResponse<i64> {
    let pool = match get_db_pool(&app_handle).await {
        Ok(p) => p,
        Err(e) => return ApiResponse::server_error(&e),
    };

    let password_hash = hash_password(&user.password);
    let now = now_string();
    let email_val = user.email.clone().unwrap_or_default();
    let state_str = user.state.to_string();

    let values: Vec<(&str, &str)> = vec![
        ("username", &user.username),
        ("password", &password_hash),
        ("nickname", &user.nickname),
        ("state", &state_str),
        ("email", &email_val),
        ("create_time", &now),
        ("update_time", &now),
    ];

    match db_insert_record(&pool, USER_TABLE, USER_INSERT_COLS, values).await {
        Ok(id) => ApiResponse::success(id),
        Err(e) => ApiResponse::server_error(&e),
    }
}

#[tauri::command]
pub async fn api_user_update(id: i64, user: User, app_handle: AppHandle) -> ApiResponse<i64> {
    let pool = match get_db_pool(&app_handle).await {
        Ok(p) => p,
        Err(e) => return ApiResponse::server_error(&e),
    };

    let now = now_string();
    let email_val = user.email.clone().unwrap_or_default();
    let state_str = user.state.to_string();

    if !user.password.is_empty() {
        let password_hash = hash_password(&user.password);
        let columns = &["username", "password", "nickname", "state", "email", "update_time"];
        let values: Vec<&str> = vec![
            &user.username,
            &password_hash,
            &user.nickname,
            &state_str,
            &email_val,
            &now,
        ];
        match db_update_record(&pool, USER_TABLE, columns, values, id).await {
            Ok(affected) => ApiResponse::success(affected),
            Err(e) => ApiResponse::server_error(&e),
        }
    } else {
        let columns = &["username", "nickname", "state", "email", "update_time"];
        let values: Vec<&str> = vec![
            &user.username,
            &user.nickname,
            &state_str,
            &email_val,
            &now,
        ];
        match db_update_record(&pool, USER_TABLE, columns, values, id).await {
            Ok(affected) => ApiResponse::success(affected),
            Err(e) => ApiResponse::server_error(&e),
        }
    }
}

#[tauri::command]
pub async fn api_user_delete(id: i64, app_handle: AppHandle) -> ApiResponse<i64> {
    let pool = match get_db_pool(&app_handle).await {
        Ok(p) => p,
        Err(e) => return ApiResponse::server_error(&e),
    };

    match db_delete(&pool, USER_TABLE, id).await {
        Ok(affected) => ApiResponse::success(affected),
        Err(e) => ApiResponse::server_error(&e),
    }
}

#[tauri::command]
pub async fn api_user_get(id: i64, app_handle: AppHandle) -> ApiResponse<User> {
    let pool = match get_db_pool(&app_handle).await {
        Ok(p) => p,
        Err(e) => return ApiResponse::server_error(&e),
    };

    match db_find_one(&pool, USER_TABLE, USER_COLS, "id", &id.to_string()).await {
        Ok(Some(row)) => ApiResponse::success(map_user(row)),
        Ok(None) => ApiResponse::not_found("User not found"),
        Err(e) => ApiResponse::server_error(&e),
    }
}

#[tauri::command]
pub async fn api_db_init(app_handle: AppHandle) -> ApiResponse<String> {
    let pool = match get_db_pool(&app_handle).await {
        Ok(p) => p,
        Err(e) => return ApiResponse::server_error(&e),
    };

    let db_type = get_db_type(&pool);
    let init_sql = load_init_sql(db_type);

    if let Err(e) = db_init_table(&pool, USER_TABLE, init_sql).await {
        return ApiResponse::server_error(&e);
    }

    // Check if admin user exists
    let admin_exists = match db_find_one(&pool, USER_TABLE, "COUNT(*) as count", "username", "admin").await {
        Ok(Some(row)) => {
            let count: i64 = row.get("count");
            count > 0
        }
        _ => false,
    };

    if !admin_exists {
        let password_hash = hash_password("admin123");
        let now = now_string();

        let values: Vec<(&str, &str)> = vec![
            ("username", "admin"),
            ("password", &password_hash),
            ("nickname", "Administrator"),
            ("state", "1"),
            ("create_time", &now),
            ("update_time", &now),
        ];

        let cols = "username, password, nickname, state, create_time, update_time";
        if let Err(e) = db_insert_record(&pool, USER_TABLE, cols, values).await {
            return ApiResponse::server_error(&format!("Failed to create default admin: {}", e));
        }

        ApiResponse::success("Database initialized successfully, default admin account created".to_string())
    } else {
        ApiResponse::success("Database already exists, no need to initialize".to_string())
    }
}

use md5::{Md5, Digest};
use serde::{Deserialize, Serialize};
use sqlx::{sqlite::SqliteConnectOptions, Row};
use tauri::{AppHandle, Manager};

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse<T> {
    pub code: i32,
    pub message: String,
    pub data: Option<T>,
}

impl<T> ApiResponse<T> {
    pub fn success(data: T) -> Self {
        ApiResponse {
            code: 200,
            message: "success".to_string(),
            data: Some(data),
        }
    }

    pub fn error(code: i32, message: &str) -> Self {
        ApiResponse {
            code,
            message: message.to_string(),
            data: None,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PageResponse<T> {
    pub current: i64,
    pub page_size: i64,
    pub total: i64,
    pub records: Vec<T>,
}

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

fn get_db_path(app_handle: &AppHandle) -> String {
    let data_dir = match app_handle.path().app_data_dir() {
        Ok(dir) => dir,
        Err(e) => {
            println!("Failed to get app data dir: {}, using current directory", e);
            std::path::PathBuf::from(".")
        }
    };
    
    let db_path = data_dir.join("sqlite3.db");
    
    if let Some(parent) = db_path.parent() {
        if !parent.exists() {
            match std::fs::create_dir_all(parent) {
                Ok(_) => println!("Created directory: {}", parent.display()),
                Err(e) => println!("Failed to create directory {}: {}", parent.display(), e),
            }
        }
    }
    
    let path_str = db_path.to_string_lossy().to_string();
    println!("Database path: {}", path_str);
    
    path_str
}

async fn get_db_pool(app_handle: &AppHandle) -> Result<sqlx::sqlite::SqlitePool, String> {
    let db_path = get_db_path(app_handle);
    
    println!("Connecting to database: {}", db_path);
    
    let options = SqliteConnectOptions::new()
        .filename(&db_path)
        .create_if_missing(true);
    
    match sqlx::sqlite::SqlitePool::connect_with(options).await {
        Ok(pool) => Ok(pool),
        Err(e) => Err(format!("Failed to connect to database: {}", e)),
    }
}

#[tauri::command]
pub async fn api_user_login(username: String, password: String, app_handle: AppHandle) -> ApiResponse<User> {
    match get_db_pool(&app_handle).await {
        Ok(pool) => {
            let result = sqlx::query("SELECT id, username, password, nickname, state, email, create_time, update_time FROM user WHERE username = ?")
                .bind(&username)
                .fetch_all(&pool)
                .await;
            
            match result {
                Ok(rows) => {
                    if rows.is_empty() {
                        println!("Login failed: user not found");
                        ApiResponse::error(401, "Username or password error")
                    } else {
                        let row = &rows[0];
                        let stored_password: String = row.get("password");
                        let password_hash = format!("{:x}", Md5::digest(password.as_bytes()));
                        
                        println!("Login attempt - username: {}, stored_password: {}, computed_hash: {}", username, stored_password, password_hash);
                        
                        if stored_password == password_hash {
                            let user = User {
                                id: Some(row.get("id")),
                                username: row.get("username"),
                                password: "".to_string(),
                                nickname: row.get("nickname"),
                                state: row.get("state"),
                                email: row.get("email"),
                                create_time: row.get("create_time"),
                                update_time: row.get("update_time"),
                            };
                            ApiResponse::success(user)
                        } else {
                            ApiResponse::error(401, "Username or password error")
                        }
                    }
                }
                Err(e) => ApiResponse::error(500, &format!("Query failed: {}", e)),
            }
        }
        Err(e) => ApiResponse::error(500, &format!("Failed to connect to database: {}", e)),
    }
}

#[tauri::command]
pub async fn api_user_list(page: i64, page_size: i64, app_handle: AppHandle) -> ApiResponse<PageResponse<User>> {
    println!("api_user_list called: page={}, page_size={}", page, page_size);
    
    match get_db_pool(&app_handle).await {
        Ok(pool) => {
            let offset = (page - 1) * page_size;
            
            let count_result = sqlx::query("SELECT COUNT(*) FROM user")
                .fetch_one(&pool)
                .await;
            
            let total = match count_result {
                Ok(row) => row.get::<i64, _>(0),
                Err(_) => 0,
            };
            
            println!("Total users: {}", total);
            
            let result = sqlx::query("SELECT id, username, password, nickname, state, email, create_time, update_time FROM user LIMIT ? OFFSET ?")
                .bind(page_size)
                .bind(offset)
                .fetch_all(&pool)
                .await;
            
            match result {
                Ok(rows) => {
                    println!("Fetched {} rows", rows.len());
                    
                    let users: Vec<User> = rows.into_iter().map(|row| User {
                        id: Some(row.get("id")),
                        username: row.get("username"),
                        password: "".to_string(),
                        nickname: row.get("nickname"),
                        state: row.get("state"),
                        email: row.get("email"),
                        create_time: row.get("create_time"),
                        update_time: row.get("update_time"),
                    }).collect();
                    
                    println!("Converted {} users", users.len());
                    
                    let page_response = PageResponse {
                        current: page,
                        page_size,
                        total,
                        records: users,
                    };
                    
                    ApiResponse::success(page_response)
                }
                Err(e) => {
                    println!("Query error: {}", e);
                    ApiResponse::error(500, &format!("Query failed: {}", e))
                }
            }
        }
        Err(e) => ApiResponse::error(500, &format!("Failed to connect to database: {}", e)),
    }
}

#[tauri::command]
pub async fn api_user_create(user: User, app_handle: AppHandle) -> ApiResponse<i64> {
    println!("Creating user: {:?}", user);
    
    match get_db_pool(&app_handle).await {
        Ok(pool) => {
            let password_hash = format!("{:x}", Md5::digest(user.password.as_bytes()));
            
            let now = chrono::Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
            
            let result = sqlx::query("INSERT INTO user (username, password, nickname, state, email, create_time, update_time) VALUES (?, ?, ?, ?, ?, ?, ?)")
                .bind(&user.username)
                .bind(&password_hash)
                .bind(&user.nickname)
                .bind(user.state)
                .bind(user.email.as_deref().unwrap_or_default())
                .bind(&now)
                .bind(&now)
                .execute(&pool)
                .await;
            
            match result {
                Ok(r) => {
                    println!("User created successfully, ID: {}", r.last_insert_rowid());
                    ApiResponse::success(r.last_insert_rowid())
                },
                Err(e) => {
                    println!("Failed to create user: {}", e);
                    ApiResponse::error(500, &format!("Create failed: {}", e))
                },
            }
        }
        Err(e) => ApiResponse::error(500, &format!("Failed to connect to database: {}", e)),
    }
}

#[tauri::command]
pub async fn api_user_update(id: i64, user: User, app_handle: AppHandle) -> ApiResponse<i64> {
    match get_db_pool(&app_handle).await {
        Ok(pool) => {
            let now = chrono::Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
            
            if !user.password.is_empty() {
                let password_hash = format!("{:x}", Md5::digest(user.password.as_bytes()));
                
                let result = sqlx::query("UPDATE user SET username = ?, password = ?, nickname = ?, state = ?, email = ?, update_time = ? WHERE id = ?")
                    .bind(&user.username)
                    .bind(&password_hash)
                    .bind(&user.nickname)
                    .bind(user.state)
                    .bind(user.email.as_deref().unwrap_or_default())
                    .bind(&now)
                    .bind(id)
                    .execute(&pool)
                    .await;
                
                match result {
                    Ok(r) => ApiResponse::success(r.rows_affected() as i64),
                    Err(e) => ApiResponse::error(500, &format!("Update failed: {}", e)),
                }
            } else {
                let result = sqlx::query("UPDATE user SET username = ?, nickname = ?, state = ?, email = ?, update_time = ? WHERE id = ?")
                    .bind(&user.username)
                    .bind(&user.nickname)
                    .bind(user.state)
                    .bind(user.email.as_deref().unwrap_or_default())
                    .bind(&now)
                    .bind(id)
                    .execute(&pool)
                    .await;
                
                match result {
                    Ok(r) => ApiResponse::success(r.rows_affected() as i64),
                    Err(e) => ApiResponse::error(500, &format!("Update failed: {}", e)),
                }
            }
        }
        Err(e) => ApiResponse::error(500, &format!("Failed to connect to database: {}", e)),
    }
}

#[tauri::command]
pub async fn api_user_delete(id: i64, app_handle: AppHandle) -> ApiResponse<i64> {
    match get_db_pool(&app_handle).await {
        Ok(pool) => {
            let result = sqlx::query("DELETE FROM user WHERE id = ?")
                .bind(id)
                .execute(&pool)
                .await;
            
            match result {
                Ok(r) => ApiResponse::success(r.rows_affected() as i64),
                Err(e) => ApiResponse::error(500, &format!("Delete failed: {}", e)),
            }
        }
        Err(e) => ApiResponse::error(500, &format!("Failed to connect to database: {}", e)),
    }
}

#[tauri::command]
pub async fn api_user_get(id: i64, app_handle: AppHandle) -> ApiResponse<User> {
    match get_db_pool(&app_handle).await {
        Ok(pool) => {
            let result = sqlx::query("SELECT id, username, password, nickname, state, email, create_time, update_time FROM user WHERE id = ?")
                .bind(id)
                .fetch_all(&pool)
                .await;
            
            match result {
                Ok(rows) => {
                    if rows.is_empty() {
                        ApiResponse::error(404, "User not found")
                    } else {
                        let row = &rows[0];
                        let user = User {
                            id: Some(row.get("id")),
                            username: row.get("username"),
                            password: "".to_string(),
                            nickname: row.get("nickname"),
                            state: row.get("state"),
                            email: row.get("email"),
                            create_time: row.get("create_time"),
                            update_time: row.get("update_time"),
                        };
                        ApiResponse::success(user)
                    }
                }
                Err(e) => ApiResponse::error(500, &format!("Query failed: {}", e)),
            }
        }
        Err(e) => ApiResponse::error(500, &format!("Failed to connect to database: {}", e)),
    }
}

#[tauri::command]
pub async fn api_db_init(app_handle: AppHandle) -> ApiResponse<String> {
    println!("Initializing database...");
    
    match get_db_pool(&app_handle).await {
        Ok(pool) => {
            let create_table_sql = r#"
                CREATE TABLE IF NOT EXISTS user (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    nickname TEXT NOT NULL,
                    state INTEGER DEFAULT 1,
                    email TEXT,
                    create_time TEXT,
                    update_time TEXT
                );
            "#;
            
            let result = sqlx::query(create_table_sql)
                .execute(&pool)
                .await;
            
            match result {
                Ok(_) => {
                    let check_admin = sqlx::query("SELECT COUNT(*) FROM user WHERE username = 'admin'")
                        .fetch_one(&pool)
                        .await;
                    
                    match check_admin {
                        Ok(row) => {
                            let count: i64 = row.get(0);
                            if count == 0 {
                                let password_hash = format!("{:x}", Md5::digest("admin123".as_bytes()));
                                let now = chrono::Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
                                
                                let insert_result = sqlx::query("INSERT INTO user (username, password, nickname, state, create_time, update_time) VALUES (?, ?, ?, ?, ?, ?)")
                                    .bind("admin")
                                    .bind(&password_hash)
                                    .bind("Administrator")
                                    .bind(1)
                                    .bind(&now)
                                    .bind(&now)
                                    .execute(&pool)
                                    .await;
                                
                                match insert_result {
                                    Ok(_) => ApiResponse::success("Database initialized successfully, default admin account created".to_string()),
                                    Err(e) => ApiResponse::success(format!("Database initialized successfully, but failed to create default admin: {}", e)),
                                }
                            } else {
                                ApiResponse::success("Database already exists, no need to initialize".to_string())
                            }
                        }
                        Err(e) => ApiResponse::error(500, &format!("Failed to check admin account: {}", e)),
                    }
                }
                Err(e) => ApiResponse::error(500, &format!("Failed to create table: {}", e)),
            }
        }
        Err(e) => ApiResponse::error(500, &format!("Failed to connect to database: {}", e)),
    }
}

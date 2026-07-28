use serde::{Deserialize, Serialize};
use sqlx::{AnyPool, Row};
use std::sync::Once;
use tauri::{AppHandle, Manager};

pub mod user;

static INSTALL_DRIVERS: Once = Once::new();

fn ensure_drivers_installed() {
    INSTALL_DRIVERS.call_once(|| {
        sqlx::any::install_default_drivers();
    });
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DbType {
    Sqlite,
    Mysql,
    Postgres,
}

impl DbType {
    pub fn from_str(s: &str) -> Self {
        let s_lower = s.to_lowercase();
        match s_lower.as_str() {
            "mysql" | "mariadb" => DbType::Mysql,
            "postgres" | "postgresql" => DbType::Postgres,
            _ => DbType::Sqlite,
        }
    }

    pub fn from_url(url: &str) -> Self {
        let url_lower = url.to_lowercase();
        if url_lower.starts_with("postgres:") || url_lower.starts_with("postgresql:") {
            DbType::Postgres
        } else if url_lower.starts_with("mysql:") || url_lower.starts_with("mariadb:") {
            DbType::Mysql
        } else {
            DbType::Sqlite
        }
    }

    pub fn placeholder(&self, idx: usize) -> String {
        match self {
            DbType::Postgres => format!("${}", idx),
            _ => "?".to_string(),
        }
    }

    pub fn quote_ident(&self, name: &str) -> String {
        match self {
            DbType::Postgres => format!("\"{}\"", name),
            DbType::Mysql => format!("`{}`", name),
            DbType::Sqlite => format!("\"{}\"", name),
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct DbConfig {
    pub r#type: String,
    pub host: String,
    pub port: u16,
    pub database: String,
    pub username: String,
    pub password: String,
    pub path: String,
}

impl DbConfig {
    pub fn from_app_handle(app_handle: &AppHandle) -> Self {
        let config_dir = match app_handle.path().app_config_dir() {
            Ok(dir) => dir,
            Err(e) => {
                println!("Failed to get app config dir: {}, using current directory", e);
                std::path::PathBuf::from(".")
            }
        };

        let config_path = config_dir.join("database.json");

        if config_path.exists() {
            match std::fs::read_to_string(&config_path) {
                Ok(content) => {
                    match serde_json::from_str(&content) {
                        Ok(config) => {
                            println!("Loaded database config from: {}", config_path.display());
                            return config;
                        }
                        Err(e) => {
                            println!("Failed to parse database.json: {}, using default config", e);
                        }
                    }
                }
                Err(e) => {
                    println!("Failed to read database.json: {}, using default config", e);
                }
            }
        }

        let project_config_path = std::path::PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("config").join("database.json");
        if project_config_path.exists() {
            match std::fs::read_to_string(&project_config_path) {
                Ok(content) => {
                    match serde_json::from_str(&content) {
                        Ok(config) => {
                            println!("Loaded database config from project: {}", project_config_path.display());
                            return config;
                        }
                        Err(e) => {
                            println!("Failed to parse project database.json: {}, using default config", e);
                        }
                    }
                }
                Err(e) => {
                    println!("Failed to read project database.json: {}, using default config", e);
                }
            }
        }

        DbConfig {
            r#type: "sqlite".to_string(),
            host: "localhost".to_string(),
            port: 3306,
            database: "tauri_kits".to_string(),
            username: "root".to_string(),
            password: "".to_string(),
            path: "sqlite3.db".to_string(),
        }
    }

    pub fn to_url(&self, app_handle: &AppHandle) -> String {
        match DbType::from_str(&self.r#type) {
            DbType::Sqlite => {
                let data_dir = match app_handle.path().app_data_dir() {
                    Ok(dir) => dir,
                    Err(e) => {
                        println!("Failed to get app data dir: {}, using current directory", e);
                        std::path::PathBuf::from(".")
                    }
                };

                let db_path = data_dir.join(&self.path);

                if let Some(parent) = db_path.parent() {
                    if !parent.exists() {
                        match std::fs::create_dir_all(parent) {
                            Ok(_) => println!("Created directory: {}", parent.display()),
                            Err(e) => println!("Failed to create directory {}: {}", parent.display(), e),
                        }
                    }
                };

                format!("sqlite:{}", db_path.to_string_lossy())
            }
            DbType::Mysql => {
                if self.password.is_empty() {
                    format!(
                        "mysql://{}@{}:{}/{}",
                        self.username, self.host, self.port, self.database
                    )
                } else {
                    format!(
                        "mysql://{}:{}@{}:{}/{}",
                        self.username, self.password, self.host, self.port, self.database
                    )
                }
            }
            DbType::Postgres => {
                if self.password.is_empty() {
                    format!(
                        "postgres://{}@{}:{}/{}",
                        self.username, self.host, self.port, self.database
                    )
                } else {
                    format!(
                        "postgres://{}:{}@{}:{}/{}",
                        self.username, self.password, self.host, self.port, self.database
                    )
                }
            }
        }
    }
}

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

    // pub fn bad_request(message: &str) -> Self {
    //     Self::error(400, message)
    // }

    pub fn unauthorized(message: &str) -> Self {
        Self::error(401, message)
    }

    pub fn not_found(message: &str) -> Self {
        Self::error(404, message)
    }

    pub fn server_error(message: &str) -> Self {
        Self::error(500, message)
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PageResponse<T> {
    pub current: i64,
    pub page_size: i64,
    pub total: i64,
    pub records: Vec<T>,
}

fn get_db_url(app_handle: &AppHandle) -> String {
    if let Ok(url) = std::env::var("DATABASE_URL") {
        if !url.is_empty() {
            println!("Using database URL from DATABASE_URL env");
            return url;
        }
    }

    let config = DbConfig::from_app_handle(app_handle);
    let url = config.to_url(app_handle);
    println!("Using database URL from config: {}", url);

    url
}

pub async fn get_db_pool(app_handle: &AppHandle) -> Result<AnyPool, String> {
    ensure_drivers_installed();

    let db_url = get_db_url(app_handle);

    println!("Connecting to database...");

    match sqlx::any::AnyPoolOptions::new()
        .connect(&db_url)
        .await
    {
        Ok(pool) => Ok(pool),
        Err(e) => Err(format!("Failed to connect to database: {}", e)),
    }
}

pub fn get_db_type(pool: &AnyPool) -> DbType {
    let opts = pool.connect_options();
    let url = opts.database_url.as_str();
    DbType::from_url(url)
}

pub fn load_init_sql(db_type: DbType) -> &'static str {
    match db_type {
        DbType::Sqlite => include_str!("../sql/sqlite/init.sql"),
        DbType::Mysql => include_str!("../sql/mysql/init.sql"),
        DbType::Postgres => include_str!("../sql/postgres/init.sql"),
    }
}

pub async fn last_insert_id(pool: &AnyPool, table: &str) -> Result<i64, String> {
    let db_type = get_db_type(pool);
    let sql = match db_type {
        DbType::Sqlite => "SELECT last_insert_rowid()".to_string(),
        DbType::Mysql => "SELECT LAST_INSERT_ID()".to_string(),
        DbType::Postgres => format!(
            "SELECT currval(pg_get_serial_sequence('{}', 'id'))",
            table
        ),
    };

    let row = sqlx::query(&sql)
        .fetch_one(pool)
        .await
        .map_err(|e| format!("Failed to get last insert id: {}", e))?;

    Ok(row.get::<i64, _>(0))
}

pub fn paginate_sql(db_type: DbType, base_sql: &str, order_by: &str) -> String {
    match db_type {
        DbType::Sqlite | DbType::Mysql => {
            format!("{} ORDER BY {} LIMIT ? OFFSET ?", base_sql, order_by)
        }
        DbType::Postgres => {
            format!("{} ORDER BY {} LIMIT $1 OFFSET $2", base_sql, order_by)
        }
    }
}

pub async fn db_delete(pool: &AnyPool, table: &str, id: i64) -> Result<i64, String> {
    let db_type = get_db_type(pool);
    let table_col = db_type.quote_ident(table);
    let ph = db_type.placeholder(1);

    let sql = format!("DELETE FROM {} WHERE id = {}", table_col, ph);
    let result = sqlx::query(&sql).bind(id).execute(pool).await.map_err(|e| format!("Delete failed: {}", e))?;
    Ok(result.rows_affected() as i64)
}

pub async fn db_count(pool: &AnyPool, table: &str, where_sql: &str) -> Result<i64, String> {
    let db_type = get_db_type(pool);
    let table_col = db_type.quote_ident(table);

    let count_sql = if where_sql.is_empty() {
        format!("SELECT COUNT(*) FROM {}", table_col)
    } else {
        format!("SELECT COUNT(*) FROM {} WHERE {}", table_col, where_sql)
    };

    let count_row = sqlx::query(&count_sql).fetch_one(pool).await.map_err(|e| format!("Count query failed: {}", e))?;
    Ok(count_row.get(0))
}

pub fn build_insert_sql(db_type: DbType, table: &str, cols: &str, param_count: usize) -> String {
    let table_col = db_type.quote_ident(table);
    let placeholders: Vec<String> = (1..=param_count)
        .map(|i| db_type.placeholder(i))
        .collect();
    let ph_str = placeholders.join(", ");
    format!("INSERT INTO {} ({}) VALUES ({})", table_col, cols, ph_str)
}

pub fn build_update_sql(db_type: DbType, table: &str, set_sql: &str) -> String {
    let table_col = db_type.quote_ident(table);
    format!("UPDATE {} SET {}", table_col, set_sql)
}

pub fn build_select_sql(db_type: DbType, table: &str, select_cols: &str, where_sql: &str) -> String {
    let table_col = db_type.quote_ident(table);
    if where_sql.is_empty() {
        format!("SELECT {} FROM {}", select_cols, table_col)
    } else {
        format!("SELECT {} FROM {} WHERE {}", select_cols, table_col, where_sql)
    }
}

pub fn build_where_clause(db_type: DbType, where_conditions: &[Vec<String>]) -> (String, Vec<String>) {
    if where_conditions.is_empty() {
        return (String::new(), Vec::new());
    }

    let mut conditions: Vec<String> = Vec::new();
    let mut values: Vec<String> = Vec::new();

    for (idx, condition) in where_conditions.iter().enumerate() {
        if condition.len() != 3 {
            continue;
        }

        let col = &condition[0];
        let op = &condition[1].to_uppercase();
        let val = &condition[2];

        let ph = db_type.placeholder(idx + 1);
        conditions.push(format!("{} {} {}", col, op, ph));
        values.push(val.clone());
    }

    (conditions.join(" AND "), values)
}

// High-level database operations

pub async fn db_find_one(
    pool: &AnyPool,
    table: &str,
    select_cols: &str,
    where_col: &str,
    where_val: &str,
) -> Result<Option<sqlx::any::AnyRow>, String> {
    let db_type = get_db_type(pool);
    let ph = db_type.placeholder(1);
    let sql = build_select_sql(db_type, table, select_cols, &format!("{} = {}", where_col, ph));

    let rows = sqlx::query(&sql)
        .bind(where_val)
        .fetch_all(pool)
        .await
        .map_err(|e| format!("Query failed: {}", e))?;

    Ok(rows.into_iter().next())
}

pub async fn db_page_records(
    pool: &AnyPool,
    table: &str,
    select_cols: &str,
    order_by: &str,
    page: i64,
    page_size: i64,
    where_conditions: &[Vec<String>],
) -> Result<(Vec<sqlx::any::AnyRow>, i64), String> {
    let db_type = get_db_type(pool);
    
    let (where_sql, where_values) = build_where_clause(db_type, where_conditions);
    
    let total = db_count(pool, table, &where_sql).await.unwrap_or(0);
    
    let base_sql = build_select_sql(db_type, table, select_cols, &where_sql);
    let query_sql = paginate_sql(db_type, &base_sql, order_by);

    let mut query = sqlx::query(&query_sql);
    for val in &where_values {
        query = query.bind(val);
    }
    query = query.bind(page_size);
    query = query.bind((page - 1) * page_size);

    let rows = query
        .fetch_all(pool)
        .await
        .map_err(|e| format!("Query failed: {}", e))?;

    Ok((rows, total))
}

pub async fn db_insert_record(
    pool: &AnyPool,
    table: &str,
    cols: &str,
    values: Vec<(&str, &str)>,
) -> Result<i64, String> {
    let db_type = get_db_type(pool);
    let param_count = values.len();
    let sql = build_insert_sql(db_type, table, cols, param_count);

    let mut query = sqlx::query(&sql);
    for (_, val) in values {
        query = query.bind(val);
    }

    query.execute(pool)
        .await
        .map_err(|e| format!("Insert failed: {}", e))?;

    last_insert_id(pool, table).await
}

pub async fn db_update_record(
    pool: &AnyPool,
    table: &str,
    columns: &[&str],
    values: Vec<&str>,
    id: i64,
) -> Result<i64, String> {
    let db_type = get_db_type(pool);
    
    // 构建 SET 子句
    let set_parts: Vec<String> = columns
        .iter()
        .enumerate()
        .map(|(i, col)| format!("{} = {}", col, db_type.placeholder(i + 1)))
        .collect();
    let set_clause = set_parts.join(", ");
    
    // WHERE id 的占位符
    let where_placeholder = db_type.placeholder(columns.len() + 1);
    let set_sql = format!("{} WHERE id = {}", set_clause, where_placeholder);
    
    let sql = build_update_sql(db_type, table, &set_sql);

    let mut query = sqlx::query(&sql);
    for val in values {
        query = query.bind(val);
    }
    query = query.bind(id);

    let result = query.execute(pool)
        .await
        .map_err(|e| format!("Update failed: {}", e))?;

    Ok(result.rows_affected() as i64)
}

pub async fn db_init_table(
    pool: &AnyPool,
    table: &str,
    init_sql: &str,
) -> Result<(), String> {
    sqlx::query(init_sql)
        .execute(pool)
        .await
        .map_err(|e| format!("Failed to create table {}: {}", table, e))?;

    Ok(())
}

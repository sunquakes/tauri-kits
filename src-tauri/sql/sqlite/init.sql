CREATE TABLE IF NOT EXISTS "user" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    nickname TEXT NOT NULL,
    state INTEGER DEFAULT 1,
    email TEXT,
    create_time TEXT,
    update_time TEXT
);

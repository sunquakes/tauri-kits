CREATE TABLE IF NOT EXISTS "user" (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    state INT DEFAULT 1,
    email VARCHAR(255),
    create_time TIMESTAMP,
    update_time TIMESTAMP
);

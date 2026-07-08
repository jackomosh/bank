CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'donor'
);

CREATE TABLE donation_requests (
    id SERIAL PRIMARY KEY,
    donor_id INT REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending', -- pending, accepted
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
import pool from "../config/db.js";

export const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(query);
        console.log("Users table ready");
    } catch (err) {
        console.error("Error creating users table:", err);
    }
};
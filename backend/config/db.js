import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
    console.log("Connected to DB!");
});

pool.on("error", (err) => {
    console.error("DB Error:", err);
});

export default pool;
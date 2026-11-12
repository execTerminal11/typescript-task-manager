import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER || "user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "todoDB",
  password: process.env.DB_PASSWORD || "password",
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const initDatabase = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRECT_TIMESTAMP
            )
            `);
            console.log("Database inintialized successfully");
    } catch (err) {
        console.error("Error initilazing database:", err);
        throw err;
    } finally {
        client.release();
    }
}
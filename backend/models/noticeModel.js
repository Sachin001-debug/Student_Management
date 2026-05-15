import pool from "../config/db.js";

export const createNoticeTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS notices (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        notice_from VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(query);

    console.log("Notice table ready");
  } catch (err) {
    console.log("Error creating notice table", err);
  }
};

//insert notice to post notice
export const insertNotice = async (title, description, notice_from) => {
  try {
    const query = `
      INSERT INTO notices 
      (title, description, notice_from)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await pool.query(query, [title, description, notice_from]);

    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//get all notices
export const getNotices = async () => {
  try {
    const query = `
      SELECT 
        id,
        title,
        description,
        notice_from,
        created_at
      FROM notices
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteNotice = async (notice_id) => {
  try {
    const query = `
        DELETE FROM notices WHERE id = $1
        RETURNING *
        `;
    const result = await pool.query(query, [notice_id]);
    return result.rows[0];
  } catch (err) {
    console.log("Error deleting subject", err);
    throw err;
  }
};


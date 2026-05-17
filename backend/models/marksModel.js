import pool from "../config/db.js";

// create marks table
export const createMarksTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,

        student_id INT REFERENCES users(id) ON DELETE CASCADE,
        subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,

        marks INT NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        UNIQUE(student_id, subject_id)
      )
    `;

    await pool.query(query);

    console.log("Marks table ready");
  } catch (err) {
    console.log("Error creating marks table", err);
  }
};

// insert or update marks
export const giveMarksModel = async (
  student_id,
  subject_id,
  marks
) => {
  try {
    const query = `
      INSERT INTO marks (student_id, subject_id, marks)
      VALUES ($1, $2, $3)

      ON CONFLICT (student_id, subject_id)
      DO UPDATE SET marks = EXCLUDED.marks

      RETURNING *;
    `;

    const result = await pool.query(query, [
      student_id,
      subject_id,
      marks,
    ]);

    return result.rows[0];
  } catch (err) {
    console.log("Error inserting marks", err);
    throw err;
  }
};

// get marks of a student
export const getStudentMarksModel = async (student_id) => {
  try {
    const query = `
      SELECT 
        m.id,
        m.subject_id,
        m.marks,
        s.subject_name,
        s.subject_code

      FROM marks m

      JOIN subjects s
      ON m.subject_id = s.id

      WHERE m.student_id = $1
    `;

    const result = await pool.query(query, [student_id]);

    return result.rows;
  } catch (err) {
    console.log("Error fetching marks", err);
    throw err;
  }
};

//RESULT DISPLAY TO STUDENT panel

export const getResultByStudentId = async (student_id) => {
  try {
    const query = `
      SELECT s.subject_name, s.subject_code, m.marks
      FROM marks m
      JOIN subjects s
        ON m.subject_id = s.id
      WHERE m.student_id = $1
      ORDER BY s.subject_name
    `;

    const result = await pool.query(query, [
      student_id,
    ]);

    return result.rows;
  } catch (err) {
    console.log(
      "Error getting result for student",
      err
    );
    throw err;
  }
};
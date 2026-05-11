import pool from '../config/db.js'

//this creates sub table with class so that we can fetch/get sub class wise
export const createSubjectTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        subject_name VARCHAR(100) NOT NULL,
        subject_code VARCHAR(20) UNIQUE NOT NULL,
        class VARCHAR(20) NOT NULL,
        teacher_id INT REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await pool.query(query);
    console.log("Subjects table ready");
  } catch (err) {
    console.log("Error creating subject table", err);
  }
};

// Updated insertSubject with class parameter 
//camel case from the frontend
export const insertSubject = async (
  subjectName,
  subjectCode,
  class_name, 
  teacherId
) => {
  try {
    const query = `
      INSERT INTO subjects
      (subject_name, subject_code, class, teacher_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      subjectName,
      subjectCode,
      class_name,
      teacherId,
    ]);

    return result.rows[0];
  } catch (err) {
    console.log("Error inserting subject", err);
    throw err;
  }
};

// New: Get subjects by class
export const getSubjectsByClass = async (className) => {
  try {
    const query = `
      SELECT s.*, u.name as teacher_name 
      FROM subjects s
      LEFT JOIN users u ON s.teacher_id = u.id
      WHERE s.class = $1
      ORDER BY s.subject_name
    `;
    
    const result = await pool.query(query, [className]);
    return result.rows;
  } catch (err) {
    console.log("Error fetching subjects by class", err);
    throw err;
  }
};

// New: Get all distinct classes
export const getAllClasses = async () => {
  try {
    const query = `
      SELECT DISTINCT class 
      FROM subjects 
      ORDER BY class
    `;
    
    const result = await pool.query(query);
    return result.rows.map(row => row.class);
  } catch (err) {
    console.log("Error fetching classes", err);
    throw err;
  }
};

// New: Delete subject
export const deleteSubject = async (subjectId) => {
  try {
    const query = `DELETE FROM subjects WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [subjectId]);
    return result.rows[0];
  } catch (err) {
    console.log("Error deleting subject", err);
    throw err;
  }
};

//edit subject from manage subject
//only for admin. so admin can edit subject name, code 
export const editSubject = async (
  subjectId,
  subjectName,
  subjectCode,
  class_name
) => {
  try {
    const query = `
      UPDATE subjects
      SET 
        subject_name = $1,
        subject_code = $2,
        class = $3
      WHERE id = $4
      RETURNING *;
    `;

    const result = await pool.query(query, [
      subjectName,
      subjectCode,
      class_name,
      subjectId,
    ]);

    return result.rows[0];
  } catch (err) {
    console.log("Error editing subject", err);
    throw err;
  }
};

//for teacher since we have multiple classes for teacher
export const getSubjectsByMultipleClasses = async (classes) => {
  try {
    const query = `
      SELECT * FROM subjects
      WHERE class = ANY($1)
    `;

    const result = await pool.query(query, [classes]);
    return result.rows;

  } catch (err) {
    console.log("Error fetching subjects", err);
    throw err;
  }
};
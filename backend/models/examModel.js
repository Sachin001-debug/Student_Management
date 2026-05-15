import pool from "../config/db.js";
export const createExamTable = async () => {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS exams (
        id SERIAL PRIMARY KEY,
         class_name VARCHAR(50) UNIQUE NOT NULL,
         notice_file TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;
    await pool.query(query);

    console.log("Exam table ready!");
  } catch (err) {
    console.log("error creating exam table:", err);
  }
};

// create exam
export const createExamModel = async (class_name) => {
  try {
    const query = `
      INSERT INTO exams (class_name)
      VALUES ($1)
      RETURNING *;
    `;

    const result = await pool.query(query, [class_name]);

    return result.rows[0];
  } catch (err) {
    console.log("Error creating exam", err);
    throw err;
  }
};

export const getExamClassModel = async (id) => {
  try {
    const query = `
            SELECT id, class_name, created_at
            FROM exams
            ORDER BY created_at DESC
        `;

    const result = await pool.query(query);

    return result.rows;
  } catch (err) {
    console.log("Errorgetting exam classes exam", err);
    throw err;
  }
};

//this will list the sub fromsubject table where according subja all classes are fetched can admin
//  can give to  particular subject a exam data

export const getExamSubjectForClasses = async (className) => {
  try {
    const query = `
      SELECT 
        s.id,
        s.subject_name,
        s.subject_code,
        s.class,
        u.name AS teacher_name
      FROM subjects s
      LEFT JOIN users u ON s.teacher_id = u.id
      WHERE REPLACE(s.class, 'Class ', '') = $1
      ORDER BY s.subject_name ASC
    `;

    const result = await pool.query(query, [className]);
    return result.rows;
  } catch (err) {
    console.log("error getting sub", err);
    throw err;
  }
};

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
export const createExamModel = async (class_name, notice_file) => {
  try {
    const query = `
      INSERT INTO exams (class_name, notice_file)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const result = await pool.query(query, [class_name, notice_file]);

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

//this will list the sub fromsubject table where according subj all classes are fetched can admin
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


//get exam notice for teachers and studenyts

export const getExamNoticesByRole = async (
  role,
  class_name,
  assigned_class
) => {
  try {
    let query = "";
    let values = [];

    // STUDENT
    if (role === "student") {
      query = `
        SELECT *
        FROM exams
        WHERE class_name = $1
        ORDER BY created_at DESC
      `;

      values = [class_name];
    }

    // TEACHER
    else if (role === "teacher") {
      query = `
        SELECT *
        FROM exams
        WHERE class_name = ANY($1)
        ORDER BY created_at DESC
      `;

      values = [assigned_class];
    }

    const result = await pool.query(query, values);

    return result.rows;
  } catch (err) {
    console.log("Error getting notices", err);
    throw err;
  }
};
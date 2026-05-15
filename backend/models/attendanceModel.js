import pool from "../config/db.js";

export const createAttendanceTable = async()=>{
  try {
    const query =  `
      CREATE TABLE IF NOT EXISTS attendance (
      id SERIAL PRIMARY KEY,
      student_id INT REFERENCES users(id) ON DELETE CASCADE,
      class_name VARCHAR(20),
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      status VARCHAR(10) CHECK (status IN ('present', 'absent', 'late')),
      remarks TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, date, class_name)  -- Prevent duplicate entries
    );
    `;

    await pool.query(query);

    console.log("Attendance table ready")
  }catch(err){
    console.log("error creating attendance table!!", err)
  }
}
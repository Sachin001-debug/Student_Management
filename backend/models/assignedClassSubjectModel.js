
import pool from "../config/db.js";

export const getSubjectsForStudent = async (studentId) => {
  try {
    const studentQuery = `
      SELECT class_name
      FROM users WHERE id = $1
    `;

    const studentResult = await pool.query(studentQuery, [studentId]);

    if (studentResult.rows.length === 0) {
      console.log("Student not found");
    }

    let studentClass = studentResult.rows[0].class_name?.toString().trim();

    if (!studentClass) return [];
    const subjectQuery = `
      SELECT s.*, u.name AS teacher_name
      FROM subjects s
      LEFT JOIN users u ON s.teacher_id = u.id
      WHERE s.class = $1                  -- exact match '10'
         OR s.class = $2                  -- exact match 'Class 10'
         OR s.class ILIKE   $3    -- contains '10'
      ORDER BY s.subject_name
    `;

    const result = await pool.query(subjectQuery, [
      studentClass,          
      `Class ${studentClass}`, 
      studentClass          
    ]);
    return result.rows;

  } catch (err) {
    console.error(" Error in getSubjectsForStudent:", err.message);
  }
};

export const getSubjectForTeacher = async(teacherId)=>{
  try{
    const teacherQuery= `
    SELECT assigned_class
    FROM users WHERE id = $1
    `

    const teacherResult = await pool.query(teacherQuery,[teacherId]);

     if(teacherResult.rows.length === 0){
       console.log("Teacher not found");
     }

     const teacherClass = teacherResult.rows[0].assigned_class?.toString().trim()

      if (!teacherClass) return [];

      const subjectQuery = `
      
      `
  }catch(err){
    console.log(err)
  }
}
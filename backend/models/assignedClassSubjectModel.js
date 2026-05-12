import pool from "../config/db.js";

export const getSubjectsForStudent = async (studentId) => {
  try {
    const studentQuery = `
      SELECT class_name
      FROM users WHERE id = $1
    `;

    const studentResult = await pool.query(studentQuery, [studentId]);

    if (studentResult.rows.length === 0) {
      return [];
      console.log("Student not found");
    }

    let studentClass = studentResult.rows[0].class_name?.toString().trim();

    if (!studentClass) return [];
    const subjectQuery = `
      SELECT s.*, u.name AS teacher_name
      FROM subjects s
      LEFT JOIN users u ON s.teacher_id = u.id
      WHERE s.class = $1                  
         OR s.class = $2                  
         OR s.class ILIKE   $3    
      ORDER BY s.subject_name
    `;

    const result = await pool.query(subjectQuery, [
      studentClass,
      `Class ${studentClass}`,
       `%${studentClass}%`,
    ]);
    return result.rows;
  } catch (err) {
    return []
    console.error(" Error in getSubjectsForStudent:", err.message);
  }
};

export const getSubjectForTeacher = async (teacherId) => {
  try {
    const teacherQuery = `
      SELECT assigned_class
      FROM users
      WHERE id = $1 AND role = 'teacher'
    `;

    const teacherResult = await pool.query(teacherQuery, [teacherId]);

    if (teacherResult.rows.length === 0) {
      console.log("Teacher not found");
      return [];
    }

    let assignedClasses = teacherResult.rows[0].assigned_class || [];

    if (!assignedClasses || assignedClasses.length === 0) { 
      console.log("No classes assigned to teacher");
      return [];
    }

    // Convert assigned classes to match subject format
    const searchClasses = assignedClasses.map(cls => {
      const c = cls.toString().trim();
      return [`${c}`, `Class ${c}`, `class ${c}`];
    }).flat();

    const subjectQuery = `
      SELECT s.*, u.name AS teacher_name
      FROM subjects s
      LEFT JOIN users u ON s.teacher_id = u.id
      WHERE s.class = ANY($1)
      ORDER BY s.class, s.subject_name
    `;

    const result = await pool.query(subjectQuery, [searchClasses]);
    return result.rows;

  } catch (err) {
    console.error("Error in getSubjectForTeacher:", err.message);
    return [];
  }
};
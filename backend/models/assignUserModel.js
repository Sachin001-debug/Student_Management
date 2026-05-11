//contains assign model for student and teacher
import pool from "../config/db.js";


export const assignStudentModel = async (student_id, class_name) => {
  try {
    const query = `
      UPDATE users
      SET class_name = $1
      WHERE id = $2
      AND role = 'student'
      RETURNING id, name, email, role, class_name;
    `;

    const result = await pool.query(query, [class_name, student_id]);

    return result.rows[0];
  } catch (err) {
    console.error("Error assigning student class", err);
    throw err;
  }
};

export const assignTeacherModel = async(teacher_id, assigned_class)=>{
     try {
    const query = `
      UPDATE users
      SET assigned_class = array_append(assigned_class, $1)
      WHERE id = $2
      AND role = 'teacher'
      RETURNING id, name, email, role, assigned_class;
    `;

    const result = await pool.query(query, [assigned_class, teacher_id]);

    return result.rows[0];
  } catch (err) {
    console.error("Error assigning teacher class", err);
    throw err;
  }
}
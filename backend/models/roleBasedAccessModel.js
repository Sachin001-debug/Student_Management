// models/userModel.js  (or a new file like userUtils.js)

import pool from '../config/db.js';

/**
 * Get users based on role with flexible filtering
 * @param {string} role - 'teacher' or 'student'
 * @param {object} options - filters
 */
export const getRoleBasedUsers = async (role, options = {}) => {
  try {
    let query = `
      SELECT id, name, email, role, class_name, assigned_class, created_at
      FROM users
      WHERE role = $1
    `;

    const params = [role];
    let paramIndex = 2;

    // SEARCH FILTER
    if (options.search) {
      query += ` AND (name ILIKE $${paramIndex} OR email ILIKE $${paramIndex})`;
      params.push(`%${options.search}%`);
      paramIndex++;
    }

    query += ` ORDER BY name ASC`;

    const result = await pool.query(query, params);
    return result.rows;

  } catch (err) {
    console.error("Error fetching role-based users:", err);
    throw err;
  }
};

// Get all teachers (for Admin to assign classes)
export const getAllTeachers = async () => {
  const teachers = await getRoleBasedUsers("teacher");

  return teachers.map(t => ({
    id: t.id,
    name: t.name,
    email: t.email,
    assigned_class: t.assigned_class || []
  }));
};

export const getAllStudents = async (search = "") => {
  const students = await getRoleBasedUsers("student", { search });

  return students.map(s => ({
    id: s.id,
    name: s.name,
    email: s.email,
    class_name: s.class_name || null
  }));
};
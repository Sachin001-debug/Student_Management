// models/userModel.js  (or a new file like userUtils.js)

import pool from '../config/db.js';

/**
 * Get users based on role with flexible filtering
 * @param {string} role - 'teacher' or 'student'
 * @param {object} options - Additional filters
 */
export const getRoleBasedUsers = async (role, options = {}) => {
  try {
    let query = `
      SELECT 
        id, 
        name, 
        role, 
        email,
        created_at
      FROM users
      WHERE role = $1
    `;

    const params = [role];

    // Search by name or email
    if (options.search) {
      query += ` AND (name ILIKE $2 OR email ILIKE $2)`;
      params.push(`%${options.search}%`);
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
  return await getRoleBasedUsers('teacher');
};

// Get all students (for Admin & Teachers)
export const getAllStudents = async (search = '') => {
  return await getRoleBasedUsers('student', { search });
};
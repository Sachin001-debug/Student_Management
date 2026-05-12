import pool from "../config/db.js";

//creating of the user table where all user basic details will be there
//class name is the class student is in and assign class will be for student
export const createUserTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,

    role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')) DEFAULT 'student',
    class_name VARCHAR(20),
    assigned_class TEXT[]  ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
  try {
    await pool.query(query);
    console.log("Users table ready");
  } catch (err) {
    console.error("Error creating users table", err);
  }
};

//fun for register user
const insertUser = async (name, email, password, role, class_name) => {
  const query = `
     INSERT INTO users (name, email, password, role, class_name)
     VALUES ($1, $2, $3, $4, $5)  
    RETURNING id, name, email, role, class_name, created_at;
    `;
  try {
    const result = await pool.query(query, [
      name,
      email,
      password,
      role,
      class_name,
    ]);
    return result.rows[0];
  } catch {
    console.log("user cant be created!!");
  }
};
//for login created this query
const getUserFromTable = async (email) => {
  const query = `
      SELECT * FROM users WHERE email = $1   
     `;
  try {
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (err) {
    console.log("Error in login", err);
  }
};

//get user for the details, to get name, role, we can use this to chnage  the
//users pass too

//get current logged in user details by id
const getMe = async (id) => {
  const query = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = $1
  `;

  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    console.log("Error getting user details", err);
  }
};
//change password
const updatePassword = async (id, password) => {
  const query = `
    UPDATE users
    SET password = $1
     WHERE id = $2
  `;

  await pool.query(query, [password, id]);
};

// models/userModel.js

 const getTeacherById = async (teacherId) => {
  try {
    const query = `
      SELECT id, name, email, role, assigned_class 
      FROM users 
      WHERE id = $1 AND role = 'teacher'
    `;
    
    const result = await pool.query(query, [teacherId]);
    return result.rows[0];
  } catch (err) {
    console.error("Error fetching teacher by ID:", err);
    throw err;
  }
};
export { getUserFromTable, insertUser, getMe, updatePassword,getTeacherById };

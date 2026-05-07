import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import pool from "../config/db.js";
import {
  getUserFromTable,
  insertUser,
  getMe,
  updatePassword
} from "../models/userModel.js";

dotenv.config();

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Fill all fields" });
    }

    const user = await getUserFromTable(email);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // CREATE TOKEN 
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.json({
      success: true,
      message: "Login Successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error" });
  }
};

//register
const registerUser = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    if (!email || !password || !name) {
      return res.json({ success: false, message: "Fill all fields" });
    }

    const exists = await getUserFromTable(email);
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await insertUser(
      name,
      email,
      hashedPassword,
      role || "student"
    );

    if (result) {
      return res.json({
        success: true,
        message: "User Registered!",
      });
    }

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "error in register" });
  }
};
//get user to display his/her info 
const getUser = async (req, res) => {
  try {
    const user = await getMe(req.user.id); //get user by id

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

// controller/userController.js
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.json({
        success: false,
        message: "Please provide old and new password",
      });
    }
    // Fetch user WITH password (separate from getMe)
    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [req.user.id]
    );

    const user = result.rows[0];

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await updatePassword(req.user.id, hashedPassword);

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
};
export { loginUser, registerUser, getUser, changePassword };
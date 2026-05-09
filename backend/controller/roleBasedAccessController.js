
import { 
  getAllTeachers, 
  getAllStudents 
} from "../models/roleBasedAccessModel.js";

// Get Teachers (Admin use)
export const getTeachersController = async (req, res) => {
  try {
    const teachers = await getAllTeachers();
    
    res.json({
      success: true,
      count: teachers.length,
      teachers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch teachers"
    });
  }
};

// Get Students (Admin + Teacher use)
export const getStudentsController = async (req, res) => {
  try {
    const { search } = req.query;
    const students = await getAllStudents(search || '');

    res.json({
      success: true,
      count: students.length,
      students
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students"
    });
  }
};
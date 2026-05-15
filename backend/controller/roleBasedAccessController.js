
import pool from "../config/db.js";
import { 
  getAllTeachers, 
  getAllStudents,
  getStudentsForMultipleAssignedClasses
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


export const getStudentsForTeacher = async(req,res)=>{
  try{
    const userId =  req.user.id;

      const userResult = await pool.query(
      `SELECT id, role, assigned_class
       FROM users
       WHERE id = $1`,
      [userId]
    );

    const user = userResult.rows[0];

    if (user.role !== "teacher") {
      return res.status(403).json({
        success: false,
        message: "Only teachers can access this"
      });
    }

    // 3. Get students from assigned classes
    const students = await getStudentsForMultipleAssignedClasses(
      user.assigned_class || []
    );

    return res.status(200).json({
      success: true,
      count: students.length,
      students
    });
   
  }catch(err){
    console.log("error fetching students for assigned teacher",err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}
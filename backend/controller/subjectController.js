
import {  getSubjectsByClass, getAllClasses,deleteSubject,insertSubject,editSubject } from "../models/subjectModel.js";
import { getTeacherById } from "../models/userModel.js";

// Get subjects by class
const getSubjectsByClassController = async (req, res) => {
  try {
    const { class: className } = req.params;
    
    if (!className) {
      return res.status(400).json({
        success: false,
        message: "Class name is required"
      });
    }
    
    const subjects = await getSubjectsByClass(className);
    
    res.json({
      success: true,
      subjects,
      class: className
    });
  } catch (err) {
    console.error("Error in getSubjectsByClassController:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subjects"
    });
  }
};

// Get all available classes
const getAllClassesController = async (req, res) => {
  try {
    const classes = await getAllClasses();
    
    res.json({
      success: true,
      classes
    });
  } catch (err) {
    console.error("Error in getAllClassesController:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch classes"
    });
  }
};

// Create subject (for teachers)
const createSubject = async (req, res) => {
  try {
    const { subject_name, subject_code, class: className, teacher_id } = req.body;
    
    if (!subject_name || !subject_code || !className) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    
    const teacherId = teacher_id || req.user.id; 
    
    const newSubject = await insertSubject(
      subject_name,
      subject_code,
      className,
      teacherId
    );
    
    res.json({
      success: true,
      message: "Subject created successfully",
      subject: newSubject
    });
  } catch (err) {
    //to check if the code alredy exists  so that admin can get the error 
    // right away and know the subject already exists 
    //here err.message comes from the insert model which throws "Subject code already exists"
    //front gets the mesage displays in the toast
      if (err.message === "Subject code already exists") {
      return res.status(400).json({
        success: false,
        message: "Subject code already exists. Please check manage subject and add subject!",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create subject"
    });
  }
};

// Delete subject
const deleteSubjectController = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await deleteSubject(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Subject not found"
      });
    }
    
    res.json({
      success: true,
      message: "Subject deleted successfully"
    });
  } catch (err) {
    console.error("Error in deleteSubjectController:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete subject"
    });
  }
};

const editSubjectController = async (req, res) => {
  try {
    const {
      subjectId,
      subject_name,
      subject_code,
      class: className,
    } = req.body;

    if (!subject_name || !subject_code || !className) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedSubject = await editSubject(
      subjectId,
      subject_name,
      subject_code,
      className
    );

    res.json({
      success: true,
      message: "Updated Successfully!",
      subject: updatedSubject,
    });
  } catch (err) {
    console.error("Error editing subject:", err);

    res.status(500).json({
      success: false,
      message: "Failed to edit subject!",
    });
  }
};


export {
  getSubjectsByClassController,
  getAllClassesController,
  createSubject,
  deleteSubjectController,
  editSubjectController,
};
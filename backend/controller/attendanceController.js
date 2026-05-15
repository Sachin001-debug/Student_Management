import pool from "../config/db.js";

export const markAttendanceController = async (req, res) => {
  try {
    const { records, date } = req.body;
    // records = [{student_id, status}]

    const className = req.user.class_name || null;

    for (let r of records) {
      await pool.query(
        `INSERT INTO attendance (student_id, class_name, date, status)
         VALUES ($1, $2, $3, $4)`,
        [r.student_id, className, date, r.status]
      );
    }

    res.json({
      success: true,
      message: "Attendance saved successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error saving attendance"
    });
  }
};
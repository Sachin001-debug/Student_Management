import pool from "../config/db.js";

export const markAttendanceController = async (req, res) => {
  try {
    const { records, date } = req.body;
    // records = [{student_id, status}]
    const className = req.user.class_name || null;

    for (let r of records) {
      await pool.query(
        `
        INSERT INTO attendance (student_id, class_name, date, status)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (student_id, class_name, date)
        DO NOTHING
        `,
        [r.student_id, className, date, r.status]
      );
    }

    res.json({
      success: true,
      message: "Attendance saved successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error saving attendance",
    });
  }
};

export const getTodayAttendanceController = async (req, res) => {
  try {
    const className = req.user.class_name;

    const result = await pool.query(
      `
      SELECT student_id, status
      FROM attendance
      WHERE class_name = $1
      AND date = CURRENT_DATE
      `,
      [className]
    );

    res.json({
      success: true,
      attendance: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
    });
  }
};
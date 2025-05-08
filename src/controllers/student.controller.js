/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger } from "../utils/index.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM students");
    res.status(200).json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }
};


export const updateStudentById = async (req, res) => {
  const { id } = req.params;

  const {
    first_name,
    last_name,
    student_id,
    email,
    date_of_birth,
    contact_number,
    enrollment_date,
    profile_picture,
  } = req.body;

  try {
    const check = await pool.query(
      `SELECT * FROM students 
       WHERE (student_id = $1 OR email = $2 OR contact_number = $3)
         AND id = $4`,
      [student_id, email, contact_number, id]
    );

    if (check.rows.length > 0) {
      return res.status(409).json({ message: 'Student ID, Email or Contact Number already exists.' });
    }

    const result = await pool.query(
      `UPDATE students 
       SET  
         first_name = $1,
         last_name = $2,
         student_id = $3,
         email = $4,
         date_of_birth = $5,
         contact_number = $6,
         enrollment_date = $7,
         profile_picture = $8
       WHERE id = $9
       RETURNING *`,
      [
        first_name,
        last_name,
        student_id,
        email,
        date_of_birth,
        contact_number,
        enrollment_date,
        profile_picture,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student: result.rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};







export const deleteStudent = async (req, res) => {
  const {id}=req.params;
  try {
    const delData= await pool.query("delete from students where id=$1",[id]);
    if (delData.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    res.json({
      success: true,
      message: "Student is removed",
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in Delete/STUDENTS, ${err?.message}`,
    });
  }
};

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

export const selectStudentById = async (req, res) => {
  const {id} = req.params;
    try {
    const student = await pool.query("SELECT * FROM students where id=$1",[id]);
    res.status(200).json({
      success: true,
      count: student.rows.length,
      data: student.rows,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }
};



export const insertStudent=async(req,res)=>{
  const id=req.params.id
  const{
    first_name,
    last_name,
    student_id,
    email,
    date_of_birth,
    contact_number,
    enrollment_date,
    profile_picture,
  }=req.body



  try {

const selectquery=await pool.query(
  `SELECT * FROM students WHERE(student_id=$1 OR contact_number=$2 OR email=$3 )AND id=$4`,[student_id,email,contact_number,id]
)

if(selectquery.rows.length>0){
  return res.status(409).json({message:"Email,contact number, student-id are allready exist"})
}


   const data = await pool.query(
      `INSERT INTO students (first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date,profile_picture)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,[   first_name,
        last_name,
        student_id,
        email,
        date_of_birth,
        contact_number,
        enrollment_date,
        profile_picture
      ]
    )

    if(data.rows.length>0){
      res.status(409).json({message:"student not "})
    } else{
      res.status(201).json({message:"Students are inserted well",students:data.rows[0]})
    }


  
  } catch (error) {
    console.error(error.message)
    res.status(500).json({message:error.message})
  }
}

export const deleteStudentById=async(req,res)=>{
  const id=req.params.id
  try {
   const checkdelete=await pool.query(
    `SELECT * FROM students WHERE id=$1`,[id]
   )

   if(checkdelete.rows.length===0){
    return res.status(409).json({message:"Student with that id is not exist"})
   }
   const result=await pool.query(
    `DELETE FROM students WHERE id=$1`,[id]
   )

   
   return res.status(201).json({message:"Student  is Deleted",Student: result.rows[0]})
   
  } catch (error) {
    res.status(500).json({message:"internal server error"})
  }
}

export const updateStudent = async (req, res) => {
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





export const searchStudentByName = async (req, res) => {
  const { first_name } = req.params;

  try {
    const response = await pool.query(
       `SELECT * FROM students WHERE LOWER(first_name) LIKE LOWER($1)`,
      [`%${first_name}%`]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ message: "No students found with that first name" });
    }

    return res.status(200).json({
      message: "Student(s) found",
      students: response.rows
    });
  } catch (error) {
    console.error("Error fetching student by first name:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




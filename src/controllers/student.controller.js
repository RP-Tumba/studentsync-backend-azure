/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger } from "../utils/index.js";

import { Client } from "pg";
import express from "express";
const stdInfo = express();
stdInfo.use(express.json())




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




export const insertingstudent=async(req,res)=>{
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



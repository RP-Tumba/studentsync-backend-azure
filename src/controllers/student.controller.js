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


export const insertStudent = async (req,res)=>{
  try{
    const putData = await pool.query("insert into students values(3,'Noellaa','Uwajeneza','S1221112','noella@gmail.com','2002-12-31T22:01:00.000Z','0792435990','2022-12-31T22:00:00.000Z','words.jpg','2025-06-06T12:40:38.436Z','2025-05-06T12:40:38.436Z')")
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
}



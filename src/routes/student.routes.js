/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";
import { getAllStudents, deleteStudentById, updateStudent, selectStudentById, insertStudent,searchStudentByName } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudents);  
router.get("/:id", selectStudentById);
router.put('/:id',updateStudent);
router.post('/',insertStudent);
router.delete("/:id", deleteStudentById);
router.get('/name/:first_name', searchStudentByName);

export default router;

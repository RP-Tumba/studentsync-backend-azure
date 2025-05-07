/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";
import { deletingbyid, getAllStudents, insertingstudent,updateStudentById, selectingstudentbyid,  updatestudents } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getAllStudents);
router.put('/:id',updateStudentById);
router.delete('/:id',deletingbyid);
router.get('/:id',selectingstudentbyid);
router.put('/:id',updatestudents)
router.post('/',insertingstudent)
export default router;

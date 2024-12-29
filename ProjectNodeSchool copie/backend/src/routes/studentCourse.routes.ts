import { Router } from 'express';
import {
    assignStudentToCourse,
    getCoursesByStudentId,
    getStudentsByCourseId,
    removeStudentFromCourse,
} from '../controllers/studentCourse.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: StudentCourses
 *   description: API for managing student-course assignments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentCourse:
 *       type: object
 *       properties:
 *         student_id:
 *           type: integer
 *           description: The ID of the student
 *         course_id:
 *           type: integer
 *           description: The ID of the course
 *         enrollment_date:
 *           type: string
 *           format: date-time
 *           description: The date the student was assigned to the course
 */




/**
 * @swagger
 * /api/student-courses:
 *   post:
 *     summary: Assign a student to a course
 *     tags: [StudentCourses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentCourse'
 *     responses:
 *       201:
 *         description: Student assigned to course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentCourse'
 */
router.post('/', assignStudentToCourse);

/**
 * @swagger
 * /api/student-courses/student/{student_id}:
 *   get:
 *     summary: Get all courses assigned to a student
 *     tags: [StudentCourses]
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of courses for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/student/:student_id', getCoursesByStudentId);

/**
 * @swagger
 * /api/student-courses/course/{course_id}:
 *   get:
 *     summary: Get all students assigned to a course
 *     tags: [StudentCourses]
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of students for the course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/course/:course_id', getStudentsByCourseId);

/**
 * @swagger
 * /api/student-courses/{id}:
 *   delete:
 *     summary: Remove a student from a course
 *     tags: [StudentCourses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student removed from course
 *       404:
 *         description: Assignment not found
 */
router.delete('/:id', removeStudentFromCourse);

export default router;

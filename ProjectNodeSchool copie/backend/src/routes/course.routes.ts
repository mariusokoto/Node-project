import { Router } from 'express';
import {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} from '../controllers/course.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API for managing courses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         course_name:
 *           type: string
 *           description: The name of the course
 *         description:
 *           type: string
 *           description: A description of the course
 *         credit_hours:
 *           type: integer
 *           description: The number of credit hours for the course
 *         department:
 *           type: string
 *           description: The department offering the course
 *         teacher_id:
 *           type: integer
 *           description: The ID of the teacher assigned to the course
 *         day_of_week:
 *           type: string
 *           description: The day of the week the course is held
 *         start_time:
 *           type: string
 *           format: date-time
 *           description: The start time of the course
 *         end_time:
 *           type: string
 *           format: date-time
 *           description: The end time of the course
 *         semester:
 *           type: string
 *           description: The semester in which the course is offered
 *         max_students:
 *           type: integer
 *           description: The maximum number of students allowed in the course
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When the course was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: When the course was last updated
 */




 /**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
router.post('/', createCourse);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', getCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 */
router.get('/:id', getCourseById);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 */
router.put('/:id', updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course deleted
 *       404:
 *         description: Course not found
 */
router.delete('/:id', deleteCourse);

export default router;

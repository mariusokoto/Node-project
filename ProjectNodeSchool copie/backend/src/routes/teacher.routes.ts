import { Router } from 'express';
import {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
} from '../controllers/teacher.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: API for managing teachers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           description: The first name of the teacher
 *         last_name:
 *           type: string
 *           description: The last name of the teacher
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: The date of birth of the teacher
 *         email:
 *           type: string
 *           description: The email address of the teacher
 *         enrollment_date:
 *           type: string
 *           format: date
 *           description: The enrollment date of the teacher
 *         department:
 *           type: string
 *           description: The department of the teacher
 *         courses_taught:
 *           type: string
 *           description: A list of courses taught by the teacher
 *         password:
 *           type: string
 *           description: The password of the teacher
 */

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: List of teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */
router.get('/', getTeachers);

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Teacher created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
router.post('/', createTeacher);

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Teacher details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
router.get('/:id', getTeacherById);

/**
 * @swagger
 * /api/teachers/{id}:
 *   put:
 *     summary: Update a teacher by ID
 *     tags: [Teachers]
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
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Teacher updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
router.put('/:id', updateTeacher);

/**
 * @swagger
 * /api/teachers/{id}:
 *   delete:
 *     summary: Delete a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Teacher deleted
 */
router.delete('/:id', deleteTeacher);

export default router;

import { Request, Response } from 'express';
import pool from '../config/database';

// Assign a student to a course
export const assignStudentToCourse = async (req: Request, res: Response): Promise<void> => {
    const { student_id, course_id } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO student_courses (student_id, course_id) VALUES ($1, $2) RETURNING *`,
            [student_id, course_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error instanceof Error) {
            if ((error as any).code === '23505') { // Handle unique constraint violations
                res.status(400).json({ error: 'Student is already assigned to this course', details: error.message });
            } else {
                res.status(500).json({ error: 'Failed to assign student to course', details: error.message });
            }
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};


// Get all courses assigned to a specific student
export const getCoursesByStudentId = async (req: Request, res: Response): Promise<void> => {
    const { student_id } = req.params;

    try {
        const result = await pool.query(
            `SELECT sc.id, c.*
             FROM student_courses sc
                      INNER JOIN courses c ON sc.course_id = c.course_id
             WHERE sc.student_id = $1`,
            [student_id]
        );
        res.json(result.rows);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'Failed to fetch courses for the student', details: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get all students assigned to a specific course
export const getStudentsByCourseId = async (req: Request, res: Response): Promise<void> => {
    const { course_id } = req.params;

    try {
        const result = await pool.query(
            `SELECT sc.id, s.* 
             FROM student_courses sc
             INNER JOIN students s ON sc.student_id = s.student_id
             WHERE sc.course_id = $1`,
            [course_id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students for the course', details: error });
    }
};

// Remove a student from a course
export const removeStudentFromCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM student_courses WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Assignment not found' });
        } else {
            res.json({ message: 'Student removed from course successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove student from course', details: error });
    }
};

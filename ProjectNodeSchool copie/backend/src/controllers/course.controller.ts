import { Request, Response } from 'express';
import pool from '../config/database';

// Create a new course
export const createCourse = async (req: Request, res: Response): Promise<void> => {
    const {
        course_name,
        description,
        credit_hours,
        department,
        teacher_id,
        day_of_week,
        start_time,
        end_time,
        semester,
        max_students,
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO courses (
                course_name, description, credit_hours, department, teacher_id, 
                day_of_week, start_time, end_time, semester, max_students
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                course_name,
                description,
                credit_hours,
                department,
                teacher_id,
                day_of_week,
                start_time,
                end_time,
                semester,
                max_students,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create course', details: error });
    }
};

// Get all courses
export const getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch courses', details: error });
    }
};

// Get a course by ID
export const getCourseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM courses WHERE course_id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Course not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch course', details: error });
    }
};

// Update a course by ID
export const updateCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
        course_name,
        description,
        credit_hours,
        department,
        teacher_id,
        day_of_week,
        start_time,
        end_time,
        semester,
        max_students,
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE courses SET
                course_name = $1, description = $2, credit_hours = $3, department = $4,
                teacher_id = $5, day_of_week = $6, start_time = $7, end_time = $8,
                semester = $9, max_students = $10, updated_at = CURRENT_TIMESTAMP
            WHERE course_id = $11 RETURNING *`,
            [
                course_name,
                description,
                credit_hours,
                department,
                teacher_id,
                day_of_week,
                start_time,
                end_time,
                semester,
                max_students,
                id,
            ]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Course not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update course', details: error });
    }
};

// Delete a course by ID
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM courses WHERE course_id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Course not found' });
        } else {
            res.json({ message: 'Course deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete course', details: error });
    }
};

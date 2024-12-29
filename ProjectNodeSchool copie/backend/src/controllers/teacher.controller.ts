import { Request, Response } from 'express';
import pool from '../config/database';

// Create a new teacher
export const createTeacher = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, date_of_birth, email, enrollment_date, department, courses_taught, password } = req.body;

    try {
        await pool.query('BEGIN');

        // Create a user
        const userResult = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING user_id',
            [email, password, 'teacher']
        );
        const userId = userResult.rows[0].user_id;

        // Create a teacher linked to the user
        const teacherResult = await pool.query(
            'INSERT INTO teachers (user_id, first_name, last_name, date_of_birth, email, enrollment_date, department, courses_taught, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [userId, first_name, last_name, date_of_birth, email, enrollment_date, department, courses_taught, password]
        );

        await pool.query('COMMIT');

        res.status(201).json(teacherResult.rows[0]);
    } catch (error) {
        //case of error
        await pool.query('ROLLBACK');
        res.status(500).json({ error: 'Failed to create teacher', details: error });
    }
};


// Get all teachers
export const getTeachers = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM teachers');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teachers', details: error });
    }
};

// Get a teacher by ID
export const getTeacherById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM teachers WHERE teacher_id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Teacher not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch teacher', details: error });
    }
};

// Update a teacher by ID
export const updateTeacher = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { first_name, last_name, date_of_birth, email, enrollment_date, department, courses_taught, password, user_id } = req.body;

    try {
        const result = await pool.query(
            'UPDATE teachers SET first_name = $1, last_name = $2, date_of_birth = $3, email = $4, enrollment_date = $5, department = $6, courses_taught = $7, password = $8, user_id = $9 WHERE teacher_id = $10 RETURNING *',
            [first_name, last_name, date_of_birth, email, enrollment_date, department, courses_taught, password, user_id, id]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Teacher not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update teacher', details: error });
    }
};

// Delete a teacher by ID
export const deleteTeacher = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM teachers WHERE teacher_id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Teacher not found' });
        } else {
            res.json({ message: 'Teacher deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete teacher', details: error });
    }
};

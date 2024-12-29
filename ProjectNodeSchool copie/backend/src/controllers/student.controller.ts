import { Request, Response } from 'express';
import pool from '../config/database';

// Create a new student
export const createStudent = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, date_of_birth, current_academic_year, email, major, enrollment_date, password } = req.body;

    try {
        await pool.query('BEGIN');

        // Create a user in the users table
        const userResult = await pool.query(
            'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING user_id',
            [email, password, 'student']
        );
        const userId = userResult.rows[0].user_id;

        // Create a student linked to the user in the students table
        const studentResult = await pool.query(
            `INSERT INTO students (
                user_id, first_name, last_name, date_of_birth, current_academic_year, email, major, enrollment_date, password
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [userId, first_name, last_name, date_of_birth, current_academic_year, email, major, enrollment_date, password]
        );

        await pool.query('COMMIT');

        res.status(201).json(studentResult.rows[0]);
    } catch (error) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: 'Failed to create student', details: error });
    }
};



// Get all students
export const getStudents = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students', details: error });
    }
};

// Get a student by ID
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM students WHERE student_id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student', details: error });
    }
};

// Update a student by ID
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { first_name, last_name, date_of_birth, current_academic_year, email, major, enrollment_date } = req.body;

    try {
        const result = await pool.query(
            'UPDATE students SET first_name = $1, last_name = $2, date_of_birth = $3, current_academic_year = $4, email = $5, major = $6, enrollment_date = $7 WHERE student_id = $8 RETURNING *',
            [first_name, last_name, date_of_birth, current_academic_year, email, major, enrollment_date, id]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student', details: error });
    }
};

// Delete a student by ID
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM students WHERE student_id = $1', [id]);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student', details: error });
    }
};

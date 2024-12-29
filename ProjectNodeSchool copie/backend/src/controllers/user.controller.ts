import { Request, Response } from 'express';
import pool from '../config/database';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Email or password incorrect' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Email or password incorrect' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: only admin can access' });
        }

        res.status(200).json({ message: 'Connexion successful', userId: user.user_id, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error' });
    }
};

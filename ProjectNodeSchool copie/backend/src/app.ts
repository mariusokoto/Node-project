import express from 'express';
import pool from './config/database';
import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';
import courseRoutes from './routes/course.routes';
import studentCourseRoutes from './routes/studentCourse.routes';
import userRoutes from './routes/user.routes';
import { setupSwagger } from './swagger';
import cors from 'cors';

const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:4200', // Allow only requests from Angular frontend
    credentials: true,// Allow cookies if needed
}));

// Add middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript backend is running!');
});

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Database connected!', timestamp: result.rows[0].now });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'Failed to connect to the database', details: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

app.get('/api/students/majors', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT major, COUNT(*)::INTEGER AS student_count
      FROM students
      GROUP BY major;
    `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student majors' });
    }
});



// Add student routes
app.use('/api/students', studentRoutes);

// Add teacher routes
app.use('/api/teachers', teacherRoutes);

// Add course routes
app.use('/api/courses', courseRoutes);

// Add student-course routes
app.use('/api/student-courses', studentCourseRoutes);

// Authentication
app.use('/api/users', userRoutes);

// Add Swagger documentation
setupSwagger(app);

export default app;

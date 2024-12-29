import pool from './database';

const createTables = async () => {
    const queries = [
        'CREATE TABLE IF NOT EXISTS users (' +
        'user_id SERIAL PRIMARY KEY, ' +
        'email VARCHAR(255) NOT NULL UNIQUE, ' +
        'password VARCHAR(255) NOT NULL, ' +
        "role VARCHAR(50) CHECK (role IN ('admin', 'teacher', 'student')) NOT NULL " +
        ');',

        'CREATE TABLE IF NOT EXISTS students (' +
        'student_id SERIAL PRIMARY KEY, ' +
        'user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE, ' +
        'first_name VARCHAR(50) NOT NULL, ' +
        'last_name VARCHAR(50) NOT NULL, ' +
        'date_of_birth DATE NOT NULL, ' +
        'current_academic_year INTEGER NOT NULL, ' +
        'email VARCHAR(100) UNIQUE NOT NULL, ' +
        'major VARCHAR(100), ' +
        'enrollment_date DATE NOT NULL, ' +
        'password VARCHAR(100) NOT NULL ' +
        ');',

        'CREATE TABLE IF NOT EXISTS teachers (' +
        'teacher_id SERIAL PRIMARY KEY, ' +
        'user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE, ' +
        'first_name VARCHAR(50) NOT NULL, ' +
        'last_name VARCHAR(50) NOT NULL, ' +
        'date_of_birth DATE NOT NULL, ' +
        'email VARCHAR(100) UNIQUE NOT NULL, ' +
        'enrollment_date DATE NOT NULL, ' +
        'department VARCHAR(100), ' +
        'courses_taught TEXT, ' +
        'password VARCHAR(100) NOT NULL ' +
        ');',

        'CREATE TABLE IF NOT EXISTS courses (' +
        'course_id SERIAL PRIMARY KEY, ' +
        'course_name VARCHAR(100) NOT NULL, ' +
        'description TEXT, ' +
        'credit_hours INTEGER NOT NULL, ' +
        'department VARCHAR(100), ' +
        'teacher_id INTEGER REFERENCES teachers(teacher_id) ON DELETE SET NULL, ' +
        'day_of_week VARCHAR(10) NOT NULL, ' +
        'start_time TIMESTAMP NOT NULL, ' +
        'end_time TIMESTAMP NOT NULL, ' +
        'semester VARCHAR(20) NOT NULL, ' +
        'max_students INTEGER, ' +
        'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
        'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ' +
        ');',

        'CREATE TABLE IF NOT EXISTS student_courses (' +
        'id SERIAL PRIMARY KEY, ' +
        'student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE, ' +
        'course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE, ' +
        'enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
        'UNIQUE (student_id, course_id) ' +
        ');',

        'CREATE TABLE IF NOT EXISTS grades (' +
        'grade_id SERIAL PRIMARY KEY, ' +
        'student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE, ' +
        'course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE, ' +
        'teacher_id INTEGER NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE, ' +
        'grade NUMERIC(3, 1), ' +
        'assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
        'grade_type VARCHAR(50), ' +
        'UNIQUE (student_id, course_id, teacher_id, grade_type) ' +
        ');',

        'CREATE TABLE IF NOT EXISTS attendance (' +
        'attendance_id SERIAL PRIMARY KEY, ' +
        'student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE, ' +
        'course_id INTEGER NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE, ' +
        'teacher_id INTEGER NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE, ' +
        'is_present INTEGER CHECK (is_present IN (0, 1)), ' +
        'marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
        'UNIQUE (student_id, course_id, teacher_id) ' +
        ');'
    ];

    try {
        const client = await pool.connect();
        for (const query of queries) {
            await client.query(query);
            console.log('Table created successfully');
        }
        client.release();
        return Promise.resolve();
    } catch (err) {
        console.error('Error creating tables:', err);
        return Promise.reject(err);
    }
};

createTables().then(() => console.log('Tables created successfully')).catch(err => console.error('Error during table creation:', err));

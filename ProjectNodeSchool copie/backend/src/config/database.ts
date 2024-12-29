import { Pool } from 'pg';

const pool = new Pool({
    user: 'schoolUser',
    host: 'localhost',
    database: 'SchoolPortalProject',
    password: 'secret',
    port: 5432,
});

export default pool;
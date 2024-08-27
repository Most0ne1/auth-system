import { defineEventHandler, readBody } from 'h3';
import pg from 'pg';
import { createHash, randomBytes } from 'crypto';

const { Client } = pg; // Correct import for recent versions

const dbClient = new Client({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_db_password',
  port: 5432,
});

dbClient.connect();

const hashPassword = (password: string) => {
  const hash = createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

const createToken = (userId: number) => {
  return `${userId}-${randomBytes(16).toString('hex')}`;
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, lastName, email, password, img, nationality, gender } = body;

    if (!name || !lastName || !email || !password || !nationality || !gender) {
      return { error: 'All fields are required' };
    }

    const hashedPassword = hashPassword(password);

    const result = await dbClient.query(
      'INSERT INTO users (name, last_name, email, password, img, nationality, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, lastName, email, hashedPassword, img, nationality, gender]
    );

    const newUser = result.rows[0];
    const token = createToken(newUser.id);

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.last_name,
        email: newUser.email,
        img: newUser.img,
        nationality: newUser.nationality,
        gender: newUser.gender,
      },
      token,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed' };
  }
});

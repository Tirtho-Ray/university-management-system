import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });
export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt:process.env.BCRIPT_SALT_ROUNDS,
  default_pass:process.env.DEFAULT_PASS,
};

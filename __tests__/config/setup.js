import dotenv from 'dotenv';
import { resolve } from 'path';

// Load test environment variables
dotenv.config({
  path: resolve(process.cwd(), '__tests__/config/test.env')
}); 
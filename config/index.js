/**
 * @fileoverview Configuration management module that loads and exports application settings
 * @module config
 */

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * @typedef {Object} Config
 * @property {number} port - Server port number
 * @property {string} nodeEnv - Node environment (development/production)
 * @property {string[]} corsOrigins - Allowed CORS origins
 * @property {Object} database - Database configuration
 * @property {string} database.url - Database connection URL
 * @property {string} jwtSecret - Secret key for JWT signing
 * @property {string} jwtExpiresIn - JWT expiration time
 */

/**
 * Application configuration object
 * @type {Config}
 */
export default {
  // Server port configuration with fallback to 3000
  port: process.env.PORT || 3000,

  // Node environment with fallback to development
  nodeEnv: process.env.NODE_ENV || 'development',

  // CORS configuration - accepts comma-separated list of origins from env
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],

  // Database configuration
  database: {
    url: process.env.DATABASE_URL,
  },

  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
}; 
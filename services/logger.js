/**
 * @fileoverview Logging service configuration using Winston
 * @module services/logger
 */

import winston from 'winston';

/**
 * Winston logger instance configuration
 * Provides different logging levels and transports
 * 
 * @constant {winston.Logger} logger
 * 
 * @example
 * // Usage in other files
 * import logger from '../services/logger.js';
 * 
 * logger.info('User logged in', { userId: '123' });
 * logger.error('Database connection failed', { error: err });
 */
const logger = winston.createLogger({
  /**
   * Minimum logging level
   * Levels: error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
   */
  level: 'info',

  /**
   * Log format configuration
   * JSON format for better parsing and analysis
   */
  format: winston.format.json(),

  /**
   * Output destinations for logs
   * @type {Array<winston.transport>}
   */
  transports: [
    // Error logs go to error.log
    new winston.transports.File({ 
      filename: 'error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // All logs go to combined.log
    new winston.transports.File({ 
      filename: 'combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

/**
 * Add Console transport for non-production environments
 * Provides real-time logging output during development
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger; 
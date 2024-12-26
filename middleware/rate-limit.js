/**
 * @fileoverview Rate limiting middleware for API protection
 * @module middleware/rate-limit
 */

import rateLimit from 'express-rate-limit';

/**
 * Rate limiter configuration for authentication routes
 * Prevents brute force attacks by limiting login attempts
 * 
 * @constant {import('express-rate-limit').RateLimit} authLimiter
 * 
 * @example
 * // Usage in auth routes
 * app.post('/auth/login', authLimiter, loginHandler);
 * 
 * @example
 * // Usage with Express router
 * const authRouter = express.Router();
 * authRouter.use(authLimiter);
 */
export const authLimiter = rateLimit({
  // Time window for rate limiting (15 minutes)
  windowMs: 15 * 60 * 1000,

  // Maximum number of requests per IP in the time window
  max: 5,

  // Error message when rate limit is exceeded
  message: 'Too many login attempts, please try again later',

  /**
   * Standardized rate limit info in the `RateLimit-*` headers
   * @see https://tools.ietf.org/id/draft-polli-ratelimit-headers-00.html
   */
  standardHeaders: true,

  /**
   * Legacy X-RateLimit-* headers
   * @deprecated Use standardHeaders instead
   */
  legacyHeaders: false
}); 
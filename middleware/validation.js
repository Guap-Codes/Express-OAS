/**
 * @fileoverview Request validation middleware using Joi
 * @module middleware/validation
 */

import Joi from 'joi';

/**
 * Joi schema for validating user data
 * Defines the required structure and rules for user objects
 * 
 * @constant {Joi.ObjectSchema} userSchema
 */
const userSchema = Joi.object({
  /** Unique identifier for the user */
  id: Joi.string()
    .required()
    .description('User\'s unique identifier'),

  /** User's full name */
  name: Joi.string()
    .required()
    .description('User\'s full name'),

  /** User's email address */
  email: Joi.string()
    .email()
    .required()
    .description('User\'s email address')
});

/**
 * Middleware to validate user request body against schema
 * 
 * @function validateUser
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void}
 * 
 * @throws {400} - If validation fails
 * 
 * @example
 * // Usage in route
 * router.post('/users', validateUser, createUser);
 * 
 * @example
 * // Valid request body
 * {
 *   "id": "123",
 *   "name": "John Doe",
 *   "email": "john@example.com"
 * }
 */
export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}; 
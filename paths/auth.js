/**
 * @fileoverview Authentication routes for user login
 * @module paths/auth
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mockDatabaseInstance from '../database.js';
import config from '../config/index.js';

/**
 * Authentication route operations
 * @returns {Object} Route handlers and their OpenAPI documentation
 */
export default function() {
  let operations = {
    POST
  };

  /**
   * Authenticate user and generate JWT token
   * 
   * @function POST
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   * @throws {401} Invalid credentials
   * 
   * @example
   * // Request body
   * {
   *   "email": "user@example.com",
   *   "password": "userPassword123"
   * }
   * 
   * @example
   * // Success response
   * {
   *   "token": "eyJhbGciOiJIUzI1NiIs..."
   * }
   */
  async function POST(req, res, next) {
    try {
      const { email, password } = req.body;
      const users = mockDatabaseInstance.getAll();
      const user = users.find(u => u.email === email);

      console.log('Login attempt:', { email });
      console.log('Found user:', user);
      console.log('Received password:', password);
      console.log('Stored hash:', user.password);

      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('Password comparison result:', isValidPassword);

      if (!user || !isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: '1h' }
      );

      console.log('Generated token:', token);
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      next(error);
    }
  }

  /**
   * OpenAPI documentation for POST operation
   * @type {Object}
   */
  POST.apiDoc = {
    summary: "Login user",
    operationId: "loginUser",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email" },
              password: { type: "string" }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string" }
              }
            }
          }
        }
      },
      401: {
        description: "Authentication failed",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" }
              }
            }
          }
        }
      }
    }
  };

  return operations;
} 
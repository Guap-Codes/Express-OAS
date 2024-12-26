/**
 * @fileoverview Authentication and authorization middleware
 * @module middleware/auth
 */

import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { permissions } from '../models/user.js';

/**
 * Middleware to verify JWT tokens in the request header
 * 
 * @function verifyToken
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void}
 * 
 * @example
 * // Usage in route
 * router.get('/protected', verifyToken, (req, res) => {
 *   // Access authenticated user data
 *   const userId = req.user.id;
 * });
 */
export const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Middleware factory to check user permissions for specific actions
 * 
 * @function checkPermission
 * @param {string} action - The action to check ('create', 'read', 'update', 'delete')
 * @returns {import('express').RequestHandler} Express middleware function
 * 
 * @example
 * // Usage in route
 * router.put('/users/:id', verifyToken, checkPermission('update'), updateUser);
 */
export const checkPermission = (action) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = permissions[userRole];

    if (!userPermissions) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Check if user has required permission
    const hasPermission = userPermissions.some(permission => {
      // Allow if user has full access to action
      if (permission === `${action}:any`) return true;
      // Allow if user has own-resource access and is accessing own resource
      if (permission === `${action}:own` && req.params.id === req.user.id) return true;
      return false;
    });

    if (!hasPermission) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
}; 
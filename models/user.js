/**
 * @fileoverview User model and role-based access control definitions
 * @module models/user
 */

/**
 * Collection of user records
 * @type {Array<User>}
 * 
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user
 * @property {string} email - User's email address
 * @property {string} password - Hashed password
 * @property {string} name - User's full name
 * @property {string} role - User's role (admin/user)
 * @property {string|null} refreshToken - JWT refresh token
 */
const users = [
  {
    id: "1",
    email: "admin@example.com",
    // This is "admin123" hashed with bcrypt
    password: "$2b$10$zGUy7qYCfxwkUEJF3XgPJeXsLQpqXHX.t3NXeMb.MsLUk8UQLUQnC",
    name: "Admin User",
    role: "admin",
    refreshToken: null
  },
  {
    id: "2",
    email: "user@example.com",
    // This is "user123" hashed with bcrypt
    password: "$2b$10$YaB6xpBcJe8sWDQ8JVeK8.P.5qKRAZfHFCQYe5mIxsaYj8qWGQNG.",
    name: "Regular User",
    role: "user",
    refreshToken: null
  }
];

/**
 * Enumeration of available user roles
 * @readonly
 * @enum {string}
 */
export const roles = {
  /** Administrator role with full access */
  ADMIN: 'admin',
  /** Standard user role with limited access */
  USER: 'user'
};

/**
 * Permission mappings for each role
 * Format: action:scope where scope is 'any' or 'own'
 * 
 * @readonly
 * @type {Object.<string, string[]>}
 * 
 * @example
 * // Admin permissions
 * permissions[roles.ADMIN] // ['create:any', 'read:any', 'update:any', 'delete:any']
 * 
 * @example
 * // User permissions
 * permissions[roles.USER] // ['read:own', 'update:own', 'delete:own']
 */
export const permissions = {
  [roles.ADMIN]: ['create:any', 'read:any', 'update:any', 'delete:any'],
  [roles.USER]: ['read:own', 'update:own', 'delete:own']
};

export default users; 
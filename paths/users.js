/**
 * @fileoverview User collection routes for managing multiple users
 * @module paths/users
 */

import mockDatabaseInstance from "../database.js";
import { verifyToken, checkPermission } from '../middleware/auth.js';

/**
 * User collection route operations
 * @returns {Object} Route handlers and their OpenAPI documentation
 */
export default function () {
  let operations = {
    GET,
    POST,
  };

  /**
   * Retrieve all users
   * Requires authentication and read permission
   * 
   * @function GET
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   * @returns {void}
   * 
   * @example
   * // Response
   * [
   *   {
   *     "id": "1",
   *     "name": "John Doe",
   *     "email": "john@example.com"
   *   },
   *   // ... more users
   * ]
   */
  function GET(req, res, next) {
    res.status(200).json(mockDatabaseInstance.getAll());
  }

  /**
   * Create a new user
   * Requires authentication and create permission
   * 
   * @function POST
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @param {import('express').NextFunction} next - Express next middleware function
   * @throws {Error} When user already exists
   * 
   * @example
   * // Request body
   * {
   *   "id": "2",
   *   "name": "Jane Smith",
   *   "email": "jane@example.com"
   * }
   */
  function POST(req, res, next) {
    const data = req.body;
    mockDatabaseInstance.addUser(data);
    res.status(201).json(mockDatabaseInstance.getAll());
  }

  /**
   * OpenAPI documentation for GET operation
   * @type {Object}
   */
  GET.apiDoc = {
    summary: "Returns list of users",
    operationId: "getUsers",
    responses: {
      200: {
        description: "List of users",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
      },
    },
  };

  /**
   * OpenAPI documentation for POST operation
   * @type {Object}
   */
  POST.apiDoc = {
    summary: "Creates a new user",
    operationId: "createUser",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Newly created user",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
  };

  // Add middleware to operations
  GET.middleware = [
    verifyToken,
    checkPermission('read')
  ];

  POST.middleware = [
    verifyToken,
    checkPermission('create')
  ];

  return operations;
}

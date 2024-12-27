/**
 * @fileoverview User detail routes for individual user operations
 * @module paths/users/id
 */

import mockDatabaseInstance from "../../database.js";
import { verifyToken, checkPermission } from '../../middleware/auth.js';

/**
 * User detail route operations
 * @returns {Object} Route handlers and their OpenAPI documentation
 */
export default function () {
  let operations = {
    GET,
    PUT,
    DELETE,
  };

  // Add middleware to operations
  GET.middleware = [
    verifyToken,
    checkPermission('read')
  ];

  PUT.middleware = [
    verifyToken,
    checkPermission('update')
  ];

  DELETE.middleware = [
    verifyToken,
    checkPermission('delete')
  ];

  /**
   * Retrieve a single user by ID
   * 
   * @function GET
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @throws {Error} When user is not found
   */
  function GET(req, res) {
    try {
      const user = mockDatabaseInstance.getOne(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Update a user by ID
   * 
   * @function PUT
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @throws {Error} When user is not found
   */
  function PUT(req, res) {
    try {
      const data = req.body;
      const updatedUser = mockDatabaseInstance.updateUser(req.params.id, data);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Delete a user by ID
   * 
   * @function DELETE
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @throws {Error} When user is not found
   */
  function DELETE(req, res) {
    try {
      mockDatabaseInstance.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * OpenAPI documentation for GET operation
   * @type {Object}
   */
  GET.apiDoc = {
    summary: "Returns a single user",
    operationId: "getOneUser",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "User data",
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

  /**
   * OpenAPI documentation for PUT operation
   * @type {Object}
   */
  PUT.apiDoc = {
    summary: "Updates an existing user",
    operationId: "updateUser",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          type: "string",
        },
        required: true,
      },
    ],
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
      200: {
        description: "Updated user",
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

  /**
   * OpenAPI documentation for DELETE operation
   * @type {Object}
   */
  DELETE.apiDoc = {
    summary: "Deletes an existing user",
    operationId: "deleteUser",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      204: {
        description: "No content",
        content: {},
      },
    },
  };

  return operations;
}

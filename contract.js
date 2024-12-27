/**
 * @fileoverview OpenAPI contract generator for API documentation
 * @module contract
 */

import { OpenAPIFramework } from "openapi-framework";

/**
 * Generate OpenAPI definition file from API routes and documentation
 * Uses OpenAPIFramework to create a complete API specification
 * 
 * @async
 * @function generateApiDefinition
 * @returns {Promise<void>} Outputs OpenAPI JSON to console
 * 
 * @example
 * // Run from command line
 * node contract.js > api-definition.json
 */
const framework = new OpenAPIFramework({
  /**
   * Type of OpenAPI implementation
   * 'middleware' is used for Express.js integration
   */
  featureType: 'middleware',

  /**
   * Name of the OpenAPI implementation
   * Matches the library being used (express-openapi)
   */
  name: "express-openapi",

  /**
   * Path to base OpenAPI definition file
   * Contains API info, servers, and base components
   */
  apiDoc: './doc/api-definition-base.yml',

  /**
   * Directory containing API route handlers
   * Each file defines operations for a specific path
   */
  paths: "./paths"
});

/**
 * Initialize the framework and generate OpenAPI definition
 * 
 * @throws {Error} If initialization fails or paths are invalid
 */
await framework.initialize({});

/**
 * Output the generated OpenAPI definition
 * Combines base definition with path operations
 */
console.log(JSON.stringify(framework.apiDoc))

/**
 * @fileoverview OpenAPI contract generator for API documentation
 * @module contract
 */

import { initialize } from 'express-openapi';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import YAML from 'yaml';
import express from 'express';

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
// Read base API definition
const baseApiDoc = YAML.parse(
  readFileSync(resolve(process.cwd(), './doc/api-definition-base.yml'), 'utf8')
);

// Create a temporary Express app
const app = express();

// Initialize OpenAPI
const api = await initialize({
  /**
   * Type of OpenAPI implementation
   * 'middleware' is used for Express.js integration
   */
  app,

  /**
   * Name of the OpenAPI implementation
   * Matches the library being used (express-openapi)
   */
  apiDoc: baseApiDoc,

  /**
   * Path to base OpenAPI definition file
   * Contains API info, servers, and base components
   */
  docsPath: '/api-docs',

  /**
   * Directory containing API route handlers
   * Each file defines operations for a specific path
   */
  paths: "./paths",

  /**
   * Enable promise mode for async operations
   */
  promiseMode: true
});

/**
 * Output the generated OpenAPI definition
 * Combines base definition with path operations
 */
console.log(JSON.stringify(api.apiDoc));

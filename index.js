/**
 * @fileoverview Express application entry point with OpenAPI integration
 * @module index
 */

import express from "express";
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config/index.js';
import { initialize } from "express-openapi";

/**
 * Port number for the server to listen on
 * @constant {number}
 */
const PORT = 3000;

/**
 * Express application instance
 * @type {import('express').Application}
 */
const app = new express();

/**
 * Configure security middleware
 * - Helmet for HTTP headers
 * - CORS for cross-origin requests
 * - Rate limiting for DoS protection
 */
app.use(helmet());
app.use(cors({ origin: config.corsOrigins }));

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Enable JSON body parsing
app.use(express.json());

/**
 * Initialize OpenAPI middleware
 * Configures API documentation and route handling
 * 
 * @function initialize
 * @param {Object} options - OpenAPI initialization options
 */
initialize({
  app,
  apiDoc: "./doc/api-definition-base.yml",
  docsPath: "/api-definition",
  exposeApiDocs: (process.env.NODE_ENV !== "production"),
  paths: "./paths",
  promiseMode: true,
  validateApiDoc: true,
  errorMiddleware: (err, req, res) => {
    // Log error
    console.error(err);
    if (err.status) {
      res.status(err.status).json(err);
    } else {
      res.status(500).json({
        message: err.message,
        code: err.name
      });
    }
  }
});

/**
 * Start the server and listen for incoming requests
 * 
 * @listens {number} PORT
 * @throws {Error} If server fails to start
 */
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

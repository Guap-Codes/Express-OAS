import OpenAPIFramework from "openapi-framework";

// Use OpenAPIFramework similarly than in the express-openapi library
// to generate the OpenAPI definition file of our API
const framework = new OpenAPIFramework.default({
  featureType: 'middleware',
  name: "express-openapi",
  apiDoc: './doc/api-definition-base.yml',
  paths: "./paths"
});
await framework.initialize({});

// Output OpenAPI definition
console.log(JSON.stringify(framework.apiDoc))

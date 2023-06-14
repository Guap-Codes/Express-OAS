import express from "express";
import cors from "cors";
import { initialize } from "express-openapi";

const PORT = 3000;

const app = new express();

app.use(express.json());

initialize({
  app,
  docsPath: "/api-definition",
  exposeApiDocs: (process.env.NODE_ENV !== "production"),
  apiDoc: "./doc/api-definition-base.yml",
  paths: "./paths",
  errorMiddleware: (err, req, res, next) => {
    if (err.status) {
      res.status(err.status).json(err);
    } else {
      res.status(400).json({message: err.message, code: err.name});
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

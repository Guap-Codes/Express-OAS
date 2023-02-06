import express from "express";
import cors from "cors";
import { initialize } from "express-openapi";

const PORT = 3000;

const app = new express();

app.use(express.json());

app.use(
  cors({
    origin: "https://editor.swagger.io",
  })
);

initialize({
  app,
  docsPath: "/documentation",
  apiDoc: {
    openapi: "3.0.0",
    info: {
      title: "A getting started API.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "/",
      },
      {
        url: "https://f6b4-XXX-XX-X-XX.ngrok.io",
      },
    ],
    paths: {},
    components: {
      schemas: {
        User: {
          required: ["id"],
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The user's unique identifier",
            },
            name: {
              type: "string",
              description: "The user's preferred name",
            },
            email: {
              type: "string",
              description: "Email address",
            },
          },
        },
      },
    },
  },
  paths: "./paths",
  routesGlob: "**/*.mjs",
  routesIndexFileRegExp: /(?:index)?\.mjs$/,
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

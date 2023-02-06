import mockDatabaseInstance from "../database.mjs";

export default function () {
  let operations = {
    GET,
    POST,
  };

  function GET(req, res, next) {
    res.status(200).json(mockDatabaseInstance.getAll());
  }

  function POST(req, res, next) {
    const data = req.body;
    mockDatabaseInstance.addUser(data);
    res.status(201).json(mockDatabaseInstance.getAll());
  }

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

  return operations;
}

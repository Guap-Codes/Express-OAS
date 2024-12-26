# Express-OAS (User Management API)

A RESTful API service built with Express.js and OpenAPI for user management with JWT authentication and role-based access control.

## Features

- 🔐 JWT Authentication
- 👥 Role-Based Access Control (RBAC)
- 📚 OpenAPI/Swagger Documentation
- 🛡️ Security Best Practices
- 🪵 Logging System
- ✅ Input Validation
- 🚦 Rate Limiting
- 🧪 Testing Setup

## Prerequisites

- Node.js (v18.x or later)
- npm (v9.x or later)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Guap-Codes/express-oas.git
cd express-oas
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1h
CORS_ORIGINS=http://localhost:3000
```


## Usage

### Development

To start the development server, run:
```bash
npm run dev
```

### Production

To start the production server, run:
```bash
npm run start
```

## Testing

To run the tests, run:
```bash
npm test
```

### Linting

To lint the code, run:
```bash
npm run lint
```


### Format Code

To format the code, run:
```bash
npm run format
```


## API Documentation

### Authentication

- **POST /auth/login**: Authenticate user and return JWT token.

### Users

- **GET /users**: Get all users.
- **GET /users/:id**: Get a user by ID.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update a user by ID.
- **DELETE /users/:id**: Delete a user by ID.

```bash
Login
curl -X POST http://localhost:3000/auth \
-H "Content-Type: application/json" \
-d '{"email": "admin@example.com", "password": "admin123"}'
```

### User Management

```bash
Get all users
curl -X GET http://localhost:3000/users\
-H "Authorization: Bearer <JWT_TOKEN>"

Create user
curl -X POST http://localhost:3000/users \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
"id": "3",
"name": "New User",
"email": "new@example.com"
}'

Get user by ID
curl -X GET http://localhost:3000/users/1 \
-H "Authorization: Bearer <token>"

Update user
curl -X PUT http://localhost:3000/users/1 \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
"name": "Updated Name"
}'

Delete user
curl -X DELETE http://localhost:3000/users/1 \
-H "Authorization: Bearer <token>"
```

## Project Structure

```
express-oas/
├── .husky/
│   └── pre-commit    # Husky pre-commit hook
├── config/
│ └── index.js # Configuration management
├── doc/
│ └── api-definition.yml # OpenAPI documentation
├── middleware/
│ ├── auth.js # JWT & RBAC
│ ├── validation.js # Request validation
│ └── rate-limit.js # Rate limiting
├── models/
│ └── user.js # User model & roles
├── paths/
│ ├── auth.js # Auth routes
│ ├── users.js # User collection routes
│ └── users/{id}.js # User detail routes
├── services/
│ └── logger.js # Logging service
└── index.js # Application entry
```

## Security Features

- JWT Authentication
- Role-Based Access Control
- Request Rate Limiting
- Input Validation
- Secure HTTP Headers (Helmet)
- CORS Protection
- Environment Variable Management

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run audit` - Run security audit

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Express.js
- OpenAPI/Swagger
- JWT
- Winston Logger
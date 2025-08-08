# Node.js Express API Project

A well-structured Node.js Express API with MVC architecture, featuring modular routes, controllers, and services.

## Project Structure

```
project-root/
├── server.js                 # Main server file
├── routes/
│   ├── index.js             # Routes entry point
│   ├── projects.js          # Project-related routes
│   ├── food.js              # Food-related routes (example)
│   └── hello.js             # Simple hello route (example)
├── controllers/
│   ├── index.js             # Controllers entry point
│   ├── projectController.js # Project business logic
│   ├── foodController.js    # Food business logic
│   └── userController.js    # User business logic
├── services/
│   ├── index.js             # Services entry point
│   ├── projectService.js    # Project CRUD operations
│   └── foodService.js       # Food CRUD operations
├── models/                  # Database models (if using database)
├── views/                   # Frontend templates/pages
└── package.json
```

## Features

- **Express.js** - Fast, unopinionated web framework
- **MVC Architecture** - Clean separation of concerns
- **Modular Routes** - Organized route structure
- **Service Layer** - Business logic separation
- **Error Handling** - Comprehensive error management
- **Security Middleware** - Helmet for security headers
- **CORS Support** - Cross-origin resource sharing
- **Logging** - Morgan for HTTP request logging

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd node-express-project
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Information
- `GET /api` - API information and available endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Food Items
- `GET /api/food` - Get all food items
- `GET /api/food/:id` - Get food item by ID
- `POST /api/food` - Create new food item
- `PUT /api/food/:id` - Update food item
- `DELETE /api/food/:id` - Delete food item

### Hello
- `GET /api/hello` - Simple hello message
- `GET /api/hello/:name` - Hello with name parameter

## Example Usage

### Get all projects
```bash
curl http://localhost:3000/api/projects
```

### Create a new project
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Project",
    "description": "A sample project",
    "status": "active"
  }'
```

### Get a specific project
```bash
curl http://localhost:3000/api/projects/1
```

## Development

### Adding New Routes

1. Create a new route file in `routes/` directory
2. Create corresponding controller in `controllers/` directory
3. Create corresponding service in `services/` directory
4. Add the route to `routes/index.js`

### Adding Database Support

1. Install database driver (e.g., `mongoose` for MongoDB)
2. Create models in `models/` directory
3. Update services to use database instead of in-memory storage
4. Add database connection in `server.js`

## Dependencies

### Production Dependencies
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `helmet` - Security middleware
- `morgan` - HTTP request logger
- `dotenv` - Environment variable management

### Development Dependencies
- `nodemon` - Auto-restart server during development

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License 
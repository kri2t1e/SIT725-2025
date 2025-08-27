# MVC Architecture Application

A comprehensive Node.js Express application demonstrating the Model-View-Controller (MVC) architectural pattern. This project showcases proper separation of concerns, data validation, and modern web development practices.

## 🏗️ Architecture Overview

This application follows the MVC pattern with the following structure:

### **Model (Data Layer)**
- **`models/Food.js`** - Food entity with validation and business logic
- **`models/Project.js`** - Project entity with validation and business logic
- Handles data structure, validation rules, and business logic
- Provides clean interfaces for data operations

### **View (Presentation Layer)**
- **`views/index.html`** - Main landing page with MVC explanation
- **`views/food.html`** - Interactive food management interface
- **`views/projects.html`** - Interactive project management interface
- Responsive design with modern UI/UX
- Client-side JavaScript for dynamic interactions

### **Controller (Logic Layer)**
- **`controllers/foodController.js`** - Handles HTTP requests for food operations
- **`controllers/projectController.js`** - Handles HTTP requests for project operations
- Manages request/response flow
- Implements proper error handling and status codes

### **Service Layer (Business Logic)**
- **`services/foodService.js`** - Food business operations and data management
- **`services/projectService.js`** - Project business operations and data management
- Separates business logic from controllers
- Handles data persistence and business rules

### **Routes (URL Mapping)**
- **`routes/food.js`** - Food API endpoints
- **`routes/projects.js`** - Project API endpoints
- **`routes/hello.js`** - Simple hello endpoint
- Clean URL structure and RESTful design

## 🚀 Features

- **Complete CRUD Operations** for both Food and Project entities
- **Data Validation** with comprehensive error handling
- **RESTful API** following HTTP standards
- **Modern Frontend** with responsive design
- **Service Layer Architecture** for maintainable code
- **Error Handling** with proper HTTP status codes
- **Security Middleware** (Helmet, CORS)
- **Logging** with Morgan middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mvc-architecture-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## 🌐 API Endpoints

### Food Management
- `GET /api/food` - Get all food items
- `GET /api/food/:id` - Get food by ID
- `POST /api/food` - Create new food item
- `PUT /api/food/:id` - Update food item
- `DELETE /api/food/:id` - Delete food item

### Project Management
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Other
- `GET /api/hello` - Simple hello message
- `GET /api/hello/:name` - Personalized hello message

## 🎨 Frontend Views

- **Home Page** (`/views/index.html`) - Landing page with MVC explanation
- **Food Management** (`/views/food.html`) - Interactive food CRUD interface
- **Project Management** (`/views/projects.html`) - Interactive project CRUD interface

## 🔧 Project Structure

```
├── controllers/          # HTTP request handlers
│   ├── foodController.js
│   ├── projectController.js
│   └── index.js
├── models/              # Data models and business logic
│   ├── Food.js
│   ├── Project.js
│   └── index.js
├── routes/              # URL routing
│   ├── food.js
│   ├── projects.js
│   ├── hello.js
│   └── index.js
├── services/            # Business logic layer
│   ├── foodService.js
│   ├── projectService.js
│   └── index.js
├── views/               # Frontend templates
│   ├── index.html
│   ├── food.html
│   └── projects.html
├── server.js            # Main application entry point
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## 🎯 MVC Benefits Demonstrated

1. **Separation of Concerns**: Each component has a single responsibility
2. **Maintainability**: Code is organized and easy to modify
3. **Testability**: Components can be tested independently
4. **Scalability**: Easy to add new features and entities
5. **Code Reusability**: Services and models can be reused across controllers

## 🧪 Testing the Application

1. **Start the server**: `npm run dev`
2. **Visit the home page**: `http://localhost:3001/views/index.html`
3. **Test Food Management**: `http://localhost:3001/views/food.html`
4. **Test Project Management**: `http://localhost:3001/views/projects.html`
5. **Test API endpoints**: Use Postman or curl to test the REST API

## 📚 Learning Outcomes

This project demonstrates:
- **MVC Architecture** implementation
- **RESTful API** design principles
- **Service Layer** pattern
- **Data Validation** best practices
- **Error Handling** strategies
- **Frontend-Backend** integration
- **Modern JavaScript** features (ES6+, async/await)
- **Express.js** middleware usage

## 🔮 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- File upload functionality
- Real-time updates with WebSockets
- Unit and integration testing
- Docker containerization
- CI/CD pipeline setup

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

This is an educational project demonstrating MVC architecture. Feel free to use it as a reference for your own projects or as a learning resource.

---

**Note**: This application uses in-memory storage for demonstration purposes. In a production environment, you would integrate with a proper database system. 
# Project Management System

A full-stack web application for managing projects with a modern UI, database persistence, and RESTful API.

## Features

### ✅ Completed Features

- **Full CRUD Operations**: Create, Read, Update, Delete projects
- **Database Integration**: MongoDB with Mongoose ODM
- **RESTful API**: Complete API with proper HTTP methods
- **Modern UI**: Responsive design with gradient backgrounds and card layouts
- **Search & Filter**: Search projects by title or description
- **Sorting**: Sort by creation date, title (A-Z, Z-A)
- **Pagination**: Navigate through projects with page controls
- **Statistics Dashboard**: View total projects, recent projects, and averages
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Real-time Updates**: Automatic refresh after operations

### 🎯 Key Features

1. **Project Management**
   - Add new projects with title, image, link, and description
   - Edit existing projects
   - Delete projects with confirmation
   - View all projects in a grid layout

2. **Advanced Search & Filter**
   - Search projects by title or description
   - Sort by creation date (newest/oldest first)
   - Sort by title (A-Z, Z-A)
   - Clear search functionality

3. **Pagination**
   - Navigate through projects with Previous/Next buttons
   - Display current page and total pages
   - Configurable items per page

4. **Statistics Dashboard**
   - Total number of projects
   - Recent projects (last 7 days)
   - Average projects per week

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with gradients and animations

## Installation & Setup

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (running locally or cloud instance)

### Installation Steps

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd project-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   ```bash
   # On Windows (if installed as service)
   net start MongoDB
   
   # On macOS/Linux
   mongod
   
   # Or use MongoDB Atlas (cloud)
   ```

4. **Run the application**
   ```bash
   node server.js
   ```

5. **Access the application**
   - Frontend: http://localhost:3004
   - API: http://localhost:3004/api/projects

## API Documentation

### Base URL
```
http://localhost:3004/api
```

### Endpoints

#### 1. Get All Projects
```http
GET /api/projects
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for title/description
- `sortBy` (optional): Sort field (createdAt, title)
- `sortOrder` (optional): Sort order (asc, desc)

**Example:**
```http
GET /api/projects?page=1&limit=6&search=web&sortBy=createdAt&sortOrder=desc
```

#### 2. Get Project by ID
```http
GET /api/projects/:id
```

#### 3. Create New Project
```http
POST /api/projects
Content-Type: application/json

{
  "title": "Project Title",
  "image": "https://example.com/image.jpg",
  "link": "https://example.com/project",
  "description": "Project description"
}
```

#### 4. Update Project
```http
PUT /api/projects/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "image": "https://example.com/new-image.jpg",
  "link": "https://example.com/updated-project",
  "description": "Updated description"
}
```

#### 5. Delete Project
```http
DELETE /api/projects/:id
```

#### 6. Get Statistics
```http
GET /api/projects/stats/summary
```

## Database Schema

### Project Model
```javascript
{
  title: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  link: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## File Structure

```
project-management-system/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── package-lock.json      # Locked dependencies
├── README.md             # Project documentation
├── public/               # Static files
│   └── index.html        # Frontend application
└── node_modules/         # Installed dependencies
```

## Usage Examples

### Adding a New Project
1. Open the application in your browser
2. Fill in the form with project details:
   - **Title**: "My Web Application"
   - **Image URL**: "https://example.com/screenshot.jpg"
   - **Project Link**: "https://github.com/username/my-app"
   - **Description**: "A modern web application built with React"
3. Click "Add Project"

### Searching Projects
1. Use the search bar to find projects by title or description
2. Use the sort dropdown to change the order
3. Click "Clear" to reset search and filters

### Editing a Project
1. Click the "Edit" button on any project card
2. Modify the details in the form
3. Click "Update Project" to save changes

## Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Form validation for required fields and URL formats
- **Database Errors**: Proper error messages for database operations
- **Network Errors**: User-friendly messages for connection issues
- **Duplicate Titles**: Prevention of duplicate project titles

## Future Enhancements

- [ ] User authentication and authorization
- [ ] File upload for project images
- [ ] Project categories and tags
- [ ] Export projects to PDF/CSV
- [ ] Email notifications
- [ ] Project comments and ratings
- [ ] Advanced filtering options
- [ ] Dark mode theme
- [ ] Mobile app version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository or contact the development team.

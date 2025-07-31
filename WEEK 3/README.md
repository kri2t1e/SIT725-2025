# SIT 725 Week 3 Practical - Materialize CSS Demo

This is a demonstration application for SIT 725 Week 3 Practical that showcases the use of Materialize CSS components and interactive features.

## Features

- **Materialize CSS Integration**: Uses Materialize CSS framework for modern UI components
- **Interactive Elements**: Clickable button with animations and toast notifications
- **Responsive Design**: Works on desktop and mobile devices
- **Image Gallery**: Materialboxed images with hover effects
- **Smooth Animations**: CSS and JavaScript animations for enhanced user experience

## Project Structure

```
WEEK 3/
├── index.html          # Main HTML file
├── server.js           # Express.js server
├── package.json        # Node.js dependencies
├── css/
│   └── styles.css      # Custom CSS styles
├── js/
│   └── scripts.js      # JavaScript functionality
└── images/
    ├── user-image.png  # User profile image
    └── livedemo.png    # Demo image
```

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Development

For development with auto-reload:
```bash
npm run dev
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles and animations
- **JavaScript**: Interactive functionality
- **Materialize CSS**: UI framework
- **jQuery**: DOM manipulation
- **Express.js**: Web server
- **Node.js**: Runtime environment

## Features Explained

### Interactive Button
- Changes heading text when clicked
- Shows toast notifications
- Tracks click count
- Includes loading animation

### Image Gallery
- Materialboxed images for lightbox effect
- Hover animations
- Click interactions
- Error handling for missing images

### Responsive Design
- Mobile-friendly layout
- Adaptive image sizes
- Touch-friendly interactions

## Customization

### Adding New Images
1. Place images in the `images/` directory
2. Update the `src` attributes in `index.html`
3. Images will automatically get Materialize styling

### Modifying Styles
- Edit `css/styles.css` for visual changes
- Add new CSS classes for custom components
- Modify color scheme in the CSS variables

### Adding JavaScript Features
- Edit `js/scripts.js` for new functionality
- Use Materialize's JavaScript components
- Add event listeners for new interactions

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

MIT License - feel free to use this project for educational purposes.

## Author

SIT 725 Student - Week 3 Practical 
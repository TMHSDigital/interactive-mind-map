# Interactive Mind Map Generator

[![Deploy to GitHub Pages](https://github.com/TMHSDigital/interactive-mind-map/actions/workflows/deploy.yml/badge.svg)](https://github.com/TMHSDigital/interactive-mind-map/actions/workflows/deploy.yml)
[![GitHub license](https://img.shields.io/github/license/TMHSDigital/interactive-mind-map)](https://github.com/TMHSDigital/interactive-mind-map/blob/main/LICENSE)

A fully client-side interactive mind map generator that lets users create, modify, and visualize hierarchical or networked ideas. Built with D3.js and hosted on GitHub Pages.

🔗 [Try it now!](https://tmhsdigital.github.io/interactive-mind-map/)

## Documentation

- 📖 [User Guide](docs/user-guide.md) - Complete guide for using the mind map generator
- 🔧 [Technical Documentation](docs/technical.md) - Architecture and implementation details
- 📚 [API Documentation](docs/api.md) - Detailed API reference
- 🤝 [Contributing Guide](docs/contributing.md) - How to contribute to the project

## Features

- 🎯 Interactive Graph Visualization with force-directed layout
- ✏️ Node Management (add, edit, move, delete nodes)
- 🎨 Customization options for nodes (labels, colors)
- 💾 Local storage persistence
- 📤 Export options (PNG image and JSON data)
- 📱 Responsive design for desktop and mobile

## Quick Start

1. Visit the [live demo](https://tmhsdigital.github.io/interactive-mind-map/)
2. Click anywhere to add a root node
3. Select a node and use the toolbar to:
   - Add child nodes
   - Edit node properties
   - Delete nodes
4. Drag nodes to reposition them
5. Use mouse wheel or pinch gestures to zoom
6. Pan by dragging the background

## Development

This project uses:
- D3.js for visualization
- Vanilla JavaScript for core functionality
- HTML5 & CSS3 for layout and styling

To run locally:
1. Clone the repository
```bash
git clone https://github.com/TMHSDigital/interactive-mind-map.git
cd interactive-mind-map
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser to the URL shown in the terminal (typically http://localhost:3000)

## Contributing

We welcome contributions! Please see our [Contributing Guide](docs/contributing.md) for details.

## License

MIT License - feel free to use and modify for your own projects!
# Technical Documentation

## Architecture Overview

The Interactive Mind Map Generator is built with a modular architecture consisting of three main components:

### 1. Data Model (`model.js`)
- Manages the mind map data structure
- Handles CRUD operations for nodes and links
- Implements persistence using localStorage
- Uses the Observer pattern for state management

### 2. Visualization (`visualization.js`)
- Renders the mind map using D3.js force-directed graph
- Manages user interactions (drag, zoom, click)
- Handles visual updates and animations
- Implements export functionality

### 3. Application Logic (`app.js`)
- Coordinates between model and visualization
- Manages UI events and user interactions
- Handles modal dialogs and toolbar actions
- Initializes the application

## Data Structures

### Node Object
```javascript
{
  id: string,        // Unique identifier (e.g., "node-abc123")
  label: string,     // Display text
  color: string,     // CSS color (e.g., "#4CAF50")
  level: number      // Hierarchy level (0 for root)
}
```

### Link Object
```javascript
{
  source: string,    // Parent node ID
  target: string     // Child node ID
}
```

### Complete Mind Map Structure
```javascript
{
  nodes: Node[],     // Array of node objects
  links: Link[]      // Array of link objects
}
```

## Key Components

### MindMapModel Class
- **State Management**
  - Maintains nodes and links arrays
  - Manages subscriber notifications
  - Handles localStorage persistence

- **Node Operations**
  - `addNode(label, parentId?)`: Creates new node
  - `updateNode(id, updates)`: Modifies existing node
  - `deleteNode(id)`: Removes node and its children
  - `getNodeById(id)`: Retrieves node by ID
  - `getDescendantIds(nodeId)`: Gets all child node IDs

### MindMapVisualization Class
- **D3.js Integration**
  - Uses force simulation for layout
  - Manages SVG elements and updates
  - Handles zoom and pan behaviors

- **Event Handling**
  - Node click/double-click events
  - Drag operations
  - Zoom controls

- **Export Functions**
  - PNG export using canvas
  - SVG manipulation for visual output

### MindMapApp Class
- **Initialization**
  - Sets up visualization
  - Binds event listeners
  - Connects model and view

- **UI Management**
  - Modal dialogs
  - Toolbar state
  - User interactions

## Implementation Details

### Force Layout Configuration
```javascript
d3.forceSimulation()
  .force('link', d3.forceLink().distance(100))
  .force('charge', d3.forceManyBody().strength(-300))
  .force('collision', d3.forceCollide().radius(50))
```

### Local Storage Format
```javascript
{
  'mindmap-data': JSON.stringify({
    nodes: [...],
    links: [...]
  })
}
```

### Export Process
1. **PNG Export**
   - Clone SVG element
   - Add white background
   - Convert to canvas
   - Generate blob and download

2. **JSON Export**
   - Stringify current model state
   - Generate blob and download

## Event Flow

1. **Adding a Node**
   ```
   User Action → App Event Handler → Model Update → 
   Model Notification → Visualization Update → Force Simulation
   ```

2. **Dragging a Node**
   ```
   Mouse Event → D3 Drag Handler → Force Simulation Update → 
   Visual Update → Position Storage
   ```

## Performance Considerations

1. **Force Simulation**
   - Adjust force strengths based on node count
   - Limit maximum number of nodes for smooth performance
   - Cool down simulation after major changes

2. **DOM Updates**
   - Use D3's enter/update/exit pattern
   - Batch updates where possible
   - Limit unnecessary force simulation restarts

3. **Storage**
   - Implement debouncing for localStorage updates
   - Monitor storage quota usage
   - Implement cleanup for old/unused data

## Browser Support

- **Required Features**
  - ES6+ JavaScript
  - localStorage API
  - SVG support
  - Canvas API
  - Modern CSS features

- **Tested Browsers**
  - Chrome 80+
  - Firefox 75+
  - Safari 13+
  - Edge 80+

## Future Improvements

1. **Planned Features**
   - Keyboard shortcuts
   - Undo/redo functionality
   - JSON import
   - Node search
   - Different node shapes

2. **Technical Debt**
   - Add TypeScript support
   - Implement proper error boundaries
   - Add unit tests
   - Improve performance for large maps

3. **Optimization Opportunities**
   - WebGL rendering for large maps
   - Worker thread for force calculations
   - Compressed storage format
   - Lazy loading for large maps 
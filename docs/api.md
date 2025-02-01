# API Documentation

## Data Model API

### MindMapModel

The core class that manages the mind map data structure and operations.

#### Properties

| Name | Type | Description |
|------|------|-------------|
| `data` | `{ nodes: Node[], links: Link[] }` | The complete mind map data structure |
| `listeners` | `Set<Function>` | Set of callback functions for state changes |

#### Methods

##### `subscribe(callback: (data: MindMapData) => void): () => void`
Subscribe to data changes with a callback function.
- **Parameters:**
  - `callback`: Function to call when data changes
- **Returns:** Unsubscribe function
- **Example:**
```javascript
const unsubscribe = model.subscribe(data => {
  console.log('Mind map updated:', data);
});
```

##### `addNode(label: string, parentId?: string): string`
Add a new node to the mind map.
- **Parameters:**
  - `label`: Text content for the node
  - `parentId`: (Optional) ID of parent node
- **Returns:** ID of the new node
- **Example:**
```javascript
const nodeId = model.addNode('My Node');
const childId = model.addNode('Child Node', nodeId);
```

##### `updateNode(id: string, updates: Partial<Node>): boolean`
Update an existing node's properties.
- **Parameters:**
  - `id`: Node identifier
  - `updates`: Object with properties to update
- **Returns:** Success status
- **Example:**
```javascript
model.updateNode('node-123', {
  label: 'Updated Label',
  color: '#FF0000'
});
```

##### `deleteNode(id: string): void`
Delete a node and all its descendants.
- **Parameters:**
  - `id`: Node identifier
- **Example:**
```javascript
model.deleteNode('node-123');
```

##### `getNodeById(id: string): Node | undefined`
Retrieve a node by its ID.
- **Parameters:**
  - `id`: Node identifier
- **Returns:** Node object if found
- **Example:**
```javascript
const node = model.getNodeById('node-123');
```

##### `exportJson(): string`
Export the mind map as a JSON string.
- **Returns:** JSON string
- **Example:**
```javascript
const json = model.exportJson();
```

##### `importJson(jsonString: string): boolean`
Import a mind map from JSON.
- **Parameters:**
  - `jsonString`: Valid mind map JSON
- **Returns:** Success status
- **Example:**
```javascript
model.importJson('{"nodes":[],"links":[]}');
```

## Visualization API

### MindMapVisualization

Class that handles the D3.js visualization and user interactions.

#### Constructor

##### `constructor(container: HTMLElement, onNodeClick: Function, onNodeDblClick: Function)`
Create a new visualization instance.
- **Parameters:**
  - `container`: DOM element to render in
  - `onNodeClick`: Click handler function
  - `onNodeDblClick`: Double-click handler function
- **Example:**
```javascript
const viz = new MindMapVisualization(
  document.getElementById('mindmap'),
  node => console.log('Clicked:', node),
  node => console.log('Double-clicked:', node)
);
```

#### Methods

##### `update(data: MindMapData): void`
Update the visualization with new data.
- **Parameters:**
  - `data`: Complete mind map data
- **Example:**
```javascript
viz.update({
  nodes: [...],
  links: [...]
});
```

##### `selectNode(nodeId: string): void`
Select a specific node.
- **Parameters:**
  - `nodeId`: Node identifier
- **Example:**
```javascript
viz.selectNode('node-123');
```

##### `deselectNode(): void`
Clear node selection.
- **Example:**
```javascript
viz.deselectNode();
```

##### `zoomIn(): void`
Zoom in on the visualization.
- **Example:**
```javascript
viz.zoomIn();
```

##### `zoomOut(): void`
Zoom out of the visualization.
- **Example:**
```javascript
viz.zoomOut();
```

##### `resetZoom(): void`
Reset zoom to default level.
- **Example:**
```javascript
viz.resetZoom();
```

##### `async exportPng(): Promise<Blob>`
Export the visualization as a PNG image.
- **Returns:** Promise resolving to PNG blob
- **Example:**
```javascript
const blob = await viz.exportPng();
```

## Types

### Node
```typescript
interface Node {
  id: string;        // Unique identifier
  label: string;     // Display text
  color: string;     // CSS color value
  level: number;     // Hierarchy level
}
```

### Link
```typescript
interface Link {
  source: string;    // Parent node ID
  target: string;    // Child node ID
}
```

### MindMapData
```typescript
interface MindMapData {
  nodes: Node[];
  links: Link[];
}
```

## Events

### Node Events
- `click`: Fired when a node is clicked
- `dblclick`: Fired when a node is double-clicked
- `dragstart`: Fired when node dragging begins
- `dragend`: Fired when node dragging ends

### Visualization Events
- `zoom`: Fired during zoom operations
- `pan`: Fired during pan operations

## Error Handling

The API uses a combination of return values and error logging:
- Most methods return boolean success status
- Errors are logged to console
- Invalid operations fail silently with appropriate return values
- localStorage operations catch and log errors

## Usage Examples

### Creating a Simple Mind Map
```javascript
// Initialize
const model = new MindMapModel();
const viz = new MindMapVisualization(container, onNodeClick, onNodeDblClick);

// Create root node
const rootId = model.addNode('Root');

// Add children
const child1 = model.addNode('Child 1', rootId);
const child2 = model.addNode('Child 2', rootId);

// Update a node
model.updateNode(child1, {
  color: '#FF0000',
  label: 'Updated Child'
});

// Export
const json = model.exportJson();
const png = await viz.exportPng();
```

### Managing State Changes
```javascript
// Subscribe to changes
model.subscribe(data => {
  // Update visualization
  viz.update(data);
  
  // Save to localStorage
  localStorage.setItem('backup', JSON.stringify(data));
});
``` 
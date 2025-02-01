// Unique ID generator
const generateId = () => `node-${Math.random().toString(36).substr(2, 9)}`;

// Default node color
const DEFAULT_NODE_COLOR = '#4CAF50';

class MindMapModel {
    constructor() {
        this.data = {
            nodes: [],
            links: []
        };
        this.listeners = new Set();
        this.loadFromLocalStorage();
    }

    // Subscribe to data changes
    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    // Notify all listeners of data changes
    notify() {
        this.listeners.forEach(callback => callback(this.data));
        this.saveToLocalStorage();
    }

    // Add a new node
    addNode(label, parentId = null) {
        const node = {
            id: generateId(),
            label,
            color: DEFAULT_NODE_COLOR,
            level: parentId ? this.getNodeById(parentId).level + 1 : 0
        };

        this.data.nodes.push(node);
        
        if (parentId) {
            this.data.links.push({
                source: parentId,
                target: node.id
            });
        }

        this.notify();
        return node.id;
    }

    // Update an existing node
    updateNode(id, updates) {
        const node = this.getNodeById(id);
        if (!node) return false;

        Object.assign(node, updates);
        this.notify();
        return true;
    }

    // Delete a node and its children
    deleteNode(id) {
        const nodesToDelete = new Set(this.getDescendantIds(id));
        nodesToDelete.add(id);

        this.data.nodes = this.data.nodes.filter(node => !nodesToDelete.has(node.id));
        this.data.links = this.data.links.filter(link => 
            !nodesToDelete.has(link.source.id) && !nodesToDelete.has(link.target.id)
        );

        this.notify();
    }

    // Get a node by its ID
    getNodeById(id) {
        return this.data.nodes.find(node => node.id === id);
    }

    // Get all descendant IDs of a node
    getDescendantIds(nodeId) {
        const descendants = new Set();
        const stack = [nodeId];

        while (stack.length > 0) {
            const currentId = stack.pop();
            const children = this.data.links
                .filter(link => link.source.id === currentId)
                .map(link => link.target.id);

            children.forEach(childId => {
                descendants.add(childId);
                stack.push(childId);
            });
        }

        return Array.from(descendants);
    }

    // Save to localStorage
    saveToLocalStorage() {
        try {
            const serializedData = JSON.stringify(this.data);
            localStorage.setItem('mindmap-data', serializedData);
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }

    // Load from localStorage
    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('mindmap-data');
            if (savedData) {
                this.data = JSON.parse(savedData);
                this.notify();
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
        }
    }

    // Clear all data
    clear() {
        this.data = {
            nodes: [],
            links: []
        };
        this.notify();
    }

    // Export data as JSON
    exportJson() {
        return JSON.stringify(this.data, null, 2);
    }

    // Import data from JSON
    importJson(jsonString) {
        try {
            const newData = JSON.parse(jsonString);
            if (newData.nodes && newData.links) {
                this.data = newData;
                this.notify();
                return true;
            }
        } catch (error) {
            console.error('Failed to import JSON:', error);
        }
        return false;
    }
}

export default new MindMapModel(); 
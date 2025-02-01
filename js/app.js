import model from './model.js';
import MindMapVisualization from './visualization.js';

class MindMapApp {
    constructor() {
        this.initializeVisualization();
        this.initializeEventListeners();
        this.bindModelUpdates();

        // Initial load of data
        const data = model.data;
        if (data.nodes.length > 0) {
            this.visualization.update(data);
            this.visualization.refreshView();
        }
    }

    initializeVisualization() {
        const container = document.getElementById('mindmap-container');
        this.visualization = new MindMapVisualization(
            container,
            this.handleNodeClick.bind(this),
            this.handleNodeDblClick.bind(this)
        );

        // Set up simulation tick handler
        this.visualization.simulation.on('tick', () => {
            this.visualization.tick();
        });
    }

    initializeEventListeners() {
        // Toolbar buttons
        document.getElementById('add-node').addEventListener('click', () => {
            if (this.visualization.selectedNode) {
                this.showNodeModal('Add Node', '', (label, color) => {
                    model.addNode(label, this.visualization.selectedNode);
                });
            } else {
                this.showNodeModal('Add Root Node', '', (label, color) => {
                    model.addNode(label);
                });
            }
        });

        document.getElementById('edit-node').addEventListener('click', () => {
            if (this.visualization.selectedNode) {
                const node = model.getNodeById(this.visualization.selectedNode);
                this.showNodeModal('Edit Node', node.label, (label, color) => {
                    model.updateNode(node.id, { label, color });
                });
            }
        });

        document.getElementById('delete-node').addEventListener('click', () => {
            if (this.visualization.selectedNode) {
                if (confirm('Are you sure you want to delete this node and its children?')) {
                    model.deleteNode(this.visualization.selectedNode);
                    this.visualization.deselectNode();
                    this.updateToolbarState();
                }
            }
        });

        // Export buttons
        document.getElementById('export-png').addEventListener('click', async () => {
            const blob = await this.visualization.exportPng();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mindmap.png';
            a.click();
            URL.revokeObjectURL(url);
        });

        document.getElementById('export-json').addEventListener('click', () => {
            const json = model.exportJson();
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mindmap.json';
            a.click();
            URL.revokeObjectURL(url);
        });

        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => {
            this.visualization.zoomIn();
        });

        document.getElementById('zoom-out').addEventListener('click', () => {
            this.visualization.zoomOut();
        });

        document.getElementById('reset-view').addEventListener('click', () => {
            this.visualization.resetZoom();
        });

        // New refresh button
        document.getElementById('refresh-view').addEventListener('click', () => {
            this.visualization.refreshView();
        });

        // Modal events
        document.getElementById('node-modal').addEventListener('click', (e) => {
            if (e.target.id === 'node-modal') {
                this.hideNodeModal();
            }
        });

        document.getElementById('cancel-edit').addEventListener('click', () => {
            this.hideNodeModal();
        });

        document.getElementById('node-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const label = document.getElementById('node-text').value;
            const color = document.getElementById('node-color').value;
            this.currentModalCallback(label, color);
            this.hideNodeModal();
        });
    }

    bindModelUpdates() {
        // Subscribe to model changes
        model.subscribe((data) => {
            this.visualization.update(data);
        });
    }

    handleNodeClick(node) {
        this.updateToolbarState();
    }

    handleNodeDblClick(node) {
        this.showNodeModal('Edit Node', node.label, (label, color) => {
            model.updateNode(node.id, { label, color });
        });
    }

    updateToolbarState() {
        const hasSelection = this.visualization.selectedNode !== null;
        document.getElementById('edit-node').disabled = !hasSelection;
        document.getElementById('delete-node').disabled = !hasSelection;
    }

    showNodeModal(title, initialText = '', callback) {
        const modal = document.getElementById('node-modal');
        const titleElement = modal.querySelector('h2');
        const textInput = document.getElementById('node-text');
        
        titleElement.textContent = title;
        textInput.value = initialText;
        this.currentModalCallback = callback;
        
        modal.classList.add('active');
        textInput.focus();
    }

    hideNodeModal() {
        const modal = document.getElementById('node-modal');
        modal.classList.remove('active');
        this.currentModalCallback = null;
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MindMapApp();
}); 
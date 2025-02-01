import * as d3 from 'https://cdn.skypack.dev/d3@7';

class MindMapVisualization {
    constructor(container, onNodeClick, onNodeDblClick) {
        this.container = container;
        this.onNodeClick = onNodeClick;
        this.onNodeDblClick = onNodeDblClick;
        this.width = container.clientWidth;
        this.height = container.clientHeight;
        this.selectedNode = null;

        this.initializeSvg();
        this.initializeForces();
        this.initializeZoom();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.width = container.clientWidth;
            this.height = container.clientHeight;
            this.svg
                .attr('width', this.width)
                .attr('height', this.height);
        });
    }

    initializeSvg() {
        // Create SVG container
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Add zoom container
        this.g = this.svg.append('g');

        // Add arrow marker definition
        this.svg.append('defs').append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 20)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('xoverflow', 'visible')
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#ccc')
            .style('stroke', 'none');

        // Add gradient definitions
        const defs = this.svg.select('defs');
        
        // Node gradient
        const nodeGradient = defs.append('radialGradient')
            .attr('id', 'nodeGradient')
            .attr('cx', '30%')
            .attr('cy', '30%');

        nodeGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'white');

        nodeGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#f8f9fa');

        // Selected node gradient
        const selectedGradient = defs.append('radialGradient')
            .attr('id', 'selectedGradient')
            .attr('cx', '30%')
            .attr('cy', '30%');

        selectedGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'white');

        selectedGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#e3f2fd');
    }

    initializeForces() {
        // Initialize force simulation
        this.simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id).distance(120))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('x', d3.forceX(this.width / 2).strength(0.1))
            .force('y', d3.forceY(this.height / 2).strength(0.1))
            .force('collision', d3.forceCollide().radius(60));
    }

    initializeZoom() {
        // Add zoom behavior
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                this.g.attr('transform', event.transform);
            });

        this.svg.call(this.zoom);
        
        // Center the initial view
        const initialTransform = d3.zoomIdentity
            .translate(this.width / 2, this.height / 2)
            .scale(1);
        this.svg.call(this.zoom.transform, initialTransform);
    }

    update(data) {
        // Create links
        this.links = this.g.selectAll('.link')
            .data(data.links, d => `${d.source.id}-${d.target.id}`);

        this.links.exit().remove();

        const linksEnter = this.links.enter()
            .append('line')
            .attr('class', 'link')
            .attr('marker-end', 'url(#arrowhead)');

        this.links = linksEnter.merge(this.links);

        // Create nodes
        this.nodes = this.g.selectAll('.node')
            .data(data.nodes, d => d.id);

        this.nodes.exit().remove();

        const nodesEnter = this.nodes.enter()
            .append('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', this.dragstarted.bind(this))
                .on('drag', this.dragged.bind(this))
                .on('end', this.dragended.bind(this)));

        // Add circle to each node
        nodesEnter.append('circle')
            .attr('r', 30)
            .attr('fill', 'url(#nodeGradient)')
            .attr('stroke', d => d.color || '#2196F3')
            .attr('stroke-width', 2);

        // Add text to each node
        nodesEnter.append('text')
            .attr('class', 'node-label')
            .attr('dy', '.35em')
            .text(d => d.label);

        this.nodes = nodesEnter.merge(this.nodes);

        // Update node colors and labels
        this.nodes.select('circle')
            .attr('fill', d => d.selected ? 'url(#selectedGradient)' : 'url(#nodeGradient)')
            .attr('stroke', d => d.color || '#2196F3');
        
        this.nodes.select('text')
            .text(d => d.label);

        // Add click handlers
        this.nodes
            .on('click', (event, d) => this.handleNodeClick(event, d))
            .on('dblclick', (event, d) => this.handleNodeDblClick(event, d));

        // Update simulation
        this.simulation
            .nodes(data.nodes)
            .force('link').links(data.links);

        this.simulation.alpha(1).restart();
    }

    handleNodeClick(event, d) {
        if (this.selectedNode === d.id) {
            this.deselectNode();
        } else {
            this.selectNode(d.id);
        }
        this.onNodeClick(d);
    }

    handleNodeDblClick(event, d) {
        this.onNodeDblClick(d);
    }

    selectNode(nodeId) {
        this.selectedNode = nodeId;
        this.nodes.select('circle')
            .attr('fill', d => d.id === nodeId ? 'url(#selectedGradient)' : 'url(#nodeGradient)')
            .attr('stroke', d => d.id === nodeId ? '#1976D2' : (d.color || '#2196F3'))
            .attr('stroke-width', d => d.id === nodeId ? 3 : 2);
    }

    deselectNode() {
        this.selectedNode = null;
        this.nodes.select('circle')
            .attr('fill', 'url(#nodeGradient)')
            .attr('stroke', d => d.color || '#2196F3')
            .attr('stroke-width', 2);
    }

    dragstarted(event) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    dragended(event) {
        if (!event.active) this.simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    // Update force simulation on each tick
    tick() {
        this.links
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        this.nodes.attr('transform', d => `translate(${d.x},${d.y})`);
    }

    // Zoom controls
    zoomIn() {
        this.svg.transition().duration(300).call(
            this.zoom.scaleBy, 1.5
        );
    }

    zoomOut() {
        this.svg.transition().duration(300).call(
            this.zoom.scaleBy, 0.75
        );
    }

    resetZoom() {
        this.svg.transition().duration(300).call(
            this.zoom.transform,
            d3.zoomIdentity.translate(this.width / 2, this.height / 2).scale(1)
        );
    }

    // Export the current view as PNG
    async exportPng() {
        // Create a copy of the SVG
        const svgCopy = this.svg.clone(true).node();
        
        // Set white background
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', 'white');
        svgCopy.insertBefore(rect, svgCopy.firstChild);

        // Convert SVG to blob
        const svgData = new XMLSerializer().serializeToString(svgCopy);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        // Create image from SVG
        const img = new Image();
        img.src = url;
        
        return new Promise((resolve) => {
            img.onload = () => {
                // Create canvas and draw image
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                // Convert to blob and cleanup
                canvas.toBlob((blob) => {
                    URL.revokeObjectURL(url);
                    resolve(blob);
                });
            };
        });
    }
}

export default MindMapVisualization; 
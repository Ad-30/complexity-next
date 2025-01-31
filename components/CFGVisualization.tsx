"use client";

import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre"; // Import the dagre layout

cytoscape.use(dagre); // Register the dagre layout

interface TreeNode {
  node_type: string;
  cognitive_weight: number;
  children?: TreeNode[];
}

const TreeCanvas: React.FC = () => {
  const cyRef = useRef<HTMLDivElement>(null);

  // Function to convert raw tree data into Cytoscape elements
  const convertToCytoscapeElements = (tree: TreeNode, depth: number = 0, parentId: string | null = null): any[] => {
    const nodeId = `${tree.node_type}-${Math.random()}`; // Unique ID for each node
    const nodeColor = ["#00FF00", "#FF00FF", "#FFFF00", "#FF6600", "#00FFFF"][depth % 5]; // Color based on depth

    const node = {
      data: {
        id: nodeId,
        label: `${tree.node_type}\nWeight: ${tree.cognitive_weight}`,
        color: nodeColor,
      },
    };

    const elements = [node];

    if (parentId) {
      elements.push({
        data: {
          source: parentId,
          target: nodeId,
        },
      });
    }

    tree.children?.forEach(child => {
      elements.push(...convertToCytoscapeElements(child, depth + 1, nodeId));
    });

    return elements;
  };

  useEffect(() => {
    // Retrieve the value from the cookie
    const result = Cookies.get("analysisResult");

    // Check if the cookie exists and parse the tree data
    if (result) {
      const analysisResult = JSON.parse(result);
      const elements = convertToCytoscapeElements(analysisResult.tree); // Call the function here

      // Initialize Cytoscape
      const cy = cytoscape({
        container: cyRef.current!,
        elements: elements,
        style: [
          {
            selector: 'node',
            style: {
              'shape': 'rectangle', // Set the shape to rectangle
              'width': 120, // Increase the width of the rectangle
              'height': 'labelMultiLine', // Make the height proportional to the label
              'background-color': 'rgba(0, 0, 0, 0)', // Transparent background
              'label': 'data(label)', // Node name
              'font-size': 8, // Reduced font size
              'color': 'white', // Text color
              'text-valign': 'center',
              'text-halign': 'center',
              'border-width': 1, // Border width
              'border-color': 'data(color)',
              'text-wrap': 'wrap', // Enable text wrapping
              'text-max-width': '100px',
              // 'text-valign': 'center', // Center text vertically
              // 'text-halign': 'center',
            },
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#ccc',

            },
          },
        ],
        layout: {
          name: 'dagre',
        },
      });

      // Define a function to format the node label
      cy.nodes().forEach(node => {
        const nodeType = node.data('label').split('\n')[0]; // Extract the node type
        const nodeWeight = node.data('label').split('\n')[1]; // Extract the node weight

        // Set the label based on the node type
        const formattedLabel = nodeType === 'FunctionDef' ? 'FD' : nodeType; // Show "fd" if node type is "function"
        node.data('label', formattedLabel + " \n(" + nodeWeight + ")"); // Update the node label

        // Create a tooltip to show the node weight on hover

      });
      cy.on('tap', 'node', function (evt) {
        const node = evt.target;
        console.log('tapped ' + node.id());
      });
      cy.nodes().ungrabify()

      // Optional: Fit the viewport to the elements
      cy.fit();
    }
  }, []);

  return <div style={{ width: '100%', height: '80vh' }} ref={cyRef}></div>;
};

export default TreeCanvas;
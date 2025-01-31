"use client";

import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre"; // Import the dagre layout

cytoscape.use(dagre); // Register the dagre layout

interface TreeNode {
    node_type: string;
    cognitive_weight: number;
    node_feature: number[]; // Added node_feature to the interface
    children?: TreeNode[];
}

const TreeCanvas: React.FC = () => {
    const cyRef = useRef<HTMLDivElement>(null);

    // Function to convert raw tree data into Cytoscape elements
    const convertToCytoscapeElements = (tree: TreeNode, depth: number = 0, parentId: string | null = null): any[] => {
        const nodeId = `${tree.node_type}-${Math.random()}`; // Unique ID for each node
        const nodeColor = ["#00FF00", "#FF00FF", "#FFFF00", "#FF6600", "#00FFFF"][depth % 5]; // Color based on depth

        // Convert node_feature array to a string for display
        const nodeFeatures = tree.node_feature.join(", "); // Join features with a comma
        const nodeLabel = `${tree.node_type}\n[${nodeFeatures}]`; // Updated label

        const node = {
            data: {
                id: nodeId,
                label: nodeLabel,
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
        const result = Cookies.get("nodeFeatureResult"); // Updated to get the correct cookie

        // Check if the cookie exists and parse the tree data
        if (result) {
            const nodeFeatureResult = JSON.parse(result);
            const elements = convertToCytoscapeElements(nodeFeatureResult.node_feature_dict); // Call the function here

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

            // Optional: Fit the viewport to the elements
            cy.fit();
        }
    }, []);

    return <div style={{ width: '100%', height: '80vh' }} ref={cyRef}></div>;
};

export default TreeCanvas;
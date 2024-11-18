import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button, Box } from '@mui/material';
import ColdEmailNode from './ColdEmailNode';
import WaitDelayNode from './WaitDelayNode';
import LeadSourceNode from './LeadSourceNode';

const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode,
};

const initialNodes = [
  {
    id: 'lead-source-1',
    type: 'leadSource',
    data: { label: 'Lead Source' },
    position: { x: 250, y: 5 },
  },
];

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = (type) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      data: { label: `New ${type}` },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges((eds) => eds.filter((edge) => !deleted.some((node) => node.id === edge.source || node.id === edge.target)));
    },
    [setEdges]
  );

  const saveFlowChart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/save-flowchart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      console.log('Flowchart saved:', data);
    } catch (error) {
      console.error('Error saving flowchart:', error);
    }
  };

  return (
    <Box sx={{ height: '80vh' }}>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => addNode('coldEmail')} sx={{ mr: 1 }}>
          Add Cold Email
        </Button>
        <Button variant="contained" onClick={() => addNode('waitDelay')} sx={{ mr: 1 }}>
          Add Wait/Delay
        </Button>
        <Button variant="contained" onClick={() => addNode('leadSource')} sx={{ mr: 1 }}>
          Add Lead Source
        </Button>
        <Button variant="contained" color="secondary" onClick={saveFlowChart}>
          Save Flowchart
        </Button>
      </Box>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </Box>
  );
};

export default FlowChart;
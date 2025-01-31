import React from 'react';
import TreeCanvas from './CFGVisualization';

const CFG: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl mb-4">Control Flow Graph</h2>
      <TreeCanvas />
    </div>
  );
};

export default CFG;


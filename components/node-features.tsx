import React from 'react';
import Layout from '../components/Layout';

const NodeFeatures: React.FC = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <h2 className="text-2xl mb-4">Node Features</h2>
        <div className="grid grid-cols-3 gap-4">
          {['Feature 1', 'Feature 2', 'Feature 3'].map((feature, index) => (
            <div key={index} className="bg-secondary p-4 rounded">
              <h3 className="text-lg mb-2">{feature}</h3>
              <p>Feature description goes here</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NodeFeatures;


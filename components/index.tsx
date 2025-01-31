import React from 'react';
import Layout from '../components/Layout';

const CodeInput: React.FC = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <h2 className="text-2xl mb-4">Input Python Code</h2>
        <textarea
          className="w-full h-64 p-4 bg-secondary text-foreground border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
          placeholder="Enter your Python code here..."
        />
        <button className="mt-4 px-6 py-2 bg-primary text-background rounded hover:bg-accent transition-colors duration-200">
          Analyze
        </button>
      </div>
    </Layout>
  );
};

export default CodeInput;


"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const FixedSizeVector: React.FC = () => {
  const [fixedSizeVector, setFixedSizeVector] = useState<number[][] | null>(null);

  useEffect(() => {
    const result = Cookies.get('fixedSizeVector');
    if (result) {
      try {
        setFixedSizeVector(JSON.parse(result)); 
      } catch (error) {
        console.error("Error parsing fixedSizeVector:", error);
      }
    }
  }, []);

  return (
    <div className="animate-fade-in p-4  shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Fixed-Size Vector Representation</h2>
      {fixedSizeVector ? (
        <pre className="p-3 rounded-md text-sm">{JSON.stringify(fixedSizeVector, null, 2)}</pre>
      ) : (
        <p className="text-white">No vector data available.</p>
      )}
    </div>
  );
};

export default FixedSizeVector;

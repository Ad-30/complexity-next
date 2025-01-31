"use client";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const DefectDetection: React.FC = () => {
  const [isDefected, setIsDefected] = useState<boolean | null>(null);

  useEffect(() => {
    const result = Cookies.get('prediction');

    if (result) {
      try {
        const parsedResult = JSON.parse(result); // Ensure parsing doesn't fail
        setIsDefected(parsedResult !== 0); // Set state based on value
      } catch (error) {
        console.error("Error parsing prediction:", error);
      }
    }
  }, []);

  return (
    <div className="animate-fade-in p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Defect Detection</h2>
      <div
        className={`p-4 rounded ${
          isDefected ? 'bg-red-100 border border-red-400' : 'bg-green-100 border border-green-400'
        }`}
      >
        <h3 className={`text-lg font-semibold ${isDefected ? 'text-red-700' : 'text-green-700'}`}>
          {isDefected ? 'Defect Detected' : 'No Defects Found'}
        </h3>
        <p className="text-gray-700">
          {isDefected
            ? 'Potential defects have been found. Please review the necessary areas.'
            : 'No defects detected. Everything looks good!'}
        </p>
      </div>
    </div>
  );
};

export default DefectDetection;

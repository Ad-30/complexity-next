"use client"
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const CognitiveComplexity: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    // Retrieve the value from the cookie
    const result = Cookies.get('analysisResult');

    // Check if the cookie exists and update state
    if (result) {
      setAnalysisResult(JSON.parse(result));
    }
  }, []);
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl mb-4">Cognitive Complexity Analysis</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-primary p-2">Function</th>
            <th className="border border-primary p-2">Complexity</th>
          </tr>
        </thead>
        <tbody>
          {/* Render content only if analysisResult is not null */}
          {analysisResult ? (
            <tr>
              <td className="border border-primary p-2">main()</td>
              <td className="border border-primary p-2 text-accent">{analysisResult.cognitive_complexity}</td>
            </tr>
          ) : (
            <tr>
              <td className="border border-primary p-2" colSpan={2}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CognitiveComplexity;


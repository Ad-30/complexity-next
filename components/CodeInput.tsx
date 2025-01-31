"use client";

import React, { useState } from 'react';
import { useAnimationStore } from '@/store/animationStore';
import axios from 'axios';
import Cookies from 'js-cookie';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import { useToast } from "@/hooks/use-toast"

const CodeInput: React.FC = () => {
  const { toast } = useToast()
  const [code, setCode] = useState('');
  const { isAnalyzing, setIsAnalyzing, setAnalysisCompleted } = useAnimationStore();

  const handleCodeChange = (newCode: string) => {
    if (newCode.split('\n').length <= 50) {
      setCode(newCode);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.py')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const lines = content.split('\n').slice(0, 50);
          setCode(lines.join('\n'));
        };
        reader.readAsText(file);
      } else {
        alert('Please upload a valid Python (.py) file.');
      }
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    const data = JSON.stringify({ code });
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/cognitive',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    axios.defaults.timeout = 120000;
    axios
      .request(config)
      .then((response) => {
        Cookies.set('analysisResult', JSON.stringify(response.data), { expires: 1 });
        const treeData = JSON.stringify({ tree_dict: response.data.tree });
        return axios.post('http://127.0.0.1:8000/node-features', treeData, {
          headers: { 'Content-Type': 'application/json' },
          maxBodyLength: Infinity,
        });
      })
      .then((response) => {
        Cookies.set('nodeFeatureResult', JSON.stringify(response.data), { expires: 1 });
        const treeData = JSON.stringify({ node_feature_dict: response.data.node_feature_dict });
        return axios.post('http://127.0.0.1:8000/fixed-size-vector', treeData, {
          headers: { 'Content-Type': 'application/json' },
          maxBodyLength: Infinity,
        });
      })
      .then((response)=>{
        Cookies.set('fixedSizeVector', JSON.stringify(response.data.fixed_size_vector), { expires: 1 });
        Cookies.set('prediction', JSON.stringify(response.data.prediction), { expires: 1 });
        toast({
          title: "Successfull",
          description: "All insights are available and can be seen at different links on left sidebar",
        })
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Indentation Error",
          description: "There was a problem with your code",
        })

        // console.error(error);
      })
      .finally(() => {
        setIsAnalyzing(false);
        setAnalysisCompleted(true);
      });
  };

  const handleClear = () => {
    setCode('');
    setAnalysisCompleted(false);
  };

  const glowStyle = { boxShadow: '0 0 10px var(--primary)' };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl mb-4">Input Python Code</h2>
      <AceEditor
        mode="python"
        theme="monokai"
        value={code}
        onChange={handleCodeChange}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        className="bg-secondary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-shadow duration-200"
        fontSize={20}
        height="40vh"
        width="60vw"
        focus
      />
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label
          className={`cursor-pointer bg-primary text-background px-4 py-2 rounded hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''
            }`}
          style={glowStyle}
        >
          Upload Python File
          <input type="file" accept=".py" className="hidden" onChange={handleFileUpload} disabled={isAnalyzing} />
        </label>
        <button
          className={`px-6 py-2 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg ${isAnalyzing ? 'bg-accent text-background animate-pulse' : 'bg-primary text-background hover:bg-accent'
            }`}
          onClick={handleAnalyze}
          disabled={isAnalyzing || code.trim() === ''}
          style={glowStyle}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </button>
        <button
          className={`px-6 py-2 bg-secondary text-foreground rounded hover:bg-accent hover:text-background transition-all duration-300 hover:scale-105 hover:shadow-lg ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''
            }`}
          onClick={handleClear}
          disabled={isAnalyzing}
          style={glowStyle}
        >
          Clear
        </button>
      </div>
      {isAnalyzing && (
        <div className="mt-4 w-full bg-secondary rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full animate-[progressBar_5s_ease-in-out]"></div>
        </div>
      )}
    </div>
  );
};

export default CodeInput;

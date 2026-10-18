import React, { useState } from 'react';
import { analyzeExcuse } from '../utils';
import type { ExcuseAnalysis } from '../types';

export const ExcuseInterrogation: React.FC = () => {
  const [excuse, setExcuse] = useState('');
  const [analysis, setAnalysis] = useState<ExcuseAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excuse.trim()) return;

    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result = analyzeExcuse(excuse);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 500);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-cyber-red';
    if (confidence >= 60) return 'text-cyber-amber';
    return 'text-cyber-green';
  };

  return (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-bold text-cyber-cyan mb-2">
        SUBMIT YOUR EXCUSE FOR ANALYSIS
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        The system will evaluate your procrastination justification using advanced (but totally fake) algorithms.
      </p>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            placeholder="e.g., 'I'm just checking Instagram for two minutes.'"
            className="flex-1 bg-cyber-dark border border-gray-600 rounded px-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyber-cyan font-mono text-sm"
          />
          <button
            type="submit"
            disabled={!excuse.trim() || isAnalyzing}
            className="px-6 py-3 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan/30 transition-colors font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'ANALYZING...' : 'ANALYZE'}
          </button>
        </div>
      </form>

      {analysis && (
        <div className="bg-cyber-dark border border-cyber-cyan/50 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 font-mono mb-1">CLASSIFICATION</div>
              <div className="text-lg font-bold text-cyber-amber">{analysis.classification}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-mono mb-1">THREAT LEVEL</div>
              <div className="text-lg font-bold text-cyber-red">{analysis.threatLevel}</div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 font-mono mb-1">CONFIDENCE SCORE</div>
            <div className={`text-2xl font-bold ${getConfidenceColor(analysis.confidence)}`}>
              {analysis.confidence}%
            </div>
            <div className="text-xs text-gray-600 mt-1">
              *Heuristic estimate, not scientifically validated
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-xs text-gray-500 font-mono mb-2">SYSTEM VERDICT</div>
            <div className="text-lg text-gray-200 italic">"{analysis.verdict}"</div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-xs text-gray-500 font-mono mb-1">RECOMMENDED ACTION</div>
            <div className="text-cyber-green font-mono">{analysis.recommendedAction}</div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="text-xs text-gray-500 font-mono mb-1">EXPLANATION</div>
            <div className="text-sm text-gray-400">{analysis.explanation}</div>
          </div>
        </div>
      )}
    </div>
  );
};

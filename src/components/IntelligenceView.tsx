import React, { useState } from 'react';
import { Brain, Zap, RefreshCw, Activity } from 'lucide-react';
import { generatePrediction } from '../utils';

interface IntelligenceViewProps {
  elapsedTime: number;
  distractionCount: number;
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({
  elapsedTime,
  distractionCount,
}) => {
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const newPrediction = generatePrediction(elapsedTime, distractionCount);
      setPrediction(newPrediction);
      setConfidence(Math.floor(Math.random() * 30) + 50);
      setIsAnalyzing(false);
    }, 800);
  };

  React.useEffect(() => {
    runAnalysis();
  }, [elapsedTime, distractionCount]);

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            INTELLIGENCE
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            AI-powered productivity predictions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-[var(--color-cyan)] animate-pulse-green" />
          <span className="text-xs text-[var(--color-cyan)] font-mono">
            ACTIVE
          </span>
        </div>
      </div>

      {/* Intelligence Panel */}
      <div className="panel p-6 glow-green">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-emerald)] flex items-center justify-center">
            <Brain className="w-6 h-6 text-[var(--color-bg-primary)]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
              PROCRASTINATION_INTELLIGENCE
            </h3>
            <p className="text-[10px] text-[var(--color-text-secondary)] font-mono">
              Predictive analysis engine
            </p>
          </div>
        </div>

        {/* Prediction Display */}
        <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-6 mb-6">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-3 font-mono">
            CURRENT_PREDICTION
          </div>
          <div className="text-lg text-[var(--color-cyan)] font-semibold mb-4 font-mono">
            {prediction || 'ANALYZING...'}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-[10px] text-[var(--color-text-secondary)] mb-1 font-mono">
                CONFIDENCE_HEURISTIC
              </div>
              <div className="progress-bar h-2">
                <div
                  className="progress-fill bg-[var(--color-cyan)]"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-[var(--color-cyan)]">
              {confidence}%
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="btn btn-primary w-full"
        >
          <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          {isAnalyzing ? 'ANALYZING...' : 'RUN_ANALYSIS'}
        </button>
      </div>

      {/* Disclaimer */}
      <div className="panel p-4 border-l-warning">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-[var(--color-amber)] shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-[var(--color-text-primary)] font-mono mb-1">
              DISCLAIMER
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono leading-relaxed">
              // Predictions are playful estimates based on session behaviour.
              // Not scientifically validated AI predictions.
              // The system does not monitor actual browsing activity.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[var(--color-cyan)]" />
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              SESSION_DURATION
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-[var(--color-text-primary)]">
            {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s
          </div>
        </div>
        <div className="panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-[var(--color-amber)]" />
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              DISTRACTIONS
            </div>
          </div>
          <div className="text-xl font-bold font-mono text-[var(--color-amber)]">
            {distractionCount}
          </div>
        </div>
      </div>
    </div>
  );
};

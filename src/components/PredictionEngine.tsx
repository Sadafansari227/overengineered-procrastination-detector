import React, { useState, useEffect } from 'react';
import { generatePrediction } from '../utils';

interface PredictionEngineProps {
  elapsedTime: number;
  distractionCount: number;
  reducedMotion: boolean;
}

export const PredictionEngine: React.FC<PredictionEngineProps> = ({
  elapsedTime,
  distractionCount,
  reducedMotion,
}) => {
  const [prediction, setPrediction] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setPrediction(generatePrediction(elapsedTime, distractionCount));
  }, [elapsedTime, distractionCount]);

  useEffect(() => {
    if (isPaused || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setPrediction(generatePrediction(elapsedTime, distractionCount));
          return Math.floor(Math.random() * 30) + 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, isPaused, elapsedTime, distractionCount]);

  const handleGenerateNew = () => {
    setPrediction(generatePrediction(elapsedTime, distractionCount));
    setCountdown(Math.floor(Math.random() * 30) + 10);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setCountdown(0);
    setIsPaused(false);
  };

  return (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-bold text-cyber-cyan mb-2">
        PROCRASTINATION PREDICTION ENGINE
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Playful estimates based on session behaviour. Not real AI. Your mouse is safe.
      </p>

      <div className="bg-cyber-dark border border-cyber-amber/50 rounded-lg p-6 mb-4">
        <div className="text-xs text-gray-500 font-mono mb-2">CURRENT PREDICTION</div>
        <div className={`text-xl text-cyber-amber ${!reducedMotion ? 'animate-pulse' : ''}`}>
          {prediction}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="text-sm text-gray-400 font-mono">
          Next prediction in: <span className="text-cyber-cyan">{countdown}s</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleGenerateNew}
          className="px-4 py-2 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan/30 transition-colors font-mono text-sm"
        >
          GENERATE NEW PREDICTION
        </button>
        <button
          onClick={handleTogglePause}
          className={`px-4 py-2 border rounded transition-colors font-mono text-sm ${
            isPaused
              ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
              : 'bg-cyber-amber/20 border-cyber-amber text-cyber-amber'
          }`}
        >
          {isPaused ? 'RESUME TIMER' : 'PAUSE TIMER'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-cyber-red/20 border border-cyber-red text-cyber-red rounded hover:bg-cyber-red/30 transition-colors font-mono text-sm"
        >
          RESET TIMER
        </button>
      </div>
    </div>
  );
};

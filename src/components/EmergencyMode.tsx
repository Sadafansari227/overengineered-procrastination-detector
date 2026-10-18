import React, { useState, useEffect } from 'react';
import { getRandomMessage, formatTime } from '../utils';

interface EmergencyModeProps {
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  reducedMotion: boolean;
}

export const EmergencyMode: React.FC<EmergencyModeProps> = ({
  isActive,
  onActivate,
  onDeactivate,
  reducedMotion,
}) => {
  const [timer, setTimer] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isActive && !isRunning) {
      setMessage(getRandomMessage());
    }
  }, [isActive, isRunning]);

  useEffect(() => {
    if (!isRunning || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimer(25 * 60);
    setIsRunning(false);
    setMessage(getRandomMessage());
  };

  const handleNewMessage = () => {
    setMessage(getRandomMessage());
  };

  if (!isActive) {
    return (
      <div className="bg-cyber-panel border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-cyber-cyan mb-2">
          EMERGENCY EXAM MODE
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          For when the syllabus is no longer a suggestion.
        </p>
        <button
          onClick={onActivate}
          className="px-6 py-3 bg-cyber-red/20 border border-cyber-red text-cyber-red rounded hover:bg-cyber-red/30 transition-colors font-mono text-sm w-full"
        >
          INITIATE EMERGENCY EXAM PROTOCOL
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cyber-red/10 border-2 border-cyber-red rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-cyber-red">
          ⚠️ EMERGENCY EXAM PROTOCOL ACTIVE ⚠️
        </h2>
        <button
          onClick={onDeactivate}
          className="px-4 py-2 bg-gray-800 border border-gray-600 text-gray-400 rounded hover:bg-gray-700 transition-colors font-mono text-sm"
        >
          EXIT EMERGENCY MODE
        </button>
      </div>

      <div className="bg-cyber-red/20 border border-cyber-red rounded-lg p-6 mb-6">
        <div className={`text-5xl font-bold text-cyber-red text-center mb-4 ${!reducedMotion ? 'animate-pulse' : ''}`}>
          {formatTime(timer)}
        </div>
        <div className="text-center text-cyber-red font-mono text-sm">
          FOCUS TIMER
        </div>
      </div>

      <div className="bg-cyber-dark border border-cyber-red/50 rounded-lg p-4 mb-6">
        <div className="text-xs text-gray-500 font-mono mb-2">MOTIVATIONAL MESSAGE</div>
        <div className="text-lg text-cyber-red font-bold text-center">
          {message}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {!isRunning && timer > 0 && (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-cyber-green/20 border border-cyber-green text-cyber-green rounded hover:bg-cyber-green/30 transition-colors font-mono text-sm"
          >
            START TIMER
          </button>
        )}
        {isRunning && (
          <button
            onClick={handlePause}
            className="px-4 py-2 bg-cyber-amber/20 border border-cyber-amber text-cyber-amber rounded hover:bg-cyber-amber/30 transition-colors font-mono text-sm"
          >
            PAUSE TIMER
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-cyber-red/20 border border-cyber-red text-cyber-red rounded hover:bg-cyber-red/30 transition-colors font-mono text-sm"
        >
          RESET TIMER
        </button>
        <button
          onClick={handleNewMessage}
          className="px-4 py-2 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan/30 transition-colors font-mono text-sm"
        >
          NEW MESSAGE
        </button>
      </div>

      {timer === 0 && (
        <div className="bg-cyber-green/20 border border-cyber-green rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-cyber-green mb-2">
            TIMER COMPLETE
          </div>
          <div className="text-gray-400">
            Excellent work. Your syllabus is relieved.
          </div>
        </div>
      )}
    </div>
  );
};

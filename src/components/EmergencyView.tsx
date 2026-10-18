import React, { useState, useEffect } from 'react';
import { AlertTriangle, Play, Pause, RotateCcw, X, Terminal } from 'lucide-react';
import { getRandomMessage, formatTime } from '../utils';

interface EmergencyViewProps {
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({
  isActive,
  onActivate,
  onDeactivate,
}) => {
  const [timer, setTimer] = useState(25 * 60);
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

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setTimer(25 * 60);
    setIsRunning(false);
    setMessage(getRandomMessage());
  };

  if (!isActive) {
    return (
      <div className="space-y-6 animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
              EMERGENCY_MODE
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
              Focus timer and alerts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[var(--color-amber)]" />
            <span className="text-xs text-[var(--color-amber)] font-mono">
              STANDBY
            </span>
          </div>
        </div>

        <div className="panel p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-[var(--color-critical)] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-mono mb-2">
            EMERGENCY_PROTOCOL
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] font-mono mb-6">
            // For when the syllabus is no longer a suggestion
          </p>
          <button onClick={onActivate} className="btn btn-danger">
            <AlertTriangle className="w-4 h-4" />
            INITIATE_PROTOCOL
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-critical)] font-mono uppercase tracking-wider text-glow">
            ⚠️ EMERGENCY_PROTOCOL_ACTIVE
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            Focus mode engaged
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-critical)] animate-pulse-green" />
          <span className="text-xs text-[var(--color-critical)] font-mono">
            CRITICAL
          </span>
        </div>
      </div>

      {/* Active Emergency Panel */}
      <div className="panel p-6 border-2 border-[var(--color-critical)] glow-critical">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[var(--color-critical)] flex items-center justify-center animate-pulse-green">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-critical)] font-mono uppercase tracking-wider">
                FOCUS_TIMER
              </h3>
              <p className="text-[10px] text-[var(--color-text-secondary)] font-mono">
                Emergency session in progress
              </p>
            </div>
          </div>
          <button onClick={onDeactivate} className="btn btn-secondary">
            <X className="w-4 h-4" />
            ABORT
          </button>
        </div>

        {/* Timer */}
        <div className="bg-[var(--color-bg-primary)] border border-[var(--color-critical)] p-8 mb-6 text-center">
          <div className={`text-6xl font-bold font-mono text-[var(--color-critical)] mb-2 text-glow`}>
            {formatTime(timer)}
          </div>
          <div className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
            REMAINING_TIME
          </div>
        </div>

        {/* Message */}
        <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] p-4 mb-6">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
            MOTIVATIONAL_MESSAGE
          </div>
          <div className="text-lg text-[var(--color-critical)] font-bold text-center font-mono">
            {message}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          {!isRunning && timer > 0 && (
            <button onClick={handleStart} className="btn btn-success">
              <Play className="w-4 h-4" />
              START_TIMER
            </button>
          )}
          {isRunning && (
            <button onClick={handlePause} className="btn btn-warning">
              <Pause className="w-4 h-4" />
              PAUSE_TIMER
            </button>
          )}
          <button onClick={handleReset} className="btn btn-secondary">
            <RotateCcw className="w-4 h-4" />
            RESET_TIMER
          </button>
          <button
            onClick={() => setMessage(getRandomMessage())}
            className="btn btn-secondary"
          >
            <Terminal className="w-4 h-4" />
            NEW_MESSAGE
          </button>
        </div>

        {timer === 0 && (
          <div className="mt-6 bg-[var(--color-neon-green)]/10 border border-[var(--color-neon-green)] p-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-neon-green)] font-mono mb-2">
              TIMER_COMPLETE
            </div>
            <div className="text-[var(--color-text-secondary)] font-mono text-sm">
              // Excellent work. Your syllabus is relieved.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

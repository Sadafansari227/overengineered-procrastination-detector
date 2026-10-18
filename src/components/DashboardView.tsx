import React from 'react';
import { MetricCards } from './MetricCards';
import { TelemetryLog } from './TelemetryLog';
import { SystemConfig } from './SystemConfig';
import type { SessionMetrics } from '../types';
import { Play, Pause, Square, RotateCcw, Terminal, AlertTriangle } from 'lucide-react';

interface DashboardViewProps {
  metrics: SessionMetrics;
  threatLevel: number;
  sessionStatus: 'idle' | 'active' | 'paused' | 'ended';
  elapsed: number;
  onStartSession: () => void;
  onPauseSession: () => void;
  onResumeSession: () => void;
  onEndSession: () => void;
  onRecordDistraction: () => void;
  onResetSession: () => void;
  events: any[];
  onClearEvents: () => void;
  soundEnabled: boolean;
  reducedMotion: boolean;
  onToggleSound: () => void;
  onToggleReducedMotion: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  threatLevel,
  sessionStatus,
  elapsed,
  onStartSession,
  onPauseSession,
  onResumeSession,
  onEndSession,
  onRecordDistraction,
  onResetSession,
  events,
  onClearEvents,
  soundEnabled,
  reducedMotion,
  onToggleSound,
  onToggleReducedMotion,
}) => {
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (sessionStatus) {
      case 'active':
        return 'text-[var(--color-neon-green)]';
      case 'paused':
        return 'text-[var(--color-amber)]';
      case 'ended':
        return 'text-[var(--color-critical)]';
      default:
        return 'text-[var(--color-text-secondary)]';
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            SYSTEM_OVERVIEW
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            Real-time productivity telemetry and behavioural threat analysis
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${sessionStatus === 'active' ? 'bg-[var(--color-neon-green)] animate-pulse-green' : 'bg-[var(--color-text-secondary)]'}`} />
            <span className={`text-xs font-mono ${getStatusColor()}`}>
              {sessionStatus.toUpperCase()}
            </span>
          </div>
          <div className="text-xs text-[var(--color-text-secondary)] font-mono">
            UPTIME: {formatTime(elapsed)}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <MetricCards metrics={metrics} threatLevel={threatLevel} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session Control Center */}
        <div className="lg:col-span-2 space-y-6">
          {/* Session Controls */}
          <div className="panel p-4">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-[var(--color-neon-green)]" />
              <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
                SESSION_CONTROL_CENTER
              </h3>
            </div>
            
            {/* Timer Display */}
            <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-6 mb-4 text-center">
              <div className={`text-4xl font-bold font-mono ${getStatusColor()} text-glow mb-2`}>
                {formatTime(elapsed)}
              </div>
              <div className="text-[10px] text-[var(--color-text-secondary)] font-mono uppercase tracking-wider">
                Focus Timer
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap gap-3">
              {sessionStatus === 'idle' && (
                <button onClick={onStartSession} className="btn btn-primary">
                  <Play className="w-4 h-4" />
                  START_SESSION
                </button>
              )}
              {sessionStatus === 'active' && (
                <>
                  <button onClick={onPauseSession} className="btn btn-secondary">
                    <Pause className="w-4 h-4" />
                    PAUSE_SESSION
                  </button>
                  <button onClick={onRecordDistraction} className="btn btn-danger">
                    <AlertTriangle className="w-4 h-4" />
                    RECORD_DISTRACTION
                  </button>
                  <button onClick={onEndSession} className="btn btn-secondary">
                    <Square className="w-4 h-4" />
                    END_SESSION
                  </button>
                </>
              )}
              {sessionStatus === 'paused' && (
                <>
                  <button onClick={onResumeSession} className="btn btn-success">
                    <Play className="w-4 h-4" />
                    RESUME_SESSION
                  </button>
                  <button onClick={onEndSession} className="btn btn-secondary">
                    <Square className="w-4 h-4" />
                    END_SESSION
                  </button>
                </>
              )}
              {(sessionStatus === 'active' || sessionStatus === 'paused') && (
                <button onClick={onResetSession} className="btn btn-danger">
                  <RotateCcw className="w-4 h-4" />
                  RESET
                </button>
              )}
            </div>
          </div>

          {/* Telemetry Log */}
          <TelemetryLog events={events} onClear={onClearEvents} />
        </div>

        {/* System Configuration */}
        <div>
          <SystemConfig
            soundEnabled={soundEnabled}
            reducedMotion={reducedMotion}
            onToggleSound={onToggleSound}
            onToggleReducedMotion={onToggleReducedMotion}
            threatLevel={threatLevel}
          />
        </div>
      </div>
    </div>
  );
};

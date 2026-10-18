import React from 'react';
import { Target, Clock, AlertTriangle, Shield, Activity, TrendingUp } from 'lucide-react';
import type { SessionMetrics } from '../types';
import { formatTime } from '../utils';

interface MetricCardsProps {
  metrics: SessionMetrics;
  threatLevel: number;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics, threatLevel }) => {
  const getThreatColor = (level: number) => {
    if (level === 0) return 'text-[var(--color-neon-green)]';
    if (level <= 2) return 'text-[var(--color-amber)]';
    return 'text-[var(--color-critical)]';
  };

  const getThreatLabel = (level: number) => {
    const labels = ['PRODUCTIVE', 'MINOR', 'MODERATE', 'HIGH', 'CRITICAL'];
    return labels[level] || 'UNKNOWN';
  };

  const getFocusScoreColor = (score: number) => {
    if (score >= 70) return 'text-[var(--color-neon-green)]';
    if (score >= 50) return 'text-[var(--color-amber)]';
    return 'text-[var(--color-critical)]';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Focus Score */}
      <div className="metric-card">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[var(--color-neon-green)]" />
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              FOCUS_SCORE
            </span>
          </div>
          <div className={`text-2xl font-bold font-mono ${getFocusScoreColor(metrics.focusScore)} text-glow`}>
            {metrics.focusScore}%
          </div>
        </div>
        <div className="progress-bar h-1 mb-2">
          <div
            className="progress-fill bg-[var(--color-neon-green)]"
            style={{ width: `${metrics.focusScore}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)]">
          <TrendingUp className="w-3 h-3" />
          <span>LIVE TELEMETRY</span>
        </div>
      </div>

      {/* Focus Time */}
      <div className="metric-card">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--color-cyan)]" />
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              FOCUS_TIME
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-cyan)] text-glow">
            {formatTime(metrics.focusTime)}
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)]">
          <Activity className="w-3 h-3" />
          <span>ACTIVE SESSION</span>
        </div>
      </div>

      {/* Distractions */}
      <div className="metric-card">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[var(--color-amber)]" />
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              INCIDENTS
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-amber)] text-glow">
            {metrics.distractionCount}
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)]">
          <AlertTriangle className="w-3 h-3" />
          <span>EVENT LOG</span>
        </div>
      </div>

      {/* Threat Level */}
      <div className="metric-card">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--color-critical)]" />
            <span className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              THREAT_LEVEL
            </span>
          </div>
          <div className={`text-2xl font-bold font-mono ${getThreatColor(threatLevel)} text-glow`}>
            L{threatLevel}
          </div>
        </div>
        <div className={`text-xs font-semibold font-mono ${getThreatColor(threatLevel)}`}>
          {getThreatLabel(threatLevel)}
        </div>
      </div>
    </div>
  );
};

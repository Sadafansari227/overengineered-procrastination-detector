import React from 'react';
import { formatTime } from '../utils';
import type { SessionMetrics } from '../types';

interface ProductivityMetricsProps {
  metrics: SessionMetrics;
}

export const ProductivityMetrics: React.FC<ProductivityMetricsProps> = ({ metrics }) => {
  const MetricCard: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-4">
      <div className="text-xs text-gray-500 font-mono mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <MetricCard
        label="FOCUS TIME"
        value={formatTime(metrics.focusTime)}
        color="text-cyber-green"
      />
      <MetricCard
        label="DISTRACTION TIME"
        value={formatTime(metrics.distractionTime)}
        color="text-cyber-red"
      />
      <MetricCard
        label="DISTRACTIONS"
        value={metrics.distractionCount.toString()}
        color="text-cyber-amber"
      />
      <MetricCard
        label="FOCUS SCORE"
        value={`${metrics.focusScore}%`}
        color={metrics.focusScore >= 70 ? 'text-cyber-green' : metrics.focusScore >= 50 ? 'text-cyber-amber' : 'text-cyber-red'}
      />
      <MetricCard
        label="SESSION DURATION"
        value={formatTime(metrics.sessionDuration)}
        color="text-cyber-cyan"
      />
      <MetricCard
        label="PRODUCTIVITY STREAK"
        value={metrics.productivityStreak.toString()}
        color="text-cyber-green"
      />
    </div>
  );
};

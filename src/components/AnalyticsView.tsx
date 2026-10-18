import React from 'react';
import type { SessionMetrics } from '../types';
import { BarChart3 } from 'lucide-react';

interface AnalyticsViewProps {
  metrics: SessionMetrics;
  incidentCategories: Record<string, number>;
  sessionHistory: Array<{ focusScore: number; date: string }>;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  metrics,
  incidentCategories,
  sessionHistory,
}) => {
  const totalIncidents = Object.values(incidentCategories).reduce((sum, count) => sum + count, 0);
  const focusPercentage = metrics.sessionDuration > 0
    ? (metrics.focusTime / metrics.sessionDuration) * 100
    : 0;

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            ANALYTICS
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            Performance insights and trends
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[var(--color-cyan)]" />
          <span className="text-xs text-[var(--color-cyan)] font-mono">
            {sessionHistory.length} SESSIONS
          </span>
        </div>
      </div>

      {/* Focus Score Trend */}
      <div className="panel p-4">
        <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
          FOCUS_SCORE_TREND
        </h3>
        {sessionHistory.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-secondary)] font-mono text-xs">
            // NO SESSION HISTORY AVAILABLE
          </div>
        ) : (
          <div className="h-48 flex items-end gap-2">
            {sessionHistory.slice(-12).map((session, index) => {
              const height = session.focusScore;
              const color = height >= 70 ? 'bg-[var(--color-neon-green)]' : height >= 50 ? 'bg-[var(--color-amber)]' : 'bg-[var(--color-critical)]';
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={`w-full ${color} rounded-t transition-all duration-500`}
                    style={{ height: `${height}%` }}
                    title={`Score: ${session.focusScore}%`}
                  />
                  <span className="text-[10px] text-[var(--color-text-secondary)] font-mono">
                    {session.focusScore}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Focus vs Distraction */}
      <div className="panel p-4">
        <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
          FOCUS_VS_DISTRACTION
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-2 font-mono">
              <span className="text-[var(--color-text-primary)]">FOCUS_TIME</span>
              <span className="text-[var(--color-neon-green)]">{focusPercentage.toFixed(1)}%</span>
            </div>
            <div className="progress-bar h-2">
              <div
                className="progress-fill bg-[var(--color-neon-green)]"
                style={{ width: `${focusPercentage}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-2 font-mono">
              <span className="text-[var(--color-text-primary)]">DISTRACTION_TIME</span>
              <span className="text-[var(--color-critical)]">{(100 - focusPercentage).toFixed(1)}%</span>
            </div>
            <div className="progress-bar h-2">
              <div
                className="progress-fill bg-[var(--color-critical)]"
                style={{ width: `${100 - focusPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Incident Categories */}
      {totalIncidents > 0 && (
        <div className="panel p-4">
          <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
            INCIDENT_CATEGORIES
          </h3>
          <div className="space-y-4">
            {Object.entries(incidentCategories).map(([category, count]) => {
              const percentage = (count / totalIncidents) * 100;
              return (
                <div key={category}>
                  <div className="flex justify-between text-xs mb-2 font-mono">
                    <span className="text-[var(--color-text-primary)]">{category}</span>
                    <span className="text-[var(--color-cyan)]">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="progress-bar h-2">
                    <div
                      className="progress-fill bg-[var(--color-cyan)]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Session Performance */}
      {metrics.sessionDuration > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="panel p-4">
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
              AVG_FOCUS_SCORE
            </div>
            <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
              {sessionHistory.length > 0
                ? Math.round(sessionHistory.reduce((sum, s) => sum + s.focusScore, 0) / sessionHistory.length)
                : metrics.focusScore}%
            </div>
          </div>
          <div className="panel p-4">
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
              TOTAL_SESSIONS
            </div>
            <div className="text-2xl font-bold font-mono text-[var(--color-cyan)]">
              {sessionHistory.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import type { ActivityEvent } from '../types';
import { formatTime } from '../utils';
import { Activity, Clock, TrendingUp } from 'lucide-react';

interface MonitoringViewProps {
  events: ActivityEvent[];
  metrics: {
    focusTime: number;
    distractionTime: number;
    sessionDuration: number;
  };
  onClearEvents: () => void;
}

export const MonitoringView: React.FC<MonitoringViewProps> = ({
  events,
  metrics,
  onClearEvents,
}) => {
  const focusPercentage = metrics.sessionDuration > 0
    ? (metrics.focusTime / metrics.sessionDuration) * 100
    : 0;

  const getEventBadge = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'system':
        return 'badge-info';
      case 'user':
        return 'badge-success';
      case 'incident':
        return 'badge-critical';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            LIVE_MONITORING
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            Real-time session telemetry and event tracking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--color-neon-green)] animate-pulse-green" />
          <span className="text-xs text-[var(--color-neon-green)] font-mono">
            LIVE
          </span>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="panel p-4">
        <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
          FOCUS_VS_DISTRACTION
        </h3>
        <div className="h-32 flex items-end gap-1">
          <div className="flex-1 bg-[var(--color-bg-primary)] rounded-t overflow-hidden flex border border-[var(--color-border)]">
            <div
              className="bg-[var(--color-neon-green)] transition-all duration-500"
              style={{ width: `${focusPercentage}%` }}
              title={`Focus: ${focusPercentage.toFixed(1)}%`}
            />
            <div
              className="bg-[var(--color-critical)] transition-all duration-500"
              style={{ width: `${100 - focusPercentage}%` }}
              title={`Distraction: ${(100 - focusPercentage).toFixed(1)}%`}
            />
          </div>
        </div>
        <div className="flex justify-between mt-3 text-[10px] text-[var(--color-text-secondary)] font-mono">
          <span className="text-[var(--color-neon-green)]">FOCUS: {focusPercentage.toFixed(1)}%</span>
          <span className="text-[var(--color-critical)]">DISTRACTION: {(100 - focusPercentage).toFixed(1)}%</span>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="panel p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            EVENT_LOG
          </h3>
          <button onClick={onClearEvents} className="text-[10px] text-[var(--color-neon-green)] font-mono hover:underline">
            CLEAR_LOG
          </button>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-secondary)] font-mono text-xs">
              // NO EVENTS RECORDED
            </div>
          ) : (
            events.map((event, index) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-3 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border)] animate-slide-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <span className="text-[10px] text-[var(--color-text-secondary)] font-mono shrink-0">
                  {event.timestamp}
                </span>
                <span className={`badge ${getEventBadge(event.type)} shrink-0`}>
                  {event.type.toUpperCase()}
                </span>
                <span className="text-xs text-[var(--color-text-primary)] font-mono">
                  {event.message}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-[var(--color-cyan)]" />
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              SESSION_DURATION
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
            {formatTime(metrics.sessionDuration)}
          </div>
        </div>
        <div className="panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[var(--color-neon-green)]" />
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              TOTAL_FOCUS
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-neon-green)]">
            {formatTime(metrics.focusTime)}
          </div>
        </div>
        <div className="panel p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-[var(--color-critical)]" />
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider font-mono">
              TOTAL_DISTRACTION
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-critical)]">
            {formatTime(metrics.distractionTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

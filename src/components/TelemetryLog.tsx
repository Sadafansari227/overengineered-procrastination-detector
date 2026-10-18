import React from 'react';
import type { ActivityEvent } from '../types';

interface TelemetryLogProps {
  events: ActivityEvent[];
  onClear: () => void;
}

export const TelemetryLog: React.FC<TelemetryLogProps> = ({ events, onClear }) => {
  const getSeverityBadge = (type: ActivityEvent['type']) => {
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

  const getSeverityLabel = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'system':
        return 'INFO';
      case 'user':
        return 'SUCCESS';
      case 'incident':
        return 'WARNING';
      default:
        return 'INFO';
    }
  };

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-neon-green)] animate-pulse-green" />
          <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            TX_LOGS // LIVE_TELEMETRY
          </h3>
        </div>
        <button onClick={onClear} className="text-[10px] text-[var(--color-neon-green)] font-mono hover:underline">
          CLEAR_LOG
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>EVENT</th>
              <th>PROCESS</th>
              <th>VALUE</th>
              <th>SEVERITY</th>
              <th>TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-[var(--color-text-secondary)] font-mono text-xs">
                  // NO RECENT EVENTS
                </td>
              </tr>
            ) : (
              events.slice(0, 10).map((event, index) => (
                <tr key={event.id} className="animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="font-mono text-xs">{event.message}</td>
                  <td className="font-mono text-[10px] text-[var(--color-text-secondary)]">
                    {event.type.toUpperCase()}
                  </td>
                  <td className="font-mono text-[10px]">
                    <span className={`badge ${getSeverityBadge(event.type)}`}>
                      {getSeverityLabel(event.type)}
                    </span>
                  </td>
                  <td className="font-mono text-[10px]">
                    {event.type === 'incident' ? 'HIGH' : 'LOW'}
                  </td>
                  <td className="font-mono text-[10px] text-[var(--color-text-secondary)]">
                    {event.timestamp}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {events.length > 10 && (
        <div className="mt-3 text-center">
          <button className="text-[10px] text-[var(--color-neon-green)] font-mono hover:underline">
            VIEW_ALL_EVENTS [{events.length}]
          </button>
        </div>
      )}
    </div>
  );
};

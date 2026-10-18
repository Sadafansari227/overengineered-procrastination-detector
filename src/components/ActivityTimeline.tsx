import React from 'react';
import type { ActivityEvent } from '../types';

interface ActivityTimelineProps {
  events: ActivityEvent[];
  onClear: () => void;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ events, onClear }) => {
  const getEventColor = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'system': return 'text-cyber-cyan';
      case 'user': return 'text-cyber-green';
      case 'incident': return 'text-cyber-red';
      default: return 'text-gray-400';
    }
  };

  const getEventPrefix = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'system': return '[SYS]';
      case 'user': return '[USR]';
      case 'incident': return '[INC]';
      default: return '[???]';
    }
  };

  return (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono text-gray-400">ACTIVITY TIMELINE</h3>
        <button
          onClick={onClear}
          className="text-xs text-cyber-red hover:text-cyber-red/80 font-mono"
        >
          CLEAR FEED
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto font-mono text-sm">
        {events.length === 0 ? (
          <div className="text-gray-600 text-center py-8">
            No activity recorded. Start a session to begin monitoring.
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex gap-3 items-start">
              <span className="text-gray-500 shrink-0">{event.timestamp}</span>
              <span className={`${getEventColor(event.type)} shrink-0`}>
                {getEventPrefix(event.type)}
              </span>
              <span className="text-gray-300">{event.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

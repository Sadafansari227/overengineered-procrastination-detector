import React from 'react';

interface SessionControlsProps {
  sessionStatus: 'idle' | 'active' | 'paused' | 'ended';
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export const SessionControls: React.FC<SessionControlsProps> = ({
  sessionStatus,
  onPause,
  onResume,
  onReset,
}) => {
  return (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-mono text-gray-400 mb-4">SESSION CONTROLS</h3>
      <div className="flex flex-wrap gap-3">
        {sessionStatus === 'active' && (
          <button
            onClick={onPause}
            className="px-4 py-2 bg-cyber-amber/20 border border-cyber-amber text-cyber-amber rounded hover:bg-cyber-amber/30 transition-colors font-mono text-sm"
          >
            PAUSE SESSION
          </button>
        )}
        {sessionStatus === 'paused' && (
          <button
            onClick={onResume}
            className="px-4 py-2 bg-cyber-green/20 border border-cyber-green text-cyber-green rounded hover:bg-cyber-green/30 transition-colors font-mono text-sm"
          >
            RESUME SESSION
          </button>
        )}
        {(sessionStatus === 'active' || sessionStatus === 'paused') && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-cyber-red/20 border border-cyber-red text-cyber-red rounded hover:bg-cyber-red/30 transition-colors font-mono text-sm"
          >
            RESET SESSION
          </button>
        )}
        {sessionStatus === 'idle' && (
          <div className="text-gray-600 text-sm font-mono">
            No active session. Start a session to enable controls.
          </div>
        )}
      </div>
    </div>
  );
};

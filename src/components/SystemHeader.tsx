import React from 'react';
import { formatTime } from '../utils';

interface SystemHeaderProps {
  sessionStatus: 'idle' | 'active' | 'paused' | 'ended';
  elapsed: number;
  threatLevel: number;
  soundEnabled: boolean;
  reducedMotion: boolean;
  onStartSession: () => void;
  onEndSession: () => void;
  onToggleSound: () => void;
  onToggleReducedMotion: () => void;
}

export const SystemHeader: React.FC<SystemHeaderProps> = ({
  sessionStatus,
  elapsed,
  threatLevel,
  soundEnabled,
  reducedMotion,
  onStartSession,
  onEndSession,
  onToggleSound,
  onToggleReducedMotion,
}) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = sessionStatus === 'active' ? 'text-cyber-green' : 
                     sessionStatus === 'paused' ? 'text-cyber-amber' : 
                     sessionStatus === 'ended' ? 'text-cyber-red' : 'text-gray-500';

  return (
    <header className="border-b border-cyber-cyan/30 bg-cyber-dark">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-cyber-cyan tracking-wider">
                PROCRASTINATION DETECTOR
              </h1>
              <p className="text-xs text-gray-500 font-mono">
                THE OVERENGINEERED PROCRASTINATION DETECTOR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">STATUS:</span>
              <span className={`${statusColor} ${!reducedMotion ? 'animate-pulse' : ''}`}>
                {sessionStatus === 'active' ? 'ONLINE' : 
                 sessionStatus === 'paused' ? 'PAUSED' : 
                 sessionStatus === 'ended' ? 'OFFLINE' : 'STANDBY'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">TIME:</span>
              <span className="text-cyber-green">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </div>

            {sessionStatus === 'active' && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">SESSION:</span>
                <span className="text-cyber-cyan">{formatTime(elapsed)}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="text-gray-500">THREAT:</span>
              <span className="text-cyber-amber">LEVEL {threatLevel}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">PRIVACY:</span>
              <span className="text-cyber-green">LOCAL ONLY</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {sessionStatus === 'idle' && (
              <button
                onClick={onStartSession}
                className="px-4 py-2 bg-cyber-green/20 border border-cyber-green text-cyber-green rounded hover:bg-cyber-green/30 transition-colors font-mono text-sm"
              >
                START SESSION
              </button>
            )}
            {(sessionStatus === 'active' || sessionStatus === 'paused') && (
              <button
                onClick={onEndSession}
                className="px-4 py-2 bg-cyber-red/20 border border-cyber-red text-cyber-red rounded hover:bg-cyber-red/30 transition-colors font-mono text-sm"
              >
                END SESSION
              </button>
            )}
            <button
              onClick={onToggleSound}
              className={`px-3 py-2 border rounded font-mono text-sm transition-colors ${
                soundEnabled 
                  ? 'bg-cyber-green/20 border-cyber-green text-cyber-green' 
                  : 'bg-gray-800 border-gray-600 text-gray-500'
              }`}
              title="Toggle Sound Effects"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <button
              onClick={onToggleReducedMotion}
              className={`px-3 py-2 border rounded font-mono text-sm transition-colors ${
                reducedMotion 
                  ? 'bg-cyber-green/20 border-cyber-green text-cyber-green' 
                  : 'bg-gray-800 border-gray-600 text-gray-500'
              }`}
              title="Toggle Reduced Motion"
            >
              {reducedMotion ? '✓' : '✗'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

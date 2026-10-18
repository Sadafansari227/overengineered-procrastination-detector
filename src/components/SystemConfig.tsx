import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface SystemConfigProps {
  soundEnabled: boolean;
  reducedMotion: boolean;
  onToggleSound: () => void;
  onToggleReducedMotion: () => void;
  threatLevel: number;
}

export const SystemConfig: React.FC<SystemConfigProps> = ({
  soundEnabled,
  reducedMotion,
  onToggleSound,
  onToggleReducedMotion,
  threatLevel,
}) => {
  const getThreatColor = (level: number) => {
    if (level === 0) return 'text-[var(--color-neon-green)]';
    if (level <= 2) return 'text-[var(--color-amber)]';
    return 'text-[var(--color-critical)]';
  };

  const getThreatLabel = (level: number) => {
    const labels = ['LOW THREAT', 'MINOR THREAT', 'MODERATE THREAT', 'HIGH THREAT', 'CRITICAL THREAT'];
    return labels[level] || 'UNKNOWN';
  };

  return (
    <div className="space-y-4">
      {/* System Preferences */}
      <div className="panel p-4">
        <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
          SYS_PREFS
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-primary)] font-mono">
              SESSION_NOTIFICATIONS
            </span>
            <div
              className={`toggle ${soundEnabled ? 'active' : ''}`}
              onClick={onToggleSound}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-primary)] font-mono">
              REDUCED_MOTION
            </span>
            <div
              className={`toggle ${reducedMotion ? 'active' : ''}`}
              onClick={onToggleReducedMotion}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-primary)] font-mono">
              SOUND_EFFECTS
            </span>
            <div
              className={`toggle ${soundEnabled ? 'active' : ''}`}
              onClick={onToggleSound}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-primary)] font-mono">
              PRIVACY_MODE
            </span>
            <div className="toggle active" />
          </div>
        </div>
      </div>

      {/* Behavioural Alerts */}
      <div className="panel p-4 border-scan">
        <h3 className="text-xs font-semibold text-[var(--color-amber)] font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          BEHAVIOURAL_ALERTS
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-secondary)] font-mono">
              CURRENT_THREAT
            </span>
            <span className={`text-xs font-bold font-mono ${getThreatColor(threatLevel)}`}>
              {getThreatLabel(threatLevel)}
            </span>
          </div>
          <div className="text-[10px] text-[var(--color-text-secondary)] font-mono leading-relaxed">
            // Monitoring limited to observable application events.
            // No external browser or system surveillance.
          </div>
          <button className="btn btn-secondary w-full text-xs">
            OPEN_INCIDENT_REGISTRY
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Volume2, Minimize, RotateCcw, Cpu } from 'lucide-react';

interface SettingsViewProps {
  soundEnabled: boolean;
  reducedMotion: boolean;
  onToggleSound: () => void;
  onToggleReducedMotion: () => void;
  onResetSession: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  soundEnabled,
  reducedMotion,
  onToggleSound,
  onToggleReducedMotion,
  onResetSession,
}) => {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            SYSTEM_CONFIG
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            Application preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[var(--color-cyan)]" />
          <span className="text-xs text-[var(--color-cyan)] font-mono">
            CONFIGURED
          </span>
        </div>
      </div>

      {/* Audio Settings */}
      <div className="panel p-6">
        <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
          AUDIO_PREFERENCES
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <div>
              <div className="text-sm text-[var(--color-text-primary)] font-mono">
                SOUND_EFFECTS
              </div>
              <div className="text-[10px] text-[var(--color-text-secondary)] font-mono">
                Enable audio notifications
              </div>
            </div>
          </div>
          <div
            className={`toggle ${soundEnabled ? 'active' : ''}`}
            onClick={onToggleSound}
          />
        </div>
      </div>

      {/* Motion Settings */}
      <div className="panel p-6">
        <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
          VISUAL_PREFERENCES
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Minimize className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <div>
              <div className="text-sm text-[var(--color-text-primary)] font-mono">
                REDUCED_MOTION
              </div>
              <div className="text-[10px] text-[var(--color-text-secondary)] font-mono">
                Minimize animations and transitions
              </div>
            </div>
          </div>
          <div
            className={`toggle ${reducedMotion ? 'active' : ''}`}
            onClick={onToggleReducedMotion}
          />
        </div>
      </div>

      {/* Session Reset */}
      <div className="panel p-6">
        <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
          SESSION_MANAGEMENT
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <div>
              <div className="text-sm text-[var(--color-text-primary)] font-mono">
                RESET_CURRENT_SESSION
              </div>
              <div className="text-[10px] text-[var(--color-text-secondary)] font-mono">
                Clear all session data and start fresh
              </div>
            </div>
          </div>
          <button onClick={onResetSession} className="btn btn-danger">
            RESET_SESSION
          </button>
        </div>
      </div>

      {/* System Info */}
      <div className="panel p-6">
        <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
          SYSTEM_INFORMATION
        </h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">VERSION</span>
            <span className="text-[var(--color-text-primary)]">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">FRAMEWORK</span>
            <span className="text-[var(--color-text-primary)]">REACT_19</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">BUILD</span>
            <span className="text-[var(--color-text-primary)]">VITE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">RUNTIME</span>
            <span className="text-[var(--color-text-primary)]">LOCAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

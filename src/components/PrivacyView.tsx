import React from 'react';
import { Shield, Eye, Database, Trash2 } from 'lucide-react';
import { clearLocalStorage } from '../utils';

export const PrivacyView: React.FC = () => {
  const handleClearData = () => {
    if (confirm('Are you sure you want to erase all locally stored application data? This cannot be undone.')) {
      clearLocalStorage();
      alert('All local data has been erased.');
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            PRIVACY_SECURITY
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            Data handling information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[var(--color-neon-green)]" />
          <span className="text-xs text-[var(--color-neon-green)] font-mono">
            SECURE
          </span>
        </div>
      </div>

      {/* What We Record */}
      <div className="panel p-6 border-l-success">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-[var(--color-neon-green)]" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
            DATA_COLLECTION
          </h3>
        </div>
        <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] font-mono">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-neon-green)] mt-1">[OK]</span>
            <span>Session start and end times</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-neon-green)] mt-1">[OK]</span>
            <span>Focus and distraction time (manual controls)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-neon-green)] mt-1">[OK]</span>
            <span>Excuses submitted for analysis</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-neon-green)] mt-1">[OK]</span>
            <span>Incidents created or resolved</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-neon-green)] mt-1">[OK]</span>
            <span>Session reports and analytics</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-neon-green)] mt-1">[OK]</span>
            <span>Local storage preferences</span>
          </li>
        </ul>
      </div>

      {/* What We Don't Record */}
      <div className="panel p-6 border-l-critical">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-5 h-5 text-[var(--color-critical)]" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
            NO_SURVEILLANCE
          </h3>
        </div>
        <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] font-mono">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-critical)] mt-1">[XX]</span>
            <span>Browser tabs or websites visited</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-critical)] mt-1">[XX]</span>
            <span>Keystrokes or typing patterns</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-critical)] mt-1">[XX]</span>
            <span>Screen content or screenshots</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-critical)] mt-1">[XX]</span>
            <span>Webcam or microphone data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-critical)] mt-1">[XX]</span>
            <span>External application activity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-critical)] mt-1">[XX]</span>
            <span>Personal identifiers (name, email, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-critical)] mt-1">[XX]</span>
            <span>Location data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-critical)] mt-1">[XX]</span>
            <span>Any data sent to external servers</span>
          </li>
        </ul>
      </div>

      {/* Data Storage */}
      <div className="panel p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] font-mono uppercase tracking-wider mb-4">
          STORAGE_POLICY
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] font-mono leading-relaxed mb-4">
          // All data is stored locally in your browser's localStorage.
          // No data is transmitted to any server.
          // Clearing your browser data or clicking the button below will permanently delete all application data.
        </p>
        <button onClick={handleClearData} className="btn btn-danger">
          <Trash2 className="w-4 h-4" />
          ERASE_ALL_DATA
        </button>
      </div>
    </div>
  );
};

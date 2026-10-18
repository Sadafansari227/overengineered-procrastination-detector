import React from 'react';
import { clearLocalStorage } from '../utils';

export const PrivacyPanel: React.FC = () => {
  const handleClearData = () => {
    if (confirm('Are you sure you want to erase all locally stored application data? This cannot be undone.')) {
      clearLocalStorage();
      alert('All local data has been erased.');
    }
  };

  return (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-bold text-cyber-cyan mb-2">
        PRIVACY & SECURITY
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        This application is designed with privacy in mind. Here's what we do and don't do.
      </p>

      <div className="space-y-4 mb-6">
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-cyber-green mb-2">✓ What We Record</h3>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li>Session start and end times</li>
            <li>Focus and distraction time (based on manual session controls)</li>
            <li>Excuses you submit for analysis</li>
            <li>Incidents you create or mark as resolved</li>
            <li>Session reports and analytics</li>
            <li>Local storage preferences (sound, reduced motion)</li>
          </ul>
        </div>

        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-cyber-red mb-2">✗ What We Do NOT Record</h3>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li>Browser tabs or websites you visit</li>
            <li>Keystrokes or typing patterns</li>
            <li>Screen content or screenshots</li>
            <li>Webcam or microphone data</li>
            <li>External application activity</li>
            <li>Personal identifiers (name, email, etc.)</li>
            <li>Location data</li>
            <li>Any data sent to external servers</li>
          </ul>
        </div>

        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold text-cyber-cyan mb-2">🔒 Data Storage</h3>
          <p className="text-sm text-gray-400">
            All data is stored locally in your browser's localStorage. No data is transmitted to any server. 
            Clearing your browser data or clicking the button below will permanently delete all application data.
          </p>
        </div>
      </div>

      <button
        onClick={handleClearData}
        className="px-4 py-2 bg-cyber-red/20 border border-cyber-red text-cyber-red rounded hover:bg-cyber-red/30 transition-colors font-mono text-sm"
      >
        ERASE ALL LOCAL DATA
      </button>
    </div>
  );
};

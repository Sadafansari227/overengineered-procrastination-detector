import React from 'react';
import { THREAT_CLASSIFICATIONS } from '../utils';

interface ThreatMonitorProps {
  threatLevel: number;
  reducedMotion: boolean;
}

export const ThreatMonitor: React.FC<ThreatMonitorProps> = ({ threatLevel, reducedMotion }) => {
  const classification = THREAT_CLASSIFICATIONS[threatLevel as keyof typeof THREAT_CLASSIFICATIONS];
  
  const getColorStyle = () => {
    switch (threatLevel) {
      case 0: return 'text-cyber-green border-cyber-green';
      case 1: return 'text-cyber-amber border-cyber-amber';
      case 2: return 'text-cyber-amber border-cyber-amber';
      case 3: return 'text-cyber-red border-cyber-red';
      case 4: return 'text-cyber-red border-cyber-red';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getBgStyle = () => {
    switch (threatLevel) {
      case 0: return 'bg-cyber-green/10';
      case 1: return 'bg-cyber-amber/10';
      case 2: return 'bg-cyber-amber/10';
      case 3: return 'bg-cyber-red/10';
      case 4: return 'bg-cyber-red/10';
      default: return 'bg-gray-800';
    }
  };

  const getGlowClass = () => {
    if (reducedMotion) return '';
    switch (threatLevel) {
      case 0: return 'text-glow-green';
      case 1: return 'text-glow-amber';
      case 2: return 'text-glow-amber';
      case 3: return 'text-glow-red';
      case 4: return 'text-glow-red';
      default: return '';
    }
  };

  return (
    <div className={`${getBgStyle()} border ${getColorStyle()} border-2 rounded-lg p-6`}>
      <div className="text-center">
        <div className="text-sm text-gray-400 font-mono mb-2">LIVE THREAT CLASSIFICATION</div>
        <div className={`text-3xl font-bold ${getColorStyle()} ${getGlowClass()} ${!reducedMotion ? 'animate-pulse' : ''}`}>
          LEVEL {threatLevel}
        </div>
        <div className={`text-xl font-mono mt-2 ${getColorStyle()}`}>
          {classification.name}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-4 h-4 rounded ${
                level <= threatLevel 
                  ? level <= 1 ? 'bg-cyber-green' : level <= 2 ? 'bg-cyber-amber' : 'bg-cyber-red'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

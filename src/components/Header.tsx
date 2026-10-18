import React, { useState, useEffect } from 'react';
import { Bell, Search, Terminal, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  sessionStatus: 'idle' | 'active' | 'paused' | 'ended';
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, sessionStatus }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (sessionStatus) {
      case 'active':
        return 'text-[var(--color-neon-green)]';
      case 'paused':
        return 'text-[var(--color-amber)]';
      case 'ended':
        return 'text-[var(--color-critical)]';
      default:
        return 'text-[var(--color-text-secondary)]';
    }
  };

  const getStatusText = () => {
    switch (sessionStatus) {
      case 'active':
        return 'ACTIVE';
      case 'paused':
        return 'PAUSED';
      case 'ended':
        return 'OFFLINE';
      default:
        return 'STANDBY';
    }
  };

  return (
    <header className="h-14 bg-[var(--color-bg-panel)] border-b border-[var(--color-border)] flex items-center justify-between px-4 z-10 relative">
      {/* Left: Title */}
      <div className="flex items-center gap-4">
        <Terminal className="w-5 h-5 text-[var(--color-neon-green)]" />
        <div>
          <h1 className="text-sm font-semibold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
            {title}
          </h1>
          <p className="text-[10px] text-[var(--color-text-secondary)] font-mono">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="grep 'query' ..."
            className="input w-full pl-10 text-xs"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] px-1.5 py-0.5 rounded font-mono">
            CTRL+K
          </kbd>
        </div>
      </div>

      {/* Right: Status and Time */}
      <div className="flex items-center gap-4">
        {/* Session Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${sessionStatus === 'active' ? 'bg-[var(--color-neon-green)] animate-pulse-green' : 'bg-[var(--color-text-secondary)]'}`} />
          <span className={`text-xs font-semibold font-mono ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>

        {/* Clock */}
        <div className="text-xs text-[var(--color-text-primary)] font-mono">
          {currentTime.toLocaleTimeString('en-US', { hour12: false })}
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded hover:bg-[var(--color-bg-elevated)] transition-colors">
          <Bell className="w-4 h-4 text-[var(--color-text-secondary)]" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[var(--color-critical)] animate-pulse-green" />
        </button>

        {/* User */}
        <button className="p-2 rounded hover:bg-[var(--color-bg-elevated)] transition-colors">
          <User className="w-4 h-4 text-[var(--color-text-secondary)]" />
        </button>
      </div>
    </header>
  );
};

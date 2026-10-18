import React from 'react';
import {
  LayoutDashboard,
  Activity,
  FileText,
  BarChart3,
  AlertTriangle,
  Shield,
  Settings,
  Clock,
  Eye,
  Zap,
  Brain,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    { id: 'dashboard', label: '/dashboard.sh', icon: LayoutDashboard },
    { id: 'monitoring', label: '/live-monitor.sh', icon: Activity },
    { id: 'incidents', label: '/incident_registry.log', icon: AlertTriangle },
    { id: 'intelligence', label: '/intelligence', icon: Brain },
    { id: 'excuse', label: '/excuse_analyser.py', icon: MessageSquare },
    { id: 'analytics', label: '/analytics', icon: BarChart3 },
    { id: 'reports', label: '/session_reports', icon: FileText },
    { id: 'emergency', label: '/emergency_mode', icon: Zap },
    { id: 'privacy', label: '/privacy_security', icon: Shield },
    { id: 'settings', label: '/system_config', icon: Settings },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 flex h-screen flex-col bg-[var(--color-bg-panel)] border-r border-[var(--color-border)] transition-all duration-300 z-50 ${
        isCollapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* System Header */}
      <div className="p-3 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[var(--color-neon-green)]" />
            {!isCollapsed && (
              <div className="text-xs font-mono text-[var(--color-neon-green)]">
                root@UPNL:~#
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded hover:bg-[var(--color-bg-elevated)] transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)]" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-[var(--color-text-secondary)]" />
            )}
          </button>
        </div>
        {!isCollapsed && (
          <div className="text-[10px] text-[var(--color-text-secondary)] font-mono">
            SYSTEM ACCESS: LOCAL
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`nav-item ${activeView === item.id ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="text-[10px] text-[var(--color-text-secondary)] w-4">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </div>
          );
        })}
      </nav>

      {/* System Footer */}
      <div className="p-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-green)] animate-pulse-green" />
          {!isCollapsed && (
            <span className="text-[10px] text-[var(--color-neon-green)] font-mono">
              OPERATIONAL
            </span>
          )}
        </div>
        {!isCollapsed && (
          <div className="text-[10px] text-[var(--color-text-secondary)] font-mono space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>v1.0.0</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3" />
              <span>LOCAL_ONLY</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

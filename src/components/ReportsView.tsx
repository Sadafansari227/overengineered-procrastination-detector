import React from 'react';
import type { SessionReport as SessionReportType } from '../types';
import { formatTime } from '../utils';
import { Download, Copy, FileText, Terminal } from 'lucide-react';

interface ReportsViewProps {
  report: SessionReportType | null;
  onDownload: () => void;
  onCopySummary: () => void;
  onNewSession: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  report,
  onDownload,
  onCopySummary,
  onNewSession,
}) => {
  if (!report) {
    return (
      <div className="space-y-6 animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
              SESSION_REPORTS
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
              Detailed session summaries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[var(--color-text-secondary)]" />
            <span className="text-xs text-[var(--color-text-secondary)] font-mono">
              NO_DATA
            </span>
          </div>
        </div>

        <div className="panel p-8 text-center">
          <FileText className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] font-mono mb-2">
            NO_SESSION_REPORT
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] font-mono">
            // Complete a session to generate a detailed report
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            SESSION_REPORT
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            {report.sessionId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--color-neon-green)]" />
          <span className="text-xs text-[var(--color-neon-green)] font-mono">
            GENERATED
          </span>
        </div>
      </div>

      {/* Report Header */}
      <div className="panel p-4">
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <div>
            <div className="text-[10px] text-[var(--color-text-secondary)] mb-1">START_TIME</div>
            <div className="text-[var(--color-text-primary)]">{report.startTime}</div>
          </div>
          <div>
            <div className="text-[10px] text-[var(--color-text-secondary)] mb-1">END_TIME</div>
            <div className="text-[var(--color-text-primary)]">{report.endTime}</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="panel p-4">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
            FOCUS_SCORE
          </div>
          <div className={`text-2xl font-bold font-mono ${
            report.focusScore >= 70 ? 'text-[var(--color-neon-green)]' :
            report.focusScore >= 50 ? 'text-[var(--color-amber)]' :
            'text-[var(--color-critical)]'
          }`}>
            {report.focusScore}%
          </div>
        </div>
        <div className="panel p-4">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
            FOCUS_TIME
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-neon-green)]">
            {formatTime(report.totalFocusTime)}
          </div>
        </div>
        <div className="panel p-4">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
            DISTRACTIONS
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-amber)]">
            {report.distractionCount}
          </div>
        </div>
        <div className="panel p-4">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
            INCIDENTS_RESOLVED
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-cyan)]">
            {report.incidentsResolved}
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div className="panel p-6 glow-green">
        <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-3 font-mono">
          FINAL_VERDICT
        </div>
        <div className="text-lg text-[var(--color-text-primary)] italic text-center font-mono">
          "{report.verdict}"
        </div>
      </div>

      {/* Actions */}
      <div className="panel p-4">
        <div className="flex flex-wrap gap-3">
          <button onClick={onDownload} className="btn btn-primary">
            <Download className="w-4 h-4" />
            DOWNLOAD_REPORT
          </button>
          <button onClick={onCopySummary} className="btn btn-secondary">
            <Copy className="w-4 h-4" />
            COPY_SUMMARY
          </button>
          <button onClick={onNewSession} className="btn btn-success">
            <Terminal className="w-4 h-4" />
            NEW_SESSION
          </button>
        </div>
      </div>
    </div>
  );
};

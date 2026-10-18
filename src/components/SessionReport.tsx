import React from 'react';
import type { SessionReport as SessionReportType } from '../types';
import { formatTime } from '../utils';

interface SessionReportProps {
  report: SessionReportType | null;
  onDownload: () => void;
  onCopySummary: () => void;
  onNewSession: () => void;
}

export const SessionReport: React.FC<SessionReportProps> = ({
  report,
  onDownload,
  onCopySummary,
  onNewSession,
}) => {
  if (!report) {
    return (
      <div className="bg-cyber-panel border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-cyber-cyan mb-2">
          SESSION REPORT
        </h2>
        <p className="text-sm text-gray-500">
          Complete a session to generate a detailed report.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-bold text-cyber-cyan mb-6">
        SESSION REPORT
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-mono mb-1">SESSION ID</div>
          <div className="text-sm text-cyber-cyan font-mono">{report.sessionId}</div>
        </div>
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-mono mb-1">DURATION</div>
          <div className="text-sm text-gray-200 font-mono">
            {report.startTime} - {report.endTime}
          </div>
        </div>
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-mono mb-1">TOTAL FOCUS TIME</div>
          <div className="text-2xl font-bold text-cyber-green">{formatTime(report.totalFocusTime)}</div>
        </div>
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-mono mb-1">TOTAL DISTRACTION TIME</div>
          <div className="text-2xl font-bold text-cyber-red">{formatTime(report.totalDistractionTime)}</div>
        </div>
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-mono mb-1">FOCUS SCORE</div>
          <div className={`text-2xl font-bold ${report.focusScore >= 70 ? 'text-cyber-green' : report.focusScore >= 50 ? 'text-cyber-amber' : 'text-cyber-red'}`}>
            {report.focusScore}%
          </div>
        </div>
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-mono mb-1">DISTRACTIONS</div>
          <div className="text-2xl font-bold text-cyber-amber">{report.distractionCount}</div>
        </div>
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-mono mb-1">MOST FREQUENT CATEGORY</div>
          <div className="text-sm text-cyber-cyan font-mono">{report.mostFrequentCategory || 'N/A'}</div>
        </div>
        <div className="bg-cyber-dark border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-gray-500 font-mono mb-1">INCIDENTS RESOLVED</div>
          <div className="text-2xl font-bold text-cyber-green">{report.incidentsResolved}</div>
        </div>
      </div>

      <div className="bg-cyber-dark border border-cyber-cyan/50 rounded-lg p-6 mb-6">
        <div className="text-xs text-gray-500 font-mono mb-2">FINAL VERDICT</div>
        <div className="text-lg text-gray-200 italic text-center">
          "{report.verdict}"
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan/30 transition-colors font-mono text-sm"
        >
          DOWNLOAD REPORT (JSON)
        </button>
        <button
          onClick={onCopySummary}
          className="px-4 py-2 bg-cyber-green/20 border border-cyber-green text-cyber-green rounded hover:bg-cyber-green/30 transition-colors font-mono text-sm"
        >
          COPY SUMMARY
        </button>
        <button
          onClick={onNewSession}
          className="px-4 py-2 bg-cyber-amber/20 border border-cyber-amber text-cyber-amber rounded hover:bg-cyber-amber/30 transition-colors font-mono text-sm"
        >
          START NEW SESSION
        </button>
      </div>
    </div>
  );
};

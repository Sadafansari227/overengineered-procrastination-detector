import React from 'react';
import type { SessionMetrics } from '../types';

interface AnalyticsProps {
  metrics: SessionMetrics;
  incidentCategories: Record<string, number>;
  sessionHistory: Array<{ focusScore: number; date: string }>;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  metrics,
  incidentCategories,
  sessionHistory,
}) => {
  const totalIncidents = Object.values(incidentCategories).reduce((sum, count) => sum + count, 0);

  const focusPercentage = metrics.sessionDuration > 0 
    ? (metrics.focusTime / metrics.sessionDuration) * 100 
    : 0;
  const distractionPercentage = metrics.sessionDuration > 0 
    ? (metrics.distractionTime / metrics.sessionDuration) * 100 
    : 0;

  return (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-bold text-cyber-cyan mb-6">
        ANALYTICS
      </h2>

      {sessionHistory.length === 0 && metrics.sessionDuration === 0 ? (
        <div className="text-gray-600 text-center py-8">
          No data available. Complete sessions to see analytics.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Focus vs Distraction Bar Chart */}
          <div>
            <h3 className="text-sm font-mono text-gray-400 mb-3">FOCUS VS DISTRACTION</h3>
            <div className="flex h-8 rounded overflow-hidden bg-cyber-dark">
              <div
                className="bg-cyber-green transition-all duration-500"
                style={{ width: `${focusPercentage}%` }}
              />
              <div
                className="bg-cyber-red transition-all duration-500"
                style={{ width: `${distractionPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs font-mono">
              <span className="text-cyber-green">Focus: {focusPercentage.toFixed(1)}%</span>
              <span className="text-cyber-red">Distraction: {distractionPercentage.toFixed(1)}%</span>
            </div>
          </div>

          {/* Incident Categories */}
          {totalIncidents > 0 && (
            <div>
              <h3 className="text-sm font-mono text-gray-400 mb-3">INCIDENT CATEGORIES</h3>
              <div className="space-y-2">
                {Object.entries(incidentCategories).map(([category, count]) => {
                  const percentage = (count / totalIncidents) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{category}</span>
                        <span className="text-cyber-cyan">{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="h-2 bg-cyber-dark rounded overflow-hidden">
                        <div
                          className="bg-cyber-cyan transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Focus Score Trend */}
          {sessionHistory.length > 0 && (
            <div>
              <h3 className="text-sm font-mono text-gray-400 mb-3">FOCUS SCORE TREND</h3>
              <div className="flex items-end gap-2 h-32 bg-cyber-dark rounded p-4">
                {sessionHistory.slice(-10).map((session, index) => {
                  const height = session.focusScore;
                  const color = height >= 70 ? 'bg-cyber-green' : height >= 50 ? 'bg-cyber-amber' : 'bg-cyber-red';
                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className={`w-full ${color} rounded-t transition-all duration-500`}
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-gray-600">{session.focusScore}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Current Session Performance */}
          {metrics.sessionDuration > 0 && (
            <div>
              <h3 className="text-sm font-mono text-gray-400 mb-3">CURRENT SESSION PERFORMANCE</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cyber-dark border border-gray-700 rounded p-3">
                  <div className="text-xs text-gray-500 mb-1">FOCUS SCORE</div>
                  <div className={`text-xl font-bold ${metrics.focusScore >= 70 ? 'text-cyber-green' : metrics.focusScore >= 50 ? 'text-cyber-amber' : 'text-cyber-red'}`}>
                    {metrics.focusScore}%
                  </div>
                </div>
                <div className="bg-cyber-dark border border-gray-700 rounded p-3">
                  <div className="text-xs text-gray-500 mb-1">DISTRACTIONS</div>
                  <div className="text-xl font-bold text-cyber-amber">
                    {metrics.distractionCount}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

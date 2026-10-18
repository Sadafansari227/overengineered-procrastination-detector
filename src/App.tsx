import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { MonitoringView } from './components/MonitoringView';
import { IncidentsView } from './components/IncidentsView';
import { AnalyticsView } from './components/AnalyticsView';
import { IntelligenceView } from './components/IntelligenceView';
import { EmergencyView } from './components/EmergencyView';
import { ExcuseView } from './components/ExcuseView';
import { ReportsView } from './components/ReportsView';
import { PrivacyView } from './components/PrivacyView';
import { SettingsView } from './components/SettingsView';
import { BootSequence } from './components/BootSequence';
import {
  generateIncidentId,
  generateEventId,
  formatTimestamp,
  calculateFocusScore,
  calculateThreatLevel,
  generateSessionVerdict,
  saveToLocalStorage,
  loadFromLocalStorage,
} from './utils';
import type { SessionState, SessionReport as SessionReportType, Incident, ActivityEvent } from './types';

const initialState: SessionState = {
  status: 'idle',
  startTime: null,
  elapsed: 0,
  threatLevel: 0,
  metrics: {
    focusTime: 0,
    distractionTime: 0,
    distractionCount: 0,
    focusScore: 100,
    sessionDuration: 0,
    productivityStreak: 0,
  },
  events: [],
  incidents: [],
  soundEnabled: false,
  reducedMotion: false,
  emergencyMode: false,
  emergencyTimer: 0,
};

export default function App() {
  const [savedData] = useState(() => loadFromLocalStorage());
  const [state, setState] = useState<SessionState>(() => ({
    ...initialState,
    incidents: savedData?.incidents ?? initialState.incidents,
    soundEnabled: savedData?.soundEnabled ?? initialState.soundEnabled,
    reducedMotion: savedData?.reducedMotion ?? initialState.reducedMotion,
    status: savedData?.sessionStatus ?? initialState.status,
    startTime: savedData?.startTime ?? initialState.startTime,
    elapsed: savedData?.elapsed ?? initialState.elapsed,
    metrics: savedData?.metrics ?? initialState.metrics,
  }));
  const [sessionReport, setSessionReport] = useState<SessionReportType | null>(null);
  const [sessionHistory, setSessionHistory] = useState<Array<{ focusScore: number; date: string }>>(
    () => savedData?.sessionHistory ?? []
  );
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const handleBootComplete = useCallback(() => setShowBootSequence(false), []);

  // Hide boot sequence after animation
  useEffect(() => {
    const bootTimer = setTimeout(() => setShowBootSequence(false), 2500);
    return () => clearTimeout(bootTimer);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const dataToSave = {
      incidents: state.incidents,
      sessionHistory,
      soundEnabled: state.soundEnabled,
      reducedMotion: state.reducedMotion,
      sessionStatus: state.status,
      startTime: state.startTime,
      elapsed: state.elapsed,
      metrics: state.metrics,
    };
    saveToLocalStorage(dataToSave);
  }, [state.incidents, sessionHistory, state.soundEnabled, state.reducedMotion, state.status, state.startTime, state.elapsed, state.metrics]);

  // Session timer
  useEffect(() => {
    if (state.status === 'active') {
      const interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          elapsed: prev.elapsed + 1,
          metrics: {
            ...prev.metrics,
            sessionDuration: prev.metrics.sessionDuration + 1,
            focusTime: prev.metrics.focusTime + 1,
            focusScore: calculateFocusScore(
              prev.metrics.focusTime + 1,
              prev.metrics.distractionTime
            ),
          },
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.status]);

  // Update threat level based on metrics
  useEffect(() => {
    const newThreatLevel = calculateThreatLevel(
      state.metrics.distractionCount,
      state.elapsed
    );
    setState((prev) => ({ ...prev, threatLevel: newThreatLevel }));
  }, [state.metrics.distractionCount, state.elapsed]);

  const addEvent = useCallback((message: string, type: ActivityEvent['type']) => {
    const event: ActivityEvent = {
      id: generateEventId(),
      timestamp: formatTimestamp(),
      message,
      type,
    };
    setState((prev) => ({
      ...prev,
      events: [...prev.events, event].slice(-50),
    }));
  }, []);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleStartSession = () => {
    setState((prev) => ({
      ...prev,
      status: 'active',
      startTime: Date.now(),
      elapsed: 0,
      metrics: {
        focusTime: 0,
        distractionTime: 0,
        distractionCount: 0,
        focusScore: 100,
        sessionDuration: 0,
        productivityStreak: 0,
      },
      events: [],
    }));
    addEvent('SESSION INITIALISED', 'system');
    addEvent('FOCUS PROTOCOL ENGAGED', 'system');
    setSessionReport(null);
    showNotification('Session started successfully', 'success');
  };

  const handleEndSession = () => {
    const report: SessionReportType = {
      sessionId: generateIncidentId(),
      startTime: state.startTime ? new Date(state.startTime).toLocaleTimeString() : 'N/A',
      endTime: new Date().toLocaleTimeString(),
      totalFocusTime: state.metrics.focusTime,
      totalDistractionTime: state.metrics.distractionTime,
      focusScore: state.metrics.focusScore,
      distractionCount: state.metrics.distractionCount,
      mostFrequentCategory: getMostFrequentCategory(),
      incidentsResolved: state.incidents.filter((i) => i.status === 'RESOLVED').length,
      verdict: generateSessionVerdict(state.metrics.focusScore, state.metrics.distractionCount),
    };

    setSessionHistory((prev) => [
      ...prev,
      { focusScore: state.metrics.focusScore, date: new Date().toISOString() },
    ]);

    setState((prev) => ({
      ...prev,
      status: 'ended',
    }));
    addEvent('SESSION TERMINATED', 'system');
    setSessionReport(report);
    setActiveView('reports');
  };

  const handlePauseSession = () => {
    setState((prev) => ({ ...prev, status: 'paused' }));
    addEvent('SESSION PAUSED', 'system');
  };

  const handleResumeSession = () => {
    setState((prev) => ({ ...prev, status: 'active' }));
    addEvent('SESSION RESUMED', 'system');
  };

  const handleResetSession = () => {
    if (confirm('Are you sure you want to reset the current session? All progress will be lost.')) {
      setState((prev) => ({
        ...prev,
        status: 'idle',
        startTime: null,
        elapsed: 0,
        metrics: initialState.metrics,
        events: [],
        threatLevel: 0,
      }));
      addEvent('SESSION RESET', 'system');
    }
  };

  const handleRecordDistraction = () => {
    setState((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        distractionTime: prev.metrics.distractionTime + 1,
        distractionCount: prev.metrics.distractionCount + 1,
        focusScore: calculateFocusScore(prev.metrics.focusTime, prev.metrics.distractionTime + 1),
      },
    }));

    const categories = ['UNAUTHORISED REEL CONSUMPTION', 'SUSPICIOUS TAB ACTIVITY', 'ACADEMIC AVOIDANCE', 'TEMPORAL FRAUD'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const severities: Incident['severity'][] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const penalties = [
      'FIVE MINUTES OF FOCUSED STUDY',
      'READ ONE CHAPTER',
      'COMPLETE ONE ASSIGNMENT',
      'REVIEW YOUR NOTES',
      'SUBMIT ONE FORM',
    ];

    const incident: Incident = {
      id: generateIncidentId(),
      timestamp: formatTimestamp(),
      category,
      severity,
      description: 'Distraction detected during active session.',
      penalty: penalties[Math.floor(Math.random() * penalties.length)],
      status: 'PENDING',
    };

    setState((prev) => ({
      ...prev,
      incidents: [...prev.incidents, incident],
    }));

    addEvent(`DISTRACTION DETECTED - ${category}`, 'incident');
    addEvent(`INCIDENT CLASSIFIED: ${category}`, 'incident');
  };

  const handleResolveIncident = (id: string) => {
    setState((prev) => ({
      ...prev,
      incidents: prev.incidents.map((i) =>
        i.id === id ? { ...i, status: 'RESOLVED' } : i
      ),
    }));
    addEvent(`INCIDENT ${id} RESOLVED`, 'user');
  };

  const handleClearEvents = () => {
    setState((prev) => ({ ...prev, events: [] }));
  };

  const handleClearIncidents = () => {
    if (confirm('Are you sure you want to clear all incident history?')) {
      setState((prev) => ({ ...prev, incidents: [] }));
      addEvent('INCIDENT HISTORY CLEARED', 'system');
    }
  };

  const handleExportIncidents = (format: 'json' | 'csv') => {
    const data = state.incidents;
    let content: string;
    let filename: string;
    let type: string;

    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      filename = 'incidents.json';
      type = 'application/json';
    } else {
      const headers = ['ID', 'Timestamp', 'Category', 'Severity', 'Description', 'Penalty', 'Status'];
      const rows = data.map((i) =>
        [i.id, i.timestamp, i.category, i.severity, i.description, i.penalty, i.status].join(',')
      );
      content = [headers.join(','), ...rows].join('\n');
      filename = 'incidents.csv';
      type = 'text/csv';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    addEvent(`INCIDENTS EXPORTED AS ${format.toUpperCase()}`, 'system');
  };

  const handleDownloadReport = () => {
    if (!sessionReport) return;
    const content = JSON.stringify(sessionReport, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-report-${sessionReport.sessionId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    if (!sessionReport) return;
    const summary = `Session ${sessionReport.sessionId}: ${sessionReport.focusScore}% focus score, ${sessionReport.distractionCount} distractions, ${Math.floor(sessionReport.totalFocusTime / 60)}m focus time.`;
    navigator.clipboard.writeText(summary);
    alert('Summary copied to clipboard!');
  };

  const handleNewSession = () => {
    setSessionReport(null);
    handleStartSession();
  };

  const getMostFrequentCategory = (): string => {
    const categories: Record<string, number> = {};
    state.incidents.forEach((i) => {
      categories[i.category] = (categories[i.category] || 0) + 1;
    });
    return Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  };

  const getIncidentCategories = (): Record<string, number> => {
    const categories: Record<string, number> = {};
    state.incidents.forEach((i) => {
      categories[i.category] = (categories[i.category] || 0) + 1;
    });
    return categories;
  };

  const getViewTitle = () => {
    const titles: Record<string, { title: string; subtitle: string }> = {
      dashboard: { title: 'Dashboard', subtitle: 'Overview and quick actions' },
      monitoring: { title: 'Live Monitoring', subtitle: 'Real-time activity feed' },
      incidents: { title: 'Incident Registry', subtitle: 'Manage procrastination incidents' },
      intelligence: { title: 'Procrastination Intelligence', subtitle: 'AI-powered predictions' },
      excuse: { title: 'Excuse Analyser', subtitle: 'Submit your excuses for analysis' },
      analytics: { title: 'Analytics', subtitle: 'Performance insights and trends' },
      reports: { title: 'Session Reports', subtitle: 'Detailed session summaries' },
      emergency: { title: 'Emergency Mode', subtitle: 'Focus timer and alerts' },
      privacy: { title: 'Privacy & Security', subtitle: 'Data handling information' },
      settings: { title: 'Settings', subtitle: 'Application preferences' },
    };
    return titles[activeView] || { title: 'Dashboard', subtitle: '' };
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView
            metrics={state.metrics}
            threatLevel={state.threatLevel}
            sessionStatus={state.status}
            elapsed={state.elapsed}
            onStartSession={handleStartSession}
            onPauseSession={handlePauseSession}
            onResumeSession={handleResumeSession}
            onEndSession={handleEndSession}
            onRecordDistraction={handleRecordDistraction}
            onResetSession={handleResetSession}
            events={state.events}
            onClearEvents={handleClearEvents}
            soundEnabled={state.soundEnabled}
            reducedMotion={state.reducedMotion}
            onToggleSound={() => setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            onToggleReducedMotion={() => setState((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
          />
        );
      case 'monitoring':
        return (
          <MonitoringView
            events={state.events}
            metrics={state.metrics}
            onClearEvents={handleClearEvents}
          />
        );
      case 'incidents':
        return (
          <IncidentsView
            incidents={state.incidents}
            onResolve={handleResolveIncident}
            onDelete={(id) => {
              if (confirm('Delete this incident?')) {
                setState((prev) => ({
                  ...prev,
                  incidents: prev.incidents.filter((i) => i.id !== id),
                }));
                addEvent(`INCIDENT ${id} DELETED`, 'system');
              }
            }}
            onClear={handleClearIncidents}
            onExport={handleExportIncidents}
            onCreate={(incident) => {
              const newIncident: Incident = {
                ...incident,
                id: generateIncidentId(),
                timestamp: formatTimestamp(),
              };
              setState((prev) => ({
                ...prev,
                incidents: [...prev.incidents, newIncident],
              }));
              addEvent(`INCIDENT RECORDED: ${incident.category}`, 'incident');
            }}
          />
        );
      case 'analytics':
        return (
          <AnalyticsView
            metrics={state.metrics}
            incidentCategories={getIncidentCategories()}
            sessionHistory={sessionHistory}
          />
        );
      case 'reports':
        return (
          <ReportsView
            report={sessionReport}
            onDownload={handleDownloadReport}
            onCopySummary={handleCopySummary}
            onNewSession={handleNewSession}
          />
        );
      case 'emergency':
        return (
          <EmergencyView
            isActive={state.emergencyMode}
            onActivate={() => setState((prev) => ({ ...prev, emergencyMode: true }))}
            onDeactivate={() => setState((prev) => ({ ...prev, emergencyMode: false }))}
          />
        );
      case 'intelligence':
        return (
          <IntelligenceView
            elapsedTime={state.elapsed}
            distractionCount={state.metrics.distractionCount}
          />
        );
      case 'excuse':
        return <ExcuseView />;
      case 'privacy':
        return <PrivacyView />;
      case 'settings':
        return (
          <SettingsView
            soundEnabled={state.soundEnabled}
            reducedMotion={state.reducedMotion}
            onToggleSound={() => setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            onToggleReducedMotion={() => setState((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
            onResetSession={handleResetSession}
          />
        );
      default:
        return (
          <DashboardView
            metrics={state.metrics}
            threatLevel={state.threatLevel}
            sessionStatus={state.status}
            elapsed={state.elapsed}
            onStartSession={handleStartSession}
            onPauseSession={handlePauseSession}
            onResumeSession={handleResumeSession}
            onEndSession={handleEndSession}
            onRecordDistraction={handleRecordDistraction}
            onResetSession={handleResetSession}
            events={state.events}
            onClearEvents={handleClearEvents}
            soundEnabled={state.soundEnabled}
            reducedMotion={state.reducedMotion}
            onToggleSound={() => setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
            onToggleReducedMotion={() => setState((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
          />
        );
    }
  };

  const { title, subtitle } = getViewTitle();

  return (
    <>
      {showBootSequence && <BootSequence onComplete={handleBootComplete} />}
      
      <div className="flex min-h-screen bg-[var(--color-bg-primary)]">
        {/* Background Effects */}
        <div className="cyber-grid" />
        <div className="scanline" />
        
        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-20 right-6 z-50 animate-slide-in">
            <div className={`panel p-4 border-2 ${
              notification.type === 'success' ? 'border-[var(--color-neon-green)] glow-green' :
              notification.type === 'error' ? 'border-[var(--color-critical)] glow-critical' :
              'border-[var(--color-cyan)] glow-cyan'
            }`}>
              <div className="text-sm font-mono">
                {notification.message}
              </div>
            </div>
          </div>
        )}
        
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 relative z-10 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Header title={title} subtitle={subtitle} sessionStatus={state.status} />

          <main className="flex-1 p-6 overflow-y-auto">
            {renderView()}
          </main>
        </div>
      </div>
    </>
  );
}

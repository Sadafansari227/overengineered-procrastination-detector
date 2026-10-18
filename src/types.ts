export type ThreatLevel = 0 | 1 | 2 | 3 | 4;

export interface ThreatClassification {
  level: ThreatLevel;
  name: string;
  color: string;
}

export interface SessionMetrics {
  focusTime: number;
  distractionTime: number;
  distractionCount: number;
  focusScore: number;
  sessionDuration: number;
  productivityStreak: number;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  message: string;
  type: 'system' | 'user' | 'incident';
}

export interface Incident {
  id: string;
  timestamp: string;
  category: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  penalty: string;
  status: 'PENDING' | 'RESOLVED';
}

export interface ExcuseAnalysis {
  classification: string;
  threatLevel: string;
  verdict: string;
  confidence: number;
  recommendedAction: string;
  explanation: string;
}

export interface SessionState {
  status: 'idle' | 'active' | 'paused' | 'ended';
  startTime: number | null;
  elapsed: number;
  threatLevel: ThreatLevel;
  metrics: SessionMetrics;
  events: ActivityEvent[];
  incidents: Incident[];
  soundEnabled: boolean;
  reducedMotion: boolean;
  emergencyMode: boolean;
  emergencyTimer: number;
}

export interface SessionReport {
  sessionId: string;
  startTime: string;
  endTime: string;
  totalFocusTime: number;
  totalDistractionTime: number;
  focusScore: number;
  distractionCount: number;
  mostFrequentCategory: string;
  incidentsResolved: number;
  verdict: string;
}

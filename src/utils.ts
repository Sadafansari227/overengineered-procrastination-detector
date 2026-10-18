import type { ThreatClassification, ThreatLevel, ExcuseAnalysis } from './types';

export const THREAT_CLASSIFICATIONS: Record<ThreatLevel, ThreatClassification> = {
  0: { level: 0, name: 'PRODUCTIVE CITIZEN', color: '#00ff88' },
  1: { level: 1, name: 'MINOR DISTRACTION', color: '#ffaa00' },
  2: { level: 2, name: 'SUSPICIOUS TAB ACTIVITY', color: '#ffaa00' },
  3: { level: 3, name: 'ACADEMIC SELF-SABOTAGE', color: '#ff3333' },
  4: { level: 4, name: 'CRITICAL REEL EMERGENCY', color: '#ff3333' },
};

export const generateIncidentId = (): string => {
  const chars = '0123456789ABCDEF';
  let id = 'PD-2026-';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

export const generateEventId = (): string => {
  return `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatTimestamp = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour12: false });
};

export const calculateFocusScore = (focusTime: number, distractionTime: number): number => {
  const total = focusTime + distractionTime;
  if (total === 0) return 100;
  return Math.round((focusTime / total) * 100);
};

export const MOTIVATIONAL_MESSAGES = [
  'YOUR SYLLABUS HAS FILED A MISSING PERSONS REPORT.',
  'THE EXAM IS APPROACHING. YOUR NOTES ARE NOT.',
  'THIS IS NOT A DRILL. IT IS A CONSEQUENCE.',
  'YOUR FUTURE SELF REQUESTS THAT YOU CLOSE THIS TAB.',
  'THE LIBRARY IS OPEN. YOUR TEXTBOOK IS NOT.',
  'FOCUS IS NOT A LIMITED RESOURCE. DISTRACTION IS.',
  'YOUR GPA IS WATCHING. IT IS NOT IMPRESSED.',
  'THE DEADLINE IS NOT A SUGGESTION.',
  'THE SYLLABUS IS REAL. YOUR EXCUSES ARE NOT.',
  'SUCCESS IS NOT ACCIDENTAL. NEITHER IS FAILURE.',
];

export const getRandomMessage = (): string => {
  return MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
};

export const EXCUSE_RULES = [
  {
    patterns: ['instagram', 'facebook', 'twitter', 'tiktok', 'social media', 'scrolling'],
    classification: 'TEMPORAL FRAUD',
    threatLevel: 'QUESTIONABLE',
    verdict: 'Your definition of "two minutes" has been rejected by mathematics.',
    recommendedAction: 'Close the app immediately.',
    baseConfidence: 85,
  },
  {
    patterns: ['motivation', 'inspired', 'creative block', 'not feeling it'],
    classification: 'OPTIMISM WITHOUT EVIDENCE',
    threatLevel: 'MILDLY CONCERNING',
    verdict: 'Motivation is a byproduct of action, not a prerequisite.',
    recommendedAction: 'Start with one small task.',
    baseConfidence: 80,
  },
  {
    patterns: ['3 am', 'midnight', 'night owl', 'later', 'tomorrow', 'not now'],
    classification: 'SUSPICIOUS TIME MANAGEMENT',
    threatLevel: 'ACADEMICALLY CONCERNING',
    verdict: 'Your circadian rhythm does not improve your grades.',
    recommendedAction: 'Schedule actual work hours.',
    baseConfidence: 75,
  },
  {
    patterns: ['intimidating', 'overwhelming', 'too much', 'hard', 'difficult'],
    classification: 'ACADEMIC AVOIDANCE',
    threatLevel: 'MODERATELY THREATENING',
    verdict: 'The syllabus cannot hurt you. Procrastination can.',
    recommendedAction: 'Break tasks into smaller steps.',
    baseConfidence: 82,
  },
  {
    patterns: ['quick break', 'just checking', 'one more', 'five minutes', 'short break'],
    classification: 'DENIAL',
    threatLevel: 'HIGHLY SUSPICIOUS',
    verdict: 'Every "quick break" is a calculated assault on your productivity.',
    recommendedAction: 'Set a timer or commit to working.',
    baseConfidence: 90,
  },
  {
    patterns: ['tired', 'exhausted', 'need rest', 'burnout', 'mental health'],
    classification: 'LEGITIMATE CONCERN (POSSIBLY)',
    threatLevel: 'CONTEXT DEPENDENT',
    verdict: 'Actual rest is productive. Doomscrolling is not.',
    recommendedAction: 'Take intentional rest, not avoidance.',
    baseConfidence: 60,
  },
  {
    patterns: ['not ready', 'need to prepare', 'researching', 'gathering materials'],
    classification: 'PROCRASTINATION IN DISGUISE',
    threatLevel: 'SNEAKY',
    verdict: 'Preparation is important. Perpetual preparation is avoidance.',
    recommendedAction: 'Set a hard deadline for preparation.',
    baseConfidence: 78,
  },
];

export const analyzeExcuse = (text: string): ExcuseAnalysis => {
  const lowerText = text.toLowerCase();
  
  for (const rule of EXCUSE_RULES) {
    for (const pattern of rule.patterns) {
      if (lowerText.includes(pattern)) {
        const confidence = Math.min(100, rule.baseConfidence + Math.floor(Math.random() * 10));
        return {
          classification: rule.classification,
          threatLevel: rule.threatLevel,
          verdict: rule.verdict,
          confidence,
          recommendedAction: rule.recommendedAction,
          explanation: `Pattern matched: "${pattern}" in your excuse. This is a classic ${rule.classification.toLowerCase()} technique.`,
        };
      }
    }
  }

  return {
    classification: 'UNCLASSIFIED NONSENSE',
    threatLevel: 'UNKNOWN',
    verdict: 'Your excuse is so creative that it defies classification.',
    confidence: 50,
    recommendedAction: 'Try being honest with yourself.',
    explanation: 'No known procrastination patterns detected in this excuse.',
  };
};

export const generatePrediction = (elapsedTime: number, _distractionCount: number): string => {
  const predictions = [
    `${Math.floor(Math.random() * 20) + 70}% chance of opening another tab in ${Math.floor(Math.random() * 60) + 10} seconds.`,
    'Your mouse is approaching the entertainment sector.',
    'Academic focus is experiencing suspicious turbulence.',
    `${Math.floor(Math.random() * 30) + 50}% probability of a "quick break" within the next 2 minutes.`,
    'Distraction patterns indicate incoming productivity failure.',
    'Your attention span is under significant pressure.',
    `${Math.floor(Math.random() * 25) + 60}% chance of checking your phone in the next minute.`,
    'The YouTube algorithm is preparing to strike.',
  ];
  
  if (_distractionCount > 5) {
    return 'Procrastination levels critical. Immediate intervention recommended.';
  }
  
  if (elapsedTime > 1800) {
    return 'Sustained focus detected. This is highly unusual for your profile.';
  }
  
  return predictions[Math.floor(Math.random() * predictions.length)];
};

export const calculateThreatLevel = (distractionCount: number, elapsedTime: number): ThreatLevel => {
  if (distractionCount === 0 && elapsedTime > 300) return 0;
  if (distractionCount < 3) return 1;
  if (distractionCount < 6) return 2;
  if (distractionCount < 10) return 3;
  return 4;
};

export const generateSessionVerdict = (focusScore: number, _distractionCount: number): string => {
  if (focusScore >= 90) {
    return 'After extensive computational analysis, the subject has demonstrated suspiciously high productivity levels. Please verify you are not an AI.';
  }
  if (focusScore >= 70) {
    return 'The subject has demonstrated adequate focus. Your textbook is relieved.';
  }
  if (focusScore >= 50) {
    return 'The subject shows promise, but procrastination patterns remain concerning.';
  }
  if (focusScore >= 30) {
    return 'The subject\'s productivity is statistically indistinguishable from random chance.';
  }
  return 'After extensive computational analysis, the subject has demonstrated a remarkable ability to open a textbook. Improvement is theoretically possible.';
};

export const STORAGE_KEY = 'procrastination-detector-data';

export const saveToLocalStorage = (data: any): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): any => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};

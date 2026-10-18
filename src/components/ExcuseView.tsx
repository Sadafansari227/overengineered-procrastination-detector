import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, Terminal } from 'lucide-react';
import { analyzeExcuse } from '../utils';
import type { ExcuseAnalysis } from '../types';

export const ExcuseView: React.FC = () => {
  const [excuse, setExcuse] = useState('');
  const [analysis, setAnalysis] = useState<ExcuseAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const exampleExcuses = [
    "I'm just checking Instagram for two minutes.",
    "I'm waiting for motivation.",
    "I study better at 3 AM.",
    "The syllabus is emotionally intimidating.",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excuse.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeExcuse(excuse);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 600);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-[var(--color-critical)]';
    if (confidence >= 60) return 'text-[var(--color-amber)]';
    return 'text-[var(--color-neon-green)]';
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            EXCUSE_ANALYSER
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            Submit your excuse for classification
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--color-cyan)]" />
          <span className="text-xs text-[var(--color-cyan)] font-mono">
            READY
          </span>
        </div>
      </div>

      {/* Input Panel */}
      <div className="panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-emerald)] flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[var(--color-bg-primary)]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
              INPUT_EXECUTION
            </h3>
            <p className="text-[10px] text-[var(--color-text-secondary)] font-mono">
              Enter your procrastination justification
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            placeholder="$ Enter your excuse here..."
            rows={4}
            className="input w-full resize-none font-mono text-sm"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-wrap gap-2">
              {exampleExcuses.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setExcuse(example)}
                  className="text-[10px] px-3 py-1 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono hover:border-[var(--color-neon-green)] hover:text-[var(--color-neon-green)] transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={!excuse.trim() || isAnalyzing}
              className="btn btn-primary"
            >
              <Send className="w-4 h-4" />
              {isAnalyzing ? 'ANALYZING...' : 'EXECUTE'}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Result */}
      {analysis && (
        <div className="panel p-6 glow-green animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-[var(--color-cyan)]" />
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] font-mono uppercase tracking-wider">
              ANALYSIS_OUTPUT
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-4">
              <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
                CLASSIFICATION
              </div>
              <div className="text-lg font-bold text-[var(--color-amber)] font-mono">
                {analysis.classification}
              </div>
            </div>
            <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-4">
              <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
                THREAT_LEVEL
              </div>
              <div className="text-lg font-bold text-[var(--color-critical)] font-mono">
                {analysis.threatLevel}
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-4 mb-4">
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
              CONFIDENCE_SCORE
            </div>
            <div className="flex items-center gap-4">
              <div className={`text-3xl font-bold font-mono ${getConfidenceColor(analysis.confidence)}`}>
                {analysis.confidence}%
              </div>
              <div className="flex-1">
                <div className="progress-bar h-2">
                  <div
                    className={`progress-fill ${getConfidenceColor(analysis.confidence).replace('text-', 'bg-')}`}
                    style={{ width: `${analysis.confidence}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-[10px] text-[var(--color-text-secondary)] mt-2 font-mono">
              * Heuristic estimate, not scientifically validated
            </div>
          </div>

          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] p-4 mb-4">
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
              SYSTEM_VERDICT
            </div>
            <div className="text-lg text-[var(--color-text-primary)] italic text-center font-mono">
              "{analysis.verdict}"
            </div>
          </div>

          <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-4 mb-4">
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
              RECOMMENDED_ACTION
            </div>
            <div className="text-[var(--color-neon-green)] font-semibold font-mono">
              {analysis.recommendedAction}
            </div>
          </div>

          <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] p-4">
            <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
              EXPLANATION
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] font-mono leading-relaxed">
              {analysis.explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

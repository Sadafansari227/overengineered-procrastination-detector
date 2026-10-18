import React, { useState, useEffect } from 'react';

const BOOT_STEPS = [
  'INITIALIZING LOCAL ENVIRONMENT',
  'LOADING PRODUCTIVITY MODULES',
  'INITIALIZING TELEMETRY',
  'PRIVACY MODE ENABLED',
  'COMMAND CENTER READY',
];

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [steps, setSteps] = useState<Array<{ text: string; status: 'pending' | 'success' }>>(() =>
    BOOT_STEPS.map((text) => ({ text, status: 'pending' as const }))
  );

  useEffect(() => {
    let currentStep = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const advance = () => {
      if (currentStep >= BOOT_STEPS.length) {
        timeout = setTimeout(onComplete, 500);
        return;
      }

      const completedStep = currentStep;
      currentStep += 1;
      setSteps((previous) =>
        previous.map((step, index) =>
          index === completedStep ? { ...step, status: 'success' } : step
        )
      );
      timeout = setTimeout(advance, 400);
    };

    timeout = setTimeout(advance, 400);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[var(--color-bg-primary)] flex items-center justify-center z-50 font-mono">
      <div className="w-full max-w-lg p-8">
        <div className="text-center mb-8">
          <div className="text-2xl text-[var(--color-neon-green)] font-bold mb-2 animate-pulse-green">
            PROCRASTINATION DETECTOR
          </div>
          <div className="text-xs text-[var(--color-text-secondary)]">
            INITIALIZING SYSTEM...
          </div>
        </div>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4 text-sm">
              <span className={step.status === 'success' ? 'text-[var(--color-neon-green)]' : 'text-[var(--color-amber)]'}>
                {step.status === 'success' ? '[OK]' : '[..]'}
              </span>
              <span className={step.status === 'success' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}>
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

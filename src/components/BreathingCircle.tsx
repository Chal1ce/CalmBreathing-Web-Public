import React, { useState, useEffect } from 'react';
import { Wind } from 'lucide-react';

interface BreathingCircleProps {
  isEnglish: boolean;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({ isEnglish }) => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');

  const texts = {
    inhale: {
      zh: '吸气',
      en: 'Inhale'
    },
    hold: {
      zh: '屏息',
      en: 'Hold'
    },
    exhale: {
      zh: '呼气',
      en: 'Exhale'
    },
    start: {
      zh: '点击开始',
      en: 'Click to Start'
    }
  };

  useEffect(() => {
    if (!isBreathing) {
      setPhase('idle');
      return;
    }

    const breathingCycle = () => {
      setPhase('inhale');
      setTimeout(() => {
        setPhase('hold');
        setTimeout(() => {
          setPhase('exhale');
        }, 3000);
      }, 3000);
    };

    const interval = setInterval(breathingCycle, 10000);
    breathingCycle();

    return () => clearInterval(interval);
  }, [isBreathing]);

  const getCircleClass = () => {
    const baseClass = "absolute w-full h-full rounded-full transform blur-sm";
    
    switch (phase) {
      case 'inhale':
        return `${baseClass} transition-transform duration-[3000ms] ease-[cubic-bezier(0.4,0,0.2,1)] scale-100`;
      case 'hold':
        return `${baseClass} transition-transform duration-[3000ms] ease-linear scale-100`;
      case 'exhale':
        return `${baseClass} transition-transform duration-[4000ms] ease-[cubic-bezier(0.8,0,0.6,1)] scale-75`;
      case 'idle':
      default:
        return `${baseClass} scale-75`;
    }
  };

  const getMessage = () => {
    if (phase === 'idle' || !isBreathing) {
      return isEnglish ? texts.start.en : texts.start.zh;
    }
    switch (phase) {
      case 'inhale':
        return isEnglish ? texts.inhale.en : texts.inhale.zh;
      case 'hold':
        return isEnglish ? texts.hold.en : texts.hold.zh;
      case 'exhale':
        return isEnglish ? texts.exhale.en : texts.exhale.zh;
      default:
        return isEnglish ? texts.start.en : texts.start.zh;
    }
  };

  // 生成波浪圆环
  const renderRipples = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="absolute inset-0"
        style={{
          animation: isBreathing ? `ripple 3s ease-out infinite ${i * 1000}ms` : 'none',
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="absolute w-full h-full"
        >
          <circle
            cx="100"
            cy="100"
            r="45"
            fill="none"
            stroke="url(#rippleGradient)"
            strokeWidth="1"
            className={`origin-center ${
              phase === 'inhale'
                ? 'animate-ripple-expand'
                : phase === 'exhale'
                ? 'animate-ripple-contract'
                : ''
            }`}
            style={{
              opacity: isBreathing ? 0.5 : 0,
              transition: 'opacity 0.3s',
            }}
          />
        </svg>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-96 h-96">
        <div className="absolute inset-0 w-full h-full">
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="rippleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="rgb(192, 132, 252)" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
          {renderRipples()}
        </div>

        <button
          onClick={() => setIsBreathing(!isBreathing)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full flex items-center justify-center cursor-pointer"
        >
          <div className={`${getCircleClass()} bg-gradient-to-r from-blue-400 to-purple-400 opacity-20`} />
          <div className={`${getCircleClass()} bg-gradient-to-r from-blue-400 to-purple-400 opacity-15 delay-75`} />
          <div className={`${getCircleClass()} bg-gradient-to-r from-blue-400 to-purple-400 opacity-10 delay-150`} />
          
          <div className="relative z-10 text-center">
            <Wind className={`w-12 h-12 mx-auto mb-2 transition-transform duration-[3000ms] ${phase === 'inhale' ? 'scale-110' : phase === 'exhale' ? 'scale-90' : 'scale-100'}`} />
            <span className="text-lg font-medium">{getMessage()}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BreathingCircle;
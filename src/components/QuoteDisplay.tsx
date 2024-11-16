import React, { useState, useEffect } from 'react';

const quotes = [
  {
    zh: "生活中不是缺少美，而是缺少发现美的眼睛",
    en: "Life is not lacking in beauty, but in the eyes to discover it"
  },
  {
    zh: "保持冷静，继续前进",
    en: "Keep calm and carry on"
  },
  {
    zh: "慢慢来，比较快",
    en: "Slow and steady wins the race"
  },
  {
    zh: "深呼吸，一切都会好起来",
    en: "Take a deep breath, everything will be alright"
  },
  {
    zh: "此刻的平静，是最好的礼物",
    en: "The peace of this moment is the greatest gift"
  },
  {
    zh: "让心灵去旅行",
    en: "Let your spirit wander free"
  },
  {
    zh: "保持简单，保持快乐",
    en: "Keep it simple, stay happy"
  },
  {
    zh: "每一个今天都是崭新的开始",
    en: "Each today is a new beginning"
  },
  {
    zh: "相信自己，你比想象中更强大",
    en: "Believe in yourself, you are stronger than you think"
  },
  {
    zh: "困难是暂时的，坚持是永恒的",
    en: "Challenges are temporary, perseverance is eternal"
  },
  {
    zh: "微笑面对生活，生活会回馈你更多笑容",
    en: "Smile at life, and life will smile back at you"
  },
  {
    zh: "勇敢追梦，全力以赴",
    en: "Chase your dreams with courage and dedication"
  },
  {
    zh: "今天的汗水是明天的彩虹",
    en: "Today's effort is tomorrow's rainbow"
  },
  {
    zh: "生命中最美好的事物都是免费的",
    en: "The best things in life are free"
  },
  {
    zh: "用心生活，静待花开",
    en: "Live mindfully, wait for your flowers to bloom"
  }
];

interface QuoteDisplayProps {
  isEnglish: boolean;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ isEnglish }) => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl">
      <p className="text-lg italic">
        "{isEnglish ? currentQuote.en : currentQuote.zh}"
      </p>
    </div>
  );
};

export default QuoteDisplay;
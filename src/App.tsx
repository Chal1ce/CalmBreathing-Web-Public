import React, { useState } from 'react';
import { Moon, Sun, Volume2, VolumeX, Languages } from 'lucide-react';
import BreathingCircle from './components/BreathingCircle';
import AudioPlayer from './components/AudioPlayer';
import QuoteDisplay from './components/QuoteDisplay';
import BackgroundSelector from './components/BackgroundSelector';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  const texts = {
    title: {
      zh: "寻找内心的平静",
      en: "Find Inner Peace"
    },
    subtitle: {
      zh: "让我们一起放松身心，找回内心的宁静",
      en: "Let's relax and find tranquility within"
    },
    breathingTitle: {
      zh: "呼吸练习",
      en: "Breathing Exercise"
    },
    breathingSubtitle: {
      zh: "跟随圆圈的节奏，进行深呼吸",
      en: "Follow the circle's rhythm for deep breathing"
    },
    footer: {
      zh: "记住，每一次呼吸都是重新开始的机会",
      en: "Remember, each breath is a chance to begin again"
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50 text-slate-800'
    }`}>
      <nav className="fixed top-0 right-0 p-4 flex gap-4">
        <button
          onClick={() => setIsEnglish(!isEnglish)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle language"
        >
          <Languages className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle sound"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {isEnglish ? texts.title.en : texts.title.zh}
          </h1>
          <p className="text-lg opacity-75">
            {isEnglish ? texts.subtitle.en : texts.subtitle.zh}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <section className="space-y-6">
            <BreathingCircle isEnglish={isEnglish} />
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                {isEnglish ? texts.breathingTitle.en : texts.breathingTitle.zh}
              </h2>
              <p className="opacity-75">
                {isEnglish ? texts.breathingSubtitle.en : texts.breathingSubtitle.zh}
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <AudioPlayer isMuted={isMuted} isEnglish={isEnglish} />
            <BackgroundSelector isEnglish={isEnglish} />
            <QuoteDisplay isEnglish={isEnglish} />
          </section>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full p-4 text-center opacity-75 text-sm">
        <p>{isEnglish ? texts.footer.en : texts.footer.zh}</p>
      </footer>
    </div>
  );
}

export default App;
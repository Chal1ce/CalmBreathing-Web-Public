import React, { useEffect, useRef, useState } from 'react';
import { Volume2, AlertCircle } from 'lucide-react';

interface AudioPlayerProps {
  isMuted: boolean;
  isEnglish?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isMuted, isEnglish = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSound, setCurrentSound] = useState('rain');
  const [error, setError] = useState(false);

  const sounds = {
    rain: 'https://actions.google.com/sounds/v1/weather/rain_on_roof.ogg',
    waves: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
    forest: 'https://actions.google.com/sounds/v1/weather/forest_wind_summer.ogg'
  };

  const texts = {
    title: {
      zh: "环境音效",
      en: "Ambient Sounds"
    },
    loadError: {
      zh: "音频加载失败",
      en: "Audio loading failed"
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      
      const playAudio = async () => {
        try {
          setError(false);
          if (!isMuted) {
            await audioRef.current?.play();
          } else {
            audioRef.current?.pause();
          }
        } catch (err) {
          setError(true);
          console.error('Audio playback failed:', err);
        }
      };

      playAudio();
    }
  }, [isMuted, currentSound]);

  const handleSoundChange = (soundName: string) => {
    setCurrentSound(soundName);
    setError(false);
  };

  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-lg">
      <h2 className="text-xl font-semibold mb-4">
        {isEnglish ? texts.title.en : texts.title.zh}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {Object.entries(sounds).map(([name]) => (
          <button
            key={name}
            onClick={() => handleSoundChange(name)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentSound === name
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>

      <audio
        ref={audioRef}
        src={sounds[currentSound as keyof typeof sounds]}
        loop
        preload="auto"
        className="hidden"
      />

      {error && (
        <div className="text-red-500">
          {isEnglish ? texts.loadError.en : texts.loadError.zh}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
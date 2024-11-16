import React from 'react';

interface BackgroundSelectorProps {
  isEnglish: boolean;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ isEnglish }) => {
  const texts = {
    title: {
      zh: "选择背景氛围",
      en: "Choose Background"
    }
  };

  const backgrounds = [
    {
      name: {
        zh: '山间晨雾',
        en: 'Mountain Mist'
      },
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba'
    },
    {
      name: {
        zh: '平静海面',
        en: 'Calm Sea'
      },
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b'
    },
    {
      name: {
        zh: '森林小径',
        en: 'Forest Path'
      },
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e'
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h3 className="text-lg font-medium mb-4">
        {isEnglish ? texts.title.en : texts.title.zh}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {backgrounds.map((bg) => (
          <button
            key={bg.name.en}
            className="group relative aspect-video overflow-hidden rounded-lg"
            onClick={() => document.body.style.backgroundImage = `url(${bg.url})`}
          >
            <img
              src={`${bg.url}?auto=format&fit=crop&w=300&q=80`}
              alt={isEnglish ? bg.name.en : bg.name.zh}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm">
                {isEnglish ? bg.name.en : bg.name.zh}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundSelector;
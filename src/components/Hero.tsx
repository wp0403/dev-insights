'use client';

import { useState, useEffect, useRef } from 'react';
import ParticleBackground from './ParticleBackground'

export default function Hero() {
  const [text, setText] = useState('');
  const fullText = '分享 Web 开发、编程技巧和最佳实践';
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        setText(currentText);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1b26] to-[#24283b] overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto relative text-center space-y-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            DevInsights
          </h1>
          <div className="h-12 flex items-center justify-center">
            <p className="text-2xl text-gray-300 flex items-center">
              {text}
              <span className="inline-block w-[2px] h-[1.2em] ml-1 bg-gray-300 animate-blink self-center" />
            </p>
          </div>
          <div 
            className={`transform transition-all duration-1000 mt-12 ${
              showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <button
              onClick={() => {
                if (heroRef.current) {
                  const heroHeight = heroRef.current.offsetHeight;
                  window.scrollTo({
                    top: heroHeight,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-full hover:shadow-lg transition-all duration-200 hover:scale-105 transform shadow-md"
            >
              查看文章
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
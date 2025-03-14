'use client';

import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  inHeroArea?: boolean;
}

export default function ThemeToggle({ inHeroArea = false }: ThemeToggleProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 检查系统主题偏好
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }

      // 从 localStorage 恢复用户的主题选择
      const theme = localStorage.getItem('theme');
      if (theme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  // 根据是否在Hero区域内决定图标颜色
  const iconColorClass = inHeroArea 
    ? 'text-white' 
    : 'text-gray-800 dark:text-gray-200';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        inHeroArea ? 'hover:bg-white/[0.16]' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      aria-label={darkMode ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {darkMode ? (
        <svg
          className={`w-5 h-5 ${iconColorClass}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className={`w-5 h-5 ${iconColorClass}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
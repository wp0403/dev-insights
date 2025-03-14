'use client';

import { useState, useEffect } from 'react';

interface PostStatsDisplayProps {
  slug: string;
}

interface Stats {
  views: number;
  likes: number;
}

// 创建一个自定义事件系统，用于在组件间通信
type StatsUpdateListener = (slug: string) => void;
const listeners: StatsUpdateListener[] = [];

// 触发统计数据更新事件
export const triggerStatsUpdate = (slug: string) => {
  listeners.forEach(listener => listener(slug));
};

// 注册统计数据更新事件监听器
export const registerStatsUpdateListener = (listener: StatsUpdateListener) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// 只读版本的PostStats组件，用于在列表页显示统计信息
// 不会触发浏览量增加，也不允许点赞操作
export default function PostStatsDisplay({ slug }: PostStatsDisplayProps) {
  const [stats, setStats] = useState<Stats>({ views: 0, likes: 0 });
  const [loading, setLoading] = useState(true);

  // 获取文章统计数据，并监听更新事件
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/stats?slug=${slug}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('获取统计数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    // 立即获取一次数据
    fetchStats();
    
    // 注册事件监听器，当收到更新事件时刷新数据
    const unregister = registerStatsUpdateListener((updatedSlug) => {
      if (updatedSlug === slug) {
        fetchStats();
      }
    });
    
    // 设置定时器，每30秒刷新一次数据，作为备用机制
    const intervalId = setInterval(fetchStats, 30000);
    
    // 组件卸载时清除定时器和事件监听器
    return () => {
      clearInterval(intervalId);
      unregister();
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
        <span>加载中...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span>{stats.views}</span>
      </div>

      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{stats.likes}</span>
      </div>
    </div>
  );
}
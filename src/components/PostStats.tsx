'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { triggerStatsUpdate } from './PostStatsDisplay';

interface PostStatsProps {
  slug: string;
}

interface Stats {
  views: number;
  likes: number;
}

export default function PostStats({ slug }: PostStatsProps) {
  const [stats, setStats] = useState<Stats>({ views: 0, likes: 0 });
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // 从本地存储中获取点赞状态
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    setLiked(!!likedPosts[slug]);
  }, [slug]);

  // 获取文章统计数据
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

    fetchStats();
  }, [slug]);

  // 记录浏览量
  useEffect(() => {
    const recordView = async () => {
      try {
        const response = await fetch('/api/stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug, action: 'view' }),
        });
        
        if (response.ok) {
          // 触发统计数据更新事件，通知其他组件刷新数据
          triggerStatsUpdate(slug);
          // 更新当前组件的统计数据
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('记录浏览量失败:', error);
      }
    };

    recordView();
  }, [slug]);

  // 处理点赞/取消点赞
  const handleLike = async () => {
    const action = liked ? 'unlike' : 'like';
    
    try {
      const response = await fetch('/api/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, action }),
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setLiked(!liked);
        
        // 保存点赞状态到本地存储
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        if (liked) {
          delete likedPosts[slug];
        } else {
          likedPosts[slug] = true;
        }
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        
        // 触发统计数据更新事件，通知其他组件刷新数据
        triggerStatsUpdate(slug);
      }
    } catch (error) {
      console.error('更新点赞状态失败:', error);
    }
  };

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
          className="h-5 w-5"
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
        <span>{stats.views} 次浏览</span>
      </div>

      <button
        onClick={handleLike}
        className="flex items-center gap-1 transition-colors hover:text-[var(--text-primary)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill={liked ? "currentColor" : "none"}
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
        <span>{stats.likes} 次点赞</span>
      </button>
    </div>
  );
}
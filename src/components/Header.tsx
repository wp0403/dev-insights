'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isOverHero, setIsOverHero] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const initializeObserver = () => {
      const heroElement = document.querySelector('#hero')
      if (!heroElement) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          // 当 header 与 hero 重叠超过 80% 时，认为在 hero 区域内
          setIsOverHero(entry.intersectionRatio > 0.8)
        },
        {
          threshold: [0.8],
          rootMargin: '-64px 0px 0px 0px' // 考虑 header 的高度
        }
      )

      observer.observe(heroElement)
      return observer
    }

    // 等待 DOM 完全加载
    const timer = setTimeout(() => {
      const observer = initializeObserver()
      return () => observer?.disconnect()
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [pathname]) // 添加 pathname 依赖，确保路由变化时重新初始化

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-[8px] border-b transition-colors duration-300 ${
        isOverHero
          ? 'bg-[#1a1b26]/30 border-white/[0.08]'
          : 'bg-white/70 dark:bg-[#1a1b26]/70 border-[var(--border-color)]'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto h-16 flex items-center justify-between">
          <Link
            href="/"
            className={`text-xl font-bold transition-colors duration-300 ${
              isOverHero ? 'text-white' : 'text-[var(--text-primary)]'
            }`}
          >
            DevInsights
          </Link>
          <div className={`rounded-full transition-colors duration-300 ${
            isOverHero ? 'bg-white/[0.08] hover:bg-white/[0.16]' : ''
          }`}>
            <ThemeToggle inHeroArea={isOverHero} />
          </div>
        </div>
      </div>
    </header>
  )
}
'use client';

import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import SearchBar from '@/components/SearchBar'
import TagFilter from '@/components/TagFilter'
import Hero from '@/components/Hero'
import PostStatsDisplay from '@/components/PostStatsDisplay'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 获取所有标签
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    allPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // 根据搜索和标签筛选文章
  const filteredPosts = useMemo(() => {
    return allPosts
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
      .filter(post => {
        // 搜索过滤
        const matchesSearch = searchQuery === '' || 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase())

        // 标签过滤
        const matchesTags = selectedTags.length === 0 ||
          selectedTags.every(tag => post.tags?.includes(tag))

        return matchesSearch && matchesTags
      })
  }, [searchQuery, selectedTags])

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Hero />
      <div id="articles" className="container mx-auto px-4 py-16 pt-[calc(4rem+64px)]">
        <div className="max-w-3xl mx-auto">
          <div className="min-h-screen bg-[var(--bg-primary)]">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">博客文章</h2>
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              
              <TagFilter tags={allTags} selectedTags={selectedTags} onTagClick={handleTagClick} />
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="mt-12 space-y-8">
                {filteredPosts.map((post) => (
                  <Link key={post._id} href={post.url} className="block">
                    <article className="p-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[var(--text-link)] transition-all duration-300 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">{post.title}</h2>
                      <p className="text-[var(--text-secondary)] mb-6 line-clamp-2">{post.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {post.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 text-sm rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <PostStatsDisplay slug={post._raw.flattenedPath} />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-center text-[var(--text-secondary)]">没有找到匹配的文章</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

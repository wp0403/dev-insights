import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import PostContent from '@/app/posts/[slug]/PostContent'
import PostStats from '@/components/PostStats'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = await Promise.resolve(params.slug)
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-12">
      <Header />
      <div className="bg-gradient-to-b from-[#1a1b26] to-[#24283b] h-[30vh] pt-16 relative z-0">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-block mt-8 text-gray-300 hover:text-white transition-colors"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <article className="bg-[var(--bg-primary)] rounded-lg shadow-xl p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-[var(--text-secondary)]">
                <time>
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>
            
            <div className="prose dark:prose-invert max-w-none">
              <PostContent code={post.body.code} />
            </div>
            
            <div className="mt-8">
              <PostStats slug={post._raw.flattenedPath} />
            </div>
            
            <footer className="mt-8 pt-8 border-t border-[var(--border-color)]">
              <Link
                href="/"
                className="text-[var(--text-link)] hover:underline"
              >
                ← 返回首页
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </div>
  )
}
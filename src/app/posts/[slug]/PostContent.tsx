'use client';

import { useMemo } from 'react';
import { getMDXComponent } from 'next-contentlayer/hooks';

interface PostContentProps {
  code: string;
}

const PostContent = ({ code }: PostContentProps) => {
  const components = {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold text-white">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="mt-8 mb-4 text-2xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="mt-8 mb-4 text-xl font-bold text-white">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="mt-8 mb-4 text-lg font-bold text-white">{children}</h4>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 leading-7 text-gray-300">{children}</p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="mb-4 ml-8 list-disc text-gray-300">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="mb-4 ml-8 list-decimal text-gray-300">{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }: { src: string; alt: string }) => (
      <img src={src} alt={alt} className="rounded-lg" />
    ),
    pre: ({ children, ...props }: { children: React.ReactNode }) => {
      return (
        <pre
          {...props}
          className="mb-4 overflow-x-auto rounded-lg bg-[#0d1117] p-4 [&>code]:!bg-transparent"
        >
          {children}
        </pre>
      );
    },
    code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
      const isInline = !className;
      return isInline ? (
        <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-sm text-gray-200">
          {children}
        </code>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  const MDXContent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <article className="prose prose-lg prose-invert max-w-none [&_pre]:!bg-[#0d1117]">
      <MDXContent components={components} />
    </article>
  );
};

export default PostContent;
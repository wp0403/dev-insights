import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] py-8 border-t border-[var(--border-color)]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[var(--text-secondary)] text-sm">
                © {new Date().getFullYear()} DevInsights. 保留所有权利.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-link)] text-sm">
                首页
              </Link>
              <Link href="/#articles" className="text-[var(--text-secondary)] hover:text-[var(--text-link)] text-sm">
                文章
              </Link>
              <a 
                href="https://github.com/wp0403" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--text-link)] text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
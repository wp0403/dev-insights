export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-[#1a1b26] to-[#24283b] h-[40vh] flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            我的博客
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            分享前端开发、React、TypeScript 等技术文章
          </p>
        </div>
      </div>
    </div>
  );
} 
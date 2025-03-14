import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const statsFilePath = path.join(process.cwd(), 'src/data/stats.json');

// 读取统计数据
function readStats() {
  try {
    const data = fs.readFileSync(statsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // 如果文件不存在或内容为空，返回初始结构
    return { posts: {} };
  }
}

// 写入统计数据
function writeStats(stats: any) {
  try {
    fs.writeFileSync(statsFilePath, JSON.stringify(stats, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('写入统计数据失败:', error);
    return false;
  }
}

// 获取文章统计数据
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  const stats = readStats();
  
  if (slug) {
    // 如果指定了slug，返回特定文章的统计数据
    const postStats = stats.posts[slug] || { views: 0, likes: 0 };
    return NextResponse.json(postStats);
  }
  
  // 否则返回所有统计数据
  return NextResponse.json(stats);
}

// 更新文章统计数据
export async function POST(request: NextRequest) {
  const { slug, action } = await request.json();
  
  if (!slug || !action) {
    return NextResponse.json(
      { error: '缺少必要参数' },
      { status: 400 }
    );
  }
  
  const stats = readStats();
  
  // 确保该文章的统计数据存在
  if (!stats.posts[slug]) {
    stats.posts[slug] = { views: 0, likes: 0 };
  }
  
  // 根据action更新相应的统计数据
  if (action === 'view') {
    stats.posts[slug].views += 1;
  } else if (action === 'like') {
    stats.posts[slug].likes += 1;
  } else if (action === 'unlike') {
    stats.posts[slug].likes = Math.max(0, stats.posts[slug].likes - 1);
  } else {
    return NextResponse.json(
      { error: '不支持的操作类型' },
      { status: 400 }
    );
  }
  
  // 写入更新后的统计数据
  const success = writeStats(stats);
  
  if (success) {
    return NextResponse.json(stats.posts[slug]);
  } else {
    return NextResponse.json(
      { error: '更新统计数据失败' },
      { status: 500 }
    );
  }
}
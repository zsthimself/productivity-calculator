import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静态导出，兼容 Cloudflare Pages
  reactCompiler: true,
  images: {
    unoptimized: true, // 静态导出需要禁用图片优化
  },
};

export default nextConfig;

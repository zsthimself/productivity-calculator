# productivity-calculator - 全美20+行业专业生产力计算与打卡倒推平台
Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript + Cloudflare Pages

<directory>
src/ - 核心应用源码 (5子目录: app, components, data, lib, types)
src/app/ - Next.js App Router 路由与 pSEO 页面 (3子目录: calculator, [lang], legal)
src/components/ - UI 与计算器核心组件 (1子目录: ui)
src/data/ - 行业静态数据集 (industries.json)
public/ - 静态资源与图片 (1子目录: images)
.agent/memory/ - 子站点独立记忆系统 (4文件: PROJECT.md, CURRENT.md, DECISIONS.md, WORKLOG.md)
</directory>

<config>
next.config.ts - Next.js 静态导出 (output: export) 配置
tailwind.config - Tailwind CSS v4 样式支持
package.json - 依赖管理与 build 脚本
</config>

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md

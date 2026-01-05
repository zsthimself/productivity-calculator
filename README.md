# Productivity Calculator

一个基于 **Next.js 14** 的 pSEO 生产力计算器工具站。

## 特性

- 🎯 **pSEO 架构**：通过 `industries.json` 驱动，自动生成 20+ 行业专属计算器页面
- ⚡ **静态生成 (SSG)**：构建时生成所有页面，极速加载
- 🎨 **精美暗黑 UI**：基于 Tailwind CSS 的现代设计
- 📱 **响应式**：适配桌面和移动端
- 🔍 **SEO 优化**：每个页面自动生成独特的 title 和 description

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # 首页
│   └── calculator/[slug]/  # pSEO 动态路由
├── components/             # 可复用组件
│   ├── Calculator.tsx      # 核心计算器
│   └── IndustryList.tsx    # 行业列表内链
├── data/
│   └── industries.json     # pSEO 数据源（20 个行业）
└── types/
    └── industry.ts         # TypeScript 类型
```

## 添加新行业

只需在 `src/data/industries.json` 中添加一条新记录：

```json
{
  "slug": "your-industry",
  "name": "Your Industry",
  "title": "Your Industry Productivity Calculator",
  "description": "Calculate efficiency for your industry...",
  "inputs": [
    { "label": "Output Metric", "unit": "units", "key": "output", "placeholder": "e.g., 100" },
    { "label": "Input Metric", "unit": "hours", "key": "input", "placeholder": "e.g., 8" }
  ],
  "resultLabel": "Your Productivity",
  "resultUnit": "units/hour",
  "icon": "🎯"
}
```

重新构建后，`/calculator/your-industry` 页面将自动生成。

## 开发规范

本项目遵循 `PROJECT_RULES.md` 中定义的**分形文档结构**：
- 每个目录包含 `_META.md` 描述目录职责和文件清单
- 每个代码文件包含标准头注释 (`@INPUT`, `@OUTPUT`, `@POS`)

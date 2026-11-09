# DECISIONS.md - Site 04 Architectural Decisions

### DEC-001: Physical Therapy 专用计算器三模式解耦
- **背景**: 通用计算器无法满足全美 PT/OT 临床考核及午休扣除需求。
- **决定**: 实现 `PhysicalTherapyCalculator.tsx`，内嵌日常绩效、倒推打卡规划器、Medicare 8分钟换算器三模式。

### DEC-002: On-Page SEO 深度指南组件解耦与多项缺陷手术刀整改
- **背景**: `seo.web.cafe/audit/` 初检评分为 89 分 (B-级)，主要扣分点：
  1. Title 长度 99（模板追加导致超长）；
  2. Description 长度 208（超长被截断）；
  3. 页面无 `<img>` 图片（媒体评分 4/5）；
  4. 正文 621 词（词数偏低，理想区间 1200~1800）；
  5. OpenGraph 缺少 `og:image` 声明。
- **决定**:
  1. 解耦 `src/components/PhysicalTherapySeoContent.tsx`，严守单文件 $\le 800$ 行；
  2. 采用 Next.js `title: { absolute: "Physical Therapy Productivity Calculator | PT & OT" }`（50 字符），规避模板自动追加；
  3. Description 调整为 154 字符（落在 140~160 最佳区间）；
  4. 独立绘制 `public/images/pt-productivity-formula-diagram.svg`（800x400 宽高清零 CLS），补充语义图解与配图；
  5. 扩充 Medicare 定时/非定时代码解析、CMS 混合余数规则、各医疗场景基准表及 6 项权威 FAQ，使全页直出词数增至 1,455 词；
  6. 完整配置 OpenGraph 与 Twitter Card `og-image.png`。

### DEC-003: 04号站同词簇曝光汇流与 301 架构 (Consolidate /calculator/therapy into /calculator/physical-therapy)
- **背景**: GSC 曝光分析与哥飞 SERP 解密确认：
  1. `/calculator/therapy` (132 曝光, 1 点击) 与 `/calculator/physical-therapy` (408 曝光) 竞争同属于 PT/OT 治疗师考核的同一批关键词；
  2. 谷歌 SERP 前 10 名在 `therapy productivity calculator` 与 `physical therapy productivity calculator` 下的竞品完全重合；
  3. 两页面各自声明独立 canonical 造成同站关键词相食（Cannibalization），分散了谷歌 PageRank 权重与曝光。
- **决定**:
  1. 在 `public/_redirects` 部署 Cloudflare Pages 边缘 301 规则：将 `/calculator/therapy` 及其多语言变体永久重定向至 `/calculator/physical-therapy`；
  2. 在 `sitemap.xml` 中剔除 `/calculator/therapy`，避免爬虫抓取重定向链接；
  3. 在 `IndustryList.tsx` 过滤掉 `therapy` 卡片，所有内链直接导流至 `physical-therapy`；
  4. 在 `src/app/calculator/[slug]/page.tsx` 与多语言路由中，为 `slug === "therapy"` 配置 `canonical: /calculator/physical-therapy` 与 `robots: noindex, follow` 双重兜底；
  5. 汇聚 540+ 曝光于单一高权重 98 分页面，合力冲刺美区 Google Top 3。

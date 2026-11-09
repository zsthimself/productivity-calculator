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

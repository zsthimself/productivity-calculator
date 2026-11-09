# WORKLOG.md - Site 04 Engineering Activity Log

## 2026-11-09: On-Page SEO 体检与临床指南手术刀级重构

- **执行概述**:
  - 对标 `seo.web.cafe/audit/` 评分标准，针对 `physical therapy productivity calculator` 核心大词执行深度体检与改版。
- **实施明细**:
  1. 解耦创建 `src/components/PhysicalTherapySeoContent.tsx`（340行），实现单文件行数合规；
  2. 修复 `src/app/calculator/[slug]/page.tsx` 中的 Metadata 标题（50字符）与描述（154字符）；
  3. 新增 `public/images/pt-productivity-formula-diagram.svg` 并在页面直出显式宽高 `<img>` 标签；
  4. 扩充正文词数至 1,455 词，覆盖 Timed vs Untimed CPT 编码与 CMS 混合余数规则；
  5. 补充 6 项高价值 FAQ 并同步至 `generateIndustrySchema` JSON-LD 结构化数据；
  6. 静态构建测试通过（147 个页面 SSG 生成完成，退出码 0）；
  7. 代码与初始 memory 提交为 `60b84b5` 并推流 GitHub master。
- **核验证据**:
  - `python tools/verify_memory_sync.py --site productivity-calculator` -> SYNCED
  - 生产环境实时抓取：Title `Physical Therapy Productivity Calculator | PT & OT` (50 chars), Desc 154 chars, Img 1 SVG, HTML Words 1,455
  - `seo.web.cafe/audit/` 在线复测：**总分 98 / 100 (A · 优秀)**，增幅 ▲ +9 分；Meta 元信息 25/25 满分、图片与媒体 8/8 满分、社交与结构化 10/10 满分、技术与抓取 17/17 满分；4-gram `physical therapy productivity calculator` 登顶全页密度榜 Rank 1（占位密度 1.17%，0 堆砌警告）。

## 2026-11-09: 04号站 /calculator/therapy 301 权重汇流实施

- **执行概述**:
  - 依据 GSC 曝光分析与哥飞 SERP 解密，将 `/calculator/therapy` (132次曝光, 1点击) 301 永久重定向至 98 分王牌页面 `/calculator/physical-therapy`，消除同站关键词相食。
- **实施明细**:
  1. 建立 `public/_redirects` 部署 Cloudflare Pages 边缘 301 规则（包含主站与 zh/es/de/ja 5条规约）；
  2. 清洗 `public/sitemap.xml`，剔除 5 条 therapy 变体，仅保留 canonical 页面；
  3. 更新 `src/components/IndustryList.tsx`，过滤 therapy 冗余卡片，内链 100% 聚焦 physical-therapy；
  4. 升级 `src/app/calculator/[slug]/page.tsx` 与 `src/app/[lang]/calculator/[slug]/page.tsx`，为 therapy 注入 cross-URL canonical (`/calculator/physical-therapy`) 与 `robots: noindex, follow` 兜底；
  5. 静态编译验证通过（147 页面 SSG 100% 成功，`out/_redirects` 确认产出，`out/calculator/therapy.html` 确认带有 noindex 与跨页 canonical）。
- **核验证据**:
  - `python tools/verify_memory_sync.py --site productivity-calculator` -> SYNCED
  - 静态产物验证：`out/_redirects` 包含 5 条 301 规则；`sitemap.xml` 0 条 therapy、10 条 physical-therapy。

# DECISIONS.md - Site 04 Architectural Decisions

### DEC-001: Physical Therapy 专属计算器模式重构
- **背景**: 通用计算器无法承接全美 PT/OT 临床精细工时扣减。
- **决定**: 实现 `PhysicalTherapyCalculator.tsx`，内嵌日有效率、倒打卡规划、Medicare 8分钟换算三模式。

### DEC-002: On-Page SEO 深度体检指标缺陷修复
- **背景**: `seo.web.cafe/audit/` 评分初为 89 分 (B-级)，主要扣分点：
  1. Title 达到 99字符，追溯母版导致过长；
  2. Description 达到 208字符截断；
  3. 页面 `<img>` 图片多媒体仅 4/5；
  4. 词数 621 词，偏低（理想 1200~1800）；
  5. OpenGraph 缺乏 `og:image` 标签。
- **决定**:
  1. 拆分 `src/components/PhysicalTherapySeoContent.tsx`，保持单文件 $\le 800$ 行；
  2. 采用 Next.js `title: { absolute: "Physical Therapy Productivity Calculator | PT & OT" }`（50 字符极简，阻断自动追加）；
  3. Description 改为 154 字符（位于 140~160 黄金区间）；
  4. 引入 `public/images/pt-productivity-formula-diagram.svg`（800x400 零 CLS，图文互证）；
  5. 补充 Medicare 计时/非计时规范、CMS 规则、各大医疗场景标准及 6 组权威 FAQ，使全页文本直达 1,455 词；
  6. 补全 OpenGraph 与 Twitter Card `og-image.png`。

### DEC-003: 04号站同义词大曝光 301 架构合流 (Consolidate /calculator/therapy into /calculator/physical-therapy)
- **背景**: GSC 曝光与 SERP 深度复盘确认：
  1. `/calculator/therapy` (132 曝光, 1 点击) 与 `/calculator/physical-therapy` (408 曝光) 是同一批 PT/OT 治疗师群体的同义关键词；
  2. 哥飞 SERP 前 10 名在 `therapy productivity calculator` 与 `physical therapy productivity calculator` 下的竞品完全重合；
  3. 两个页面并存造成站内关键词自相残杀（Cannibalization），分散了谷歌 PageRank 权重收益。
- **决定**:
  1. 在 `public/_redirects` 部署 Cloudflare Pages 边缘 301 规则：将 `/calculator/therapy` 及各语种永久重定向至 `/calculator/physical-therapy`；
  2. 从 `sitemap.xml` 中移除 `/calculator/therapy`，消除抓取冗余；
  3. 从 `IndustryList.tsx` 中剔除 `therapy` 分类卡片，流量 100% 聚焦至 `physical-therapy`；
  4. 在 `src/app/calculator/[slug]/page.tsx` 动态路由中，为 `slug === "therapy"` 注入 `canonical: /calculator/physical-therapy` 与 `robots: noindex, follow` 双重兜底；
  5. 将 540+ 曝光合并至单一权威 98 分页面，冲刺 Google Top 3。

### DEC-004: /calculator/manufacturing 工业制造全案升级与 On-Page SEO 深度外科手术
- **背景**: 
  1. GSC 表现：`/calculator/manufacturing` 为全站曝光量第 2 大行业页（228 次曝光，1 次点击，平均排名 20.6，紧邻首页门槛）；
  2. 哥飞 SERP 侦察：`manufacturing productivity calculator` 难度 KD 仅 **4.5 · 极易**，竞品平均 On-Page 得分仅 60 分（Top 2 `productivitycalc.com` 仅 55 分/215词；Top 1 `symestic.com` 82 分但全站月流仅 2.7 万）；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D级较差)，因仅有 271 词触发 <300 词硬性惩罚断崖，且缺少专用工具、配图及精准元数据。
- **决定**:
  1. 打造工业级 `ManufacturingCalculator.tsx`（三模式）：工时机器产出率、工厂多班次排产规划、OEE 综合效率（85%标杆），附带一键工单日志复制；
  2. 撰写专业级 `ManufacturingSeoContent.tsx`：嵌入 800x400 零 CLS 矢量图 `manufacturing-productivity-formula.svg`，呈现 OEE 四级基准矩阵、四大行业基准对照、排产数学题实操解答与 6 大 PAA FAQ；
  3. 压缩 Title 至 56 字符，优化 Description 至 152 字符，注入 WebApplication + FAQPage 双重 Schema；
  4. 实测体检复核：总分由 55 D 级飙升至 **99 / 100 A 级卓越**（主题聚焦 100%，Meta/内容/媒体/结构化/抓取全满分）。

### DEC-005: /calculator/labor 人工工时全站第一大曝光词全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/labor` 为全站曝光量第 1 顶级页面（489 次曝光，0 点击，平均排名 26.3，巨大流量空间！）；
  2. 哥飞 SERP 侦察：`labor productivity calculator` 难度 KD 仅 **20.8 · 容易**，SERP Rank 1 `productivitycalc.com`（DR 仅 5，月流仅 33.3K）On-Page 仅 55 D 级且正文仅 215 词，被评为盘面“最薄弱占位”；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 274 词触发 <300 词封顶惩罚，Title 长达 79 字符截断，缺少多媒体配图。
- **决定**:
  1. 研发专业级 `LaborProductivityCalculator.tsx`（三模式）：
     - 模式 1：工时产出率与单位成本（Units/man-hr、产出收入与人工成本比、单件人工成本、基准达成率）；
     - 模式 2：混合工种综合薪资费率模型（资深/中级/初级阶梯配比、团队加权时薪、全职员工创收额、毛利边际）；
     - 模式 3：工时负荷与利用率评估（直接可计费工时 vs 会议行政管理损耗、工时利用率 %、达标缺口小时数推算）。
  2. 撰写高保真权威 SEO 文本 `LaborProductivitySeoContent.tsx`（1,344 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `labor-productivity-formula.svg`；
     - 详尽呈现直接工时 vs 间接工时利用率计算公式；
     - 涵盖软件 SaaS、咨询专业服务、商业建筑、仓储履约、医疗门诊 5 大行业基准矩阵表；
     - 提供物流履约实操工时核算与利用率达标补时算例；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 压缩至 55 字符（`Labor Productivity Calculator | Output & Workforce Rate`），Description 优化至 152 字符黄金区间。

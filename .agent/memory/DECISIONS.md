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


### DEC-006: /calculator/employee 员工人效与人均创收全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/employee` 为全站曝光量第 4 核心行业页（117 次曝光，0 点击，平均排名 29.1，核心主词 `employee productivity calculator` 46 次曝光）；
  2. 哥飞 SERP 侦察：`employee productivity calculator` 难度 KD 仅 **26.6 · 容易**，SERP Top 1 `productivitycalc.com`（DR 仅 5，月流仅 33.3K）正文仅 661 词，内容深度单薄；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 270 词触发 <300 词封顶惩罚，Title 模板溢出达 80+ 字符，缺少专业图解与配图。
- **决定**:
  1. 研发专业高管级 `EmployeeProductivityCalculator.tsx`（三模式）：
     - 模式 1：人均创收与人均利润（Revenue per Employee、Profit per FTE、S&P 500 基准对照）；
     - 模式 2：员工综合成本与 ROI 乘数（Total Loaded Cost、Cost per FTE、ROI Multiplier %）；
     - 模式 3：部门定额与绩效达成率（Department Actual vs Quota、Team Attainment Rate %、绩效评级）。
  2. 撰写专业级权威 SEO 文本组件 `EmployeeProductivitySeoContent.tsx`（1,373 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `employee-productivity-formula.svg`；
     - 提供直接创收公式、全额雇佣成本倍数（1.25x~1.40x）、全美 S&P 500 行业标杆矩阵对照表；
     - 呈现销售、研发、客户支持三大部门量化考核标准与真实案例推演；
     - 详述提升组织人效的 5 大执行策略；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 采用绝对标题 55 字符（`Employee Productivity Calculator | Revenue per Employee`），Description 优化至 147 字符黄金区间。


### DEC-007: /calculator/video-production 视频制作工效与成品分钟预算全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/video-production` 为全站曝光量第 5 核心行业页（96 次曝光，1 次自然点击，平均排名 23.8，核心主词 `video production calculator` 59 次曝光）；
  2. 哥飞 SERP 侦察：`video production calculator` 难度 KD 仅 **29.7 · 容易**，SERP Rank 1 `ubifire.com`（DR 仅 5，月流仅 1.1K）On-Page 仅 65 分，正文仅约 500 词，存在极强上位空位；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 278 词触发 <300 词封顶惩罚，Title 长达 90 字符截断，缺少多媒体配图。
- **决定**:
  1. 研发专业影视制作级 `VideoProductionCalculator.tsx`（三模式）：
     - 模式 1：工时效率与出片率（Finished Minutes、Raw Footage Hours、Editing Hours、Shooting Ratio、Editing Pace）；
     - 模式 2：制作预算与成品分钟成本（Pre-production, Production, Post-production Cost Breakdown、Cost per Finished Minute $/min、Budget Distribution）；
     - 模式 3：交付周期与团队排期（Dedicated Editors、Daily Hours、Revision Buffer Rounds、Calendar Delivery Date）；
     - 支持一键导出 Markdown 制作估算报告。
  2. 撰写专业级权威 SEO 文本组件 `VideoProductionSeoContent.tsx`（1,477 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `video-production-formula.svg`；
     - 详述三大核心算式：Cost per Finished Minute、Shooting Ratio、Turnaround Timeline；
     - 涵盖企业宣传片、商业广告、YouTube 创作者、短视频矩阵 4 大行业基准矩阵表；
     - 提供真实 3 分钟企业宣传片工时与分钟成本算例；
     - 提炼 5 大工程化剪辑提速实战策略；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 架构解耦优化：将大段 JSON-LD Schema 抽取至 `src/lib/industrySchemas.ts`，彻底消除 `page.tsx` 超长风险（由 889 行收敛至 539 行，满足 $\le 800$ 行架构铁律）。
  4. 精调元数据：Title 压缩至 57 字符（`Video Production Calculator | Cost & Turnaround Estimator`），Description 优化至 154 字符黄金区间。


### DEC-008: /calculator/call-center 呼叫中心座席稼动率与排班损耗全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/call-center` 为全站曝光量第 6 核心行业页（67 次曝光，1 次自然点击，平均排名 68.2，核心主词 `call center productivity` 30 次曝光）；
  2. 哥飞 SERP 侦察：`call center productivity calculator` 难度 KD 仅 **25 · 容易**，SERP 前 10 名竞品均为博客长文或 CRM 宣传页，**全场 0/9 拥有当页交互计算器，且 4 家为跳转落地页（含第 1 名 amplifai.com）**，存在巨大功能承接真空；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 269 词触发 <300 词封顶惩罚，Title 超长截断，缺少多媒体配图与专属 WFM 工具。
- **决定**:
  1. 研发专业客服管理级 `CallCenterProductivityCalculator.tsx`（三模式）：
     - 模式 1：座席稼动率与利用率（Agent Occupancy %、Utilization %、Idle Ready Time、Average Handle Time AHT、健康区间评级）；
     - 模式 2：每小时呼叫量与解决效率（Calls Per Hour CPH、First Contact Resolution FCR %、净解决量、基准速度指数）；
     - 模式 3：话务预测排班与损耗模型（Forecast Call Volume、AHT、Target Occupancy、Shrinkage %、净需求 FTE 与毛需求总人数）；
     - 支持一键导出 Markdown WFM 绩效计分卡。
  2. 撰写专业级权威 SEO 文本组件 `CallCenterProductivitySeoContent.tsx`（1,505 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `call-center-productivity-formula.svg`；
     - 详述三大核心算式：Agent Occupancy Rate、Agent Utilization Rate、Gross Headcount Capacity；
     - 涵盖一线客服、电销外呼、二线技术支持、电商全渠道 4 大环境基准矩阵表；
     - 提供真实 50 人客服中心排班与话务容量实操算例；
     - 提炼 5 大精益排班与缩短后处理工时（ACW）策略；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 压缩至 59 字符（`Call Center Productivity Calculator | Agent Occupancy & CPH`），Description 优化至 148 字符黄金区间。


### DEC-009: /calculator/logistics 仓储物流与履约时效全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/logistics` 为全站已产生真实自然点击的核心突破页（31 次曝光，2 次自然点击，CTR 高达 6.5%，平均排名 10.4 位，直逼首页前排门槛！核心主词 `warehouse productivity calculation`、`logistics productivity calculator`）；
  2. 哥飞 SERP 侦察：`logistics productivity calculator` 难度 KD 仅 **23.3 · 容易**，SERP 前 10 名竞品平均 On-Page 得分仅 56 分（4 页不及格），Rank 1 `useworktivity.com`（DR 28，月流 5.1K）On-Page 仅 65 C 级且为**纯跳转落地页（功能不在本页）**，Title 与 H1 均未完整覆盖该词，被评为盘面最薄弱占位；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 263 词触发 <300 词硬封顶，Description 未命中主词，缺专属配图与交互工具。
- **决定**:
  1. 研发专业仓储物流级 `LogisticsProductivityCalculator.tsx`（三模式）：
     - 模式 1：仓储拣选与工时效率（Units Picked/Packed、Direct Labor Hours、Pick Velocity UPH、全美 120 UPH 基准达成率、每千件人工成本）；
     - 模式 2：订单履约周期与吞吐率（Orders Received、SLA Dispatched、Dock-to-Stock Latency、Order Processing Cycle、Same-Day Dispatch %）；
     - 模式 3：车队配送与单票运输成本（Completed Deliveries、Active Drivers、Route Hours、Cost per Stop / Parcel、Driver Hourly Velocity）；
     - 支持一键导出 Markdown 仓储物流 KPI 诊断报告。
  2. 撰写专业级权威 SEO 文本组件 `LogisticsProductivitySeoContent.tsx`（1,462 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `logistics-productivity-formula.svg`；
     - 详述三大核心算式：Units Per Hour (UPH)、Order Cycle Time (OCT)、Cost Per Order (CPO)；
     - 涵盖电商 DTC、3PL 仓储、零售越库、冷链医药 4 大环境基准矩阵表；
     - 提供真实 10,000 单配送中心年省 $210,000 人工成本算例；
     - 提炼 5 大精益仓储优化策略；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 压缩至 57 字符（`Logistics Productivity Calculator | Warehouse & Pick Rate`），Description 优化至 154 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **96 / 100 A 级卓越**（净增 +41 分，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，3-gram 核心主词命中 Rank 1 登顶，占位密度 1.23%）。


### DEC-010: /calculator/cleaning-services 商业清洁与 ISSA 612 工时全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/cleaning-services` 为全站商业服务核心词（41 次曝光，1 次自然点击，平均排名 26.1 位；核心主词 `commercial cleaning time calculator`、`cleaning time calculator`、`cleaning times calculator`）；
  2. 哥飞 SERP 侦察：`commercial cleaning time calculator` 难度 KD **0 · 极易**，SERP 前 10 名竞品 8/10 为非定制泛页面，Rank 1 `commercialcleaningcorp.com` 仅 1,194 词且正文较虚，Rank 6 `thejanitorialstore.com` On-Page 仅 45 分（粗糙不堪，主题聚焦度仅 28%）；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 269 词触发 <300 词硬封顶，Title 长达 82 字符截断，Description 仅 94 字符缺词，缺少专属多媒体与交互工具。
- **决定**:
  1. 研发专业商业保洁级 `CleaningServicesProductivityCalculator.tsx`（三模式）：
     - 模式 1：ISSA 612 面积工时估算器（Cleanable Sq Ft、ISSA 生产率标杆、垃圾与布草换算、所需保洁工时、排班人数倒推）；
     - 模式 2：保洁团队流速分析（Total Square Footage、Actual Work Hours、Crew Size、Realized Sq Ft/Hour Rate、ISSA 标杆达成率）；
     - 模式 3：商业保洁合同成本与报价模型（Monthly Hours、Loaded Wage Rate、Chemical & Supply Cost %、Equipment Depreciation、Overhead & Profit Margin、Monthly Contract Fee、Price per Sq Ft）；
     - 提供四大经典场景预设（标准企业办公室、高频门诊诊所、K-12学校教学楼、轻工业仓储基地），支持一键导出 Markdown 保洁测算报告。
  2. 撰写专业级权威 SEO 文本组件 `CleaningServicesProductivitySeoContent.tsx`（1,400+ 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `cleaning-productivity-formula.svg`；
     - 详述三大核心算式：ISSA 612 Cleaning Time Formula、Crew Velocity Rate、Contract Bidding Price；
     - 涵盖企业办公室、医疗门诊、学校走廊、高频卫生间、工业仓库 5 大环境 ISSA 612 基准矩阵表；
     - 提供真实 25,000 平方英尺甲级写字楼月度 $5,250 保洁投标测算案例；
     - 提炼 5 大精益商业清洁提升工效策略（背负式吸尘器、四色微纤维、团队流水作业、精准稀释配比、IoT 流量感应）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 压缩至 57 字符（`Commercial Cleaning Time Calculator | ISSA Production Rates`），Description 优化至 157 字符黄金区间。
  4. 重构 `src/app/calculator/[slug]/page.tsx`：抽象 `buildMeta` 通用工厂函数，消除 280+ 行重复元数据样板代码，单文件行数由 744 行降至 552 行，坚决守牢 $\le 800$ 行安全红线。

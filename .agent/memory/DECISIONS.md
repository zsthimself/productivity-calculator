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
  5. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **99 / 100 A 级卓越**（净增 +44 分，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，4-gram 核心主词命中 Rank 1 登顶，占位密度 1.28%）。


### DEC-011: /calculator/healthcare 医疗卫生与临床运营全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/healthcare` 为全站已产生真实自然点击的核心突破页（26 次曝光，1 次自然点击，平均排名 29.2 位；核心主词 `healthcare productivity calculator`、`healthcare productivity`、`physician productivity calculator`）；
  2. 哥飞 SERP 侦察：`healthcare productivity calculator` 难度 KD **18.4 · 极易**，SERP 前 10 名竞品 Rank 1 `productivitycalc.com`（DR 仅 5，正文仅 661 词），Rank 3 `theproductivitycalculator.com` On-Page 仅 55 D 级（粗糙不堪，正文仅 205 词），Rank 4 为应用商店 App 占位（证明极度刚需，Web 纯前端无需安装具天然平替优势），全盘 7/8 结果当页承接；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 262 词触发 <300 词硬封顶，Description 未命中主词，缺少专属多媒体与临床专用工具。
- **决定**:
  1. 研发专业医疗临床级 `HealthcareProductivityCalculator.tsx`（三模式）：
     - 模式 1：医生与门诊医师 wRVU 生产力模型（CMS 医保相对价值单位、年度/月度 wRVU 目标、出诊天数、单 wRVU 薪酬换算系数、MGMA 25%/50%/75%/90% 分位标杆对照）；
     - 模式 2：住院部护理 HPPD 与病房排班模型（总有效工时 RN+LPN+CNA、午夜在院患者普查人数、Nurse-to-Patient 护患比、全美标准 HPPD 达标率与过载告警）；
     - 模式 3：门诊接诊负荷与爽约率模型（排定接诊号源、爽约/取消率、医生有效接诊时数、每小时接诊人次、单次接诊均摊收入与爽约漏损分析）；
     - 提供四大经典临床预设（全科门诊诊所、住院部普外科病房、重症监护室 ICU、多专科日间手术中心），支持一键导出 Markdown 医疗 KPI 报告。
  2. 撰写专业级权威 SEO 文本组件 `HealthcareProductivitySeoContent.tsx`（1,400+ 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `healthcare-productivity-formula.svg`；
     - 详述三大核心算式：wRVU 医生考核公式、住院护理 HPPD 算式、门诊接诊流速方程；
     - 涵盖全科门诊、住院普外、重症 ICU、急诊科 ED、外科手术室 5 大医疗场景 MGMA / ANA 基准表；
     - 提供真实 30 床普外科住院病房排班纠偏算例；
     - 提炼 5 大精益医疗人效策略（环境 AI 抄写、敏捷分诊排班、多学科快速出院晨会、自动化多渠道防爽约）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 压缩至 59 字符（`Healthcare Productivity Calculator | wRVU & HPPD Benchmark`），Description 优化至 158 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **98 / 100 A 级卓越**（净增 +43 分，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，3-gram 核心主词命中 Rank 1 登顶，占位密度 1.02%）。

### DEC-012: /calculator/welding 工业焊接与金属构件制造全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/welding` 为全站已产生真实自然点击的第 10 个高潜力突破页（16 次曝光，1 次自然点击，平均排名 41.3 位；核心主词 `welding productivity` 4次曝光、`welder productivity per day` 1次曝光）；
  2. 哥飞 SERP 侦察：`welding productivity calculator` 难度 KD **24 · 容易**，SERP 前 10 名竞品整体较弱：Rank 2 `esab.com` On-Page 仅 45 D 级（粗糙，主题聚焦度仅 15%），Rank 6 `theproductivitycalc.com`（DR 仅 5，正文虚），Rank 8 `scribd.com` 仅为 PDF 空壳占位，Rank 9 `app.aws.org` 为深层子工具；盘面 4/6 结果当页承接；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 269 词触发 <300 词硬封顶，Description 部分覆盖，0 张配图，缺少专用工业焊接计算套件。
- **决定**:
  1. 研发专业焊接与构件制造级 `WeldingProductivityCalculator.tsx`（三模式）：
     - 模式 1：AWS 熔敷率与电弧持续率模型（Gross Deposition Rate、Deposition Efficiency 85%–93%、Arc-On Operating Factor 20%–50%、Effective Deposition Rate lbs/hr、班次熔敷总量）；
     - 模式 2：焊缝几何体积与焊丝消耗量模型（角焊缝 Fillet Leg Size 或对接焊缝 Single-V Bevel Angle、焊缝延米/英尺总长、钢材密度 0.2833 lbs/in³、净填充焊缝截面重量、毛坯焊丝采购量）；
     - 模式 3：构件组焊人工与单英尺成本模型（焊工小时全包工资、焊枪行走速度 IPM、焊丝/保护气单耗、单英尺组焊成本 $/ft、工时与人工成本占比）；
     - 提供四大工业预设（建筑钢结构立柱 5/16"、重型工业管道单V坡口、薄板钣金机箱 3/16"、厚板桥梁板梁 3/8"），支持一键导出 Markdown 焊接作业单报告。
  2. 撰写专业级权威 SEO 文本组件 `WeldingProductivitySeoContent.tsx`（1,400+ 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `welding-productivity-formula.svg`；
     - 详述三大核心算式：AWS Deposition Model、Joint Volume Model、Shop Economic Linear Foot Cost；
     - 涵盖 GMAW/MIG、FCAW 药芯、SMAW 焊条、SAW 埋弧、GTAW/TIG 5 大工艺 AWS 基准对照表；
     - 提供真实 300 延尺 5/16" 钢结构梁柱焊条转药芯省工案例（单班次节省 $615、节约 12 人工工时）；
     - 提炼 5 大精益焊接工效策略（连续药芯焊丝、变位机平焊消除仰立焊、散装桶装焊丝减少换盘、角焊缝规防过焊、数字电弧监控）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 压缩至 57 字符（`Welding Productivity Calculator | Deposition Rate & AWS`），Description 优化至 160 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **99 / 100 A 级卓越**（净增 +44 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，3-gram `welding productivity calculator` 命中 Top 4，占位密度 0.72%）。

### DEC-013: /calculator/technician 汽车售后维修与外勤工程全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现：`/calculator/technician` 为全站汽车与设备工程服务核心突破页（48 次曝光，平均排名 38.8 位；核心主词 `technician productivity` 4次曝光、`technician efficiency calculator` 3次曝光、`service technician productivity` 2次曝光）；
  2. 哥飞 SERP 侦察：`technician productivity calculator` 难度 KD 仅 **8 · 极易**，SERP 前 10 名竞品极其脆弱：Rank 1 `carguysinc.com`（DR 仅 13，月流 6.5K，On-Page 仅 75 C，仅 376 词），Rank 3 `fullbay.com`（45 D 级纯跳转落地页），Rank 6 `productivitycalc.com`（DR 仅 5，拿物理治疗页面乱占位，On-Page 仅 65 C，661 词）；盘面完全属于未被充分满足的价值洼地；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 271 词触发 <300 词硬封顶，Description 部分覆盖，0 张配图，缺少专属汽车 NADA 定额工时与外勤 Wrench Time 计算引擎。
- **决定**:
  1. 研发专业技师工效级 `TechnicianProductivityCalculator.tsx`（三模式）：
     - 模式 1：NADA 汽车定额工时与工效效率模型（Billed/Flat-Rate Hours、Clocked Job Hours、Available Shift Hours、Efficiency 效率比、Labor Productivity 调度利用率、Proficiency 综合创效能力、大师技师评级）；
     - 模式 2：外勤工程与厂区运维 Wrench Time 模型（班次工时、直接扳手工时、路途通勤时长、行政/领料配单耗时、完工工单量、单单均耗与对标世界级 Lean 舰队 55%+ 判定）；
     - 模式 3：售后车间工时创收与有效毛利模型（客户门市工时牌价 $/hr、技师包干工资 $/hr、周产出结算工时、配件工时配比系数、周工时总毛利与毛利率 %）；
     - 提供四大工业预设（4S店诊断大师技师 130%、重卡商用车车队维修、暖通商用外勤服务车、综合汽修厂），支持一键导出 Markdown 技师考核单报告。
  2. 撰写专业级权威 SEO 文本组件 `TechnicianProductivitySeoContent.tsx`（1,400+ 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `technician-productivity-formula.svg`；
     - 详述三大核心算式：Automotive Flat-Rate Efficiency、Labor Productivity、Wrench Time Equation；
     - 涵盖 4S店大师、重卡柴油、商用暖通、厂区 MRO、电信外勤 5 大行业 NADA / AFE 标杆对照表；
     - 提供真实 6 车位综合汽修厂工效从 80% 提升至 110% 案例（单车位周增毛利 $1,452，全厂月增 $34,848）；
     - 提炼 5 大精益技师管理策略（提前配料、双工位轮换、数字车辆检测 DVI、阶梯定额提成、路径集约化调度）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 压缩至 58 字符（`Technician Productivity Calculator | Efficiency & Hours`），Description 优化至 156 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **99 / 100 A 级卓越**（净增 +44 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 25/25，内容 19/19，媒体 8/8，结构化 10/10，抓取 17/17，3-gram `#1 technician productivity calculator` 出现 4 次，占位密度 0.8%，独占 Rank 1 登顶，0 堆砌告警）。

### DEC-014: /calculator/machine 机械设备与自动化生产线全案升级、OEE 综合效率与 Schema 架构模块化解耦
- **背景**:
  1. GSC 表现：`/calculator/machine` 累计斩获 123 次真实曝光（英语 92 次 + 西语 28 次 + 葡语 3 次），主词 `productivity machine` 43 次曝光、`productividad de las maquinas` 26 次曝光、`machine productivity calculator` 平均排名 50.5 位；
  2. 哥飞 SERP 侦察：`machine productivity calculator` 难度 KD 仅 **11.4 · 极易**，SERP 前 10 名竞品极其脆弱：Rank 1 `machinemetrics.com`（DR 66，On-Page 仅 83 B，纯跳转落地页，功能不在本页，未完整覆盖该词），Rank 3 `productivitycalc.com`（错配 Therapist 页面，65 C 级），Rank 4 `fullbay.com`（45 D 级），全盘前 10 平均分仅 61 分，3 个不及格；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 268 词触发 <300 词硬伤封顶，缺配图与专属 OEE 设备计算引擎；
  4. 架构预防性治理：原 `src/lib/industrySchemas.ts` 膨胀至 768 行逼近 800 行安全红线。
- **决定**:
  1. 架构解耦重构：在 `src/lib/schemas/` 建立微模块架构（`meta.ts` + `faqs/` 独立行业文件），将主入口 `industrySchemas.ts` 从 768 行优雅瘦身至 76 行，彻底消灭单文件膨胀坏味道；
  2. 研发专业设备工效级 `MachineProductivityCalculator.tsx`（三模式）：
     - 模式 1：OEE 全面设备效率模型（Availability 可用率 × Performance 表现指数 × Quality 质量指数，85%+ 世界级标杆对照）；
     - 模式 2：Cycle Time 循环周期与 Takt Time 生产节拍模型（节拍差额、小时净产出率、班次合格品产能）；
     - 模式 3：设备综合产能与停机损失模型（主轴运转率 %、停机工时直接制造费用浪费、产能损失件数与每周营业额缺口）；
     - 提供四大工业预设（5轴 CNC 切削、高速精密注塑、SMT 表面贴装、重型五金冲压），支持一键导出 Markdown 生产报表。
  3. 撰写专业级权威 SEO 文本组件 `MachineProductivitySeoContent.tsx`（1,500+ 词全页）：
     - 嵌入 800x400 零 CLS 矢量图 `machine-productivity-formula.svg`；
     - 详述三大核心算式：OEE Multiplier、Cycle Time vs Takt Time、Unplanned Downtime Waste；
     - 涵盖 5 大离散制造行业 TPM 基准对照表；
     - 提供真实 8 台 CNC 立加部门 OEE 从 62% 提升至 84% 案例（月增利润 $48,600）；
     - 提炼 5 大精益 TPM 设备管理策略（SMED 快速换模、消灭微停顿、全员自主点检、节拍平衡、主轴 IIoT 监控）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  4. 精调元数据：Title 锁定 50 字符（`Machine Productivity Calculator | OEE & Cycle Time`），Description 精准压缩至 154 字符黄金区间。
  5. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **98 / 100 A 级卓越**（净增 +43 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，耗时 518ms，体积 140KB，词数 1,528 词，3-gram `#1 machine productivity calculator` 出现 6 次，占位密度 1.18%，独占 Rank 1 登顶，0 堆砌告警）。

### DEC-015: /calculator/construction 建筑工程施工与劳务工效全案升级、班组日流速与 CPI 成本模型
- **背景**:
  1. GSC 表现：`/calculator/construction` 为全站未升级页面中唯一斩获 2 次真实自然点击的硬核工程页（124 次合并曝光，主词 `construction productivity calculation` 7次、`how to measure construction productivity` 6次、`construction productivity rates` 5次，平均排名 39.2 位）；
  2. 哥飞 SERP 侦察：`construction productivity calculator` 难度 KD 仅 **3.5 · 极易**，SERP 前 10 名竞品极其脆弱：全场仅 2/9 为专门页，其余为大站顺路占位（Rank 1 `ciranalytics.com` DR 43 无法体检，Rank 5 `field-pm.com` DR 0 且人均停留仅 25 秒跳出 58% 垫底，Rank 10 `forconstructionpros.com` 页面薄弱）；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 269 词触发 <300 词硬伤封顶，缺配图与专属建筑工程计算引擎。
- **决定**:
  1. 研发专业建筑工程工效级 `ConstructionProductivityCalculator.tsx`（619行）：
     - 模式 1：单位工效与劳务定额模型（Work Units Completed、Total Man-Hours、Physical Output Rate units/mh、Unit Rate mh/unit、8小时工日折算、CII 行业基准效率比判定）；
     - 模式 2：班组日产出速度与工期推演模型（Crew Size、Shift Hours、Daily Crew Man-Hours、Daily Output Velocity、Project Total Scope、Weather/Contingency Buffer %、Buffered Working Days、工期关键路径风险评估）；
     - 模式 3：建筑劳务成本与挣值 CPI 模型（Blended Hourly Wage $/hr 含间接费、Actual Cost AC、Earned Value EV、Cost Variance 成本偏差、Cost Performance Index CPI、Unit Labor Cost $/unit）；
     - 提供四大工程预设（现浇混凝土楼板、钢结构梁柱吊装、商业石膏板隔墙、砌体与砖墙工程），支持一键导出 Markdown 施工日志与工效核算报告。
  2. 撰写专业级权威 SEO 文本组件 `ConstructionProductivitySeoContent.tsx`（307行）：
     - 嵌入 800x400 零 CLS 矢量图 `construction-productivity-formula.svg`；
     - 详述三大核心算式：Labor Output & Unit Rate、Crew Daily Velocity、Earned Value CPI Ratio；
     - 涵盖混凝土、钢结构、砌筑、轻钢龙骨石膏板、MEP管道 5 大分部工程 RSMeans / CII 基准对照表；
     - 提供真实 5 层 12 万平方英尺商用办公楼现浇楼面优化案例（工效从 0.82 提升至 1.18 yd³/mh，抢回 16 天工期，节约 $44,800 直接人工与免除 $28,000 违约罚金）；
     - 提炼 5 大精益建造（Lean Construction）策略（Last Planner System、构件场外预制、JIT现场配送、5S动线整理、防工种交叉打架）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 锁定 56 字符（`Construction Productivity Calculator | Labor & Crew Rate`），Description 精准压缩至 155 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **99 / 100 A 级卓越**（净增 +44 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，耗时 451ms，体积 136KB，词数 1,602 词，3-gram `#1 construction productivity calculator` 出现 5 次，占位密度 0.94%，独占 Rank 1 登顶，0 堆砌告警）。

### DEC-016: /calculator/sales 销售人效与管道流速全案升级、配额达成率与每小时产值模型
- **背景**:
  1. GSC 表现：`/calculator/sales` 为全站未升级页面中最高曝光页（198 次真实曝光，主词 `sales per hour` 52次、`sales productivity` 18次、`sales per hour calculator` 14次，平均排名 44.5 位）；
  2. 哥飞 SERP 侦察：`sales productivity calculator` 难度 KD **27.2 · 容易**，SERP 前 10 名竞品整体虚弱：Rank 1 `pipelineops.com` 人均停留仅 0 秒（第 22 百分位垫底，极度脆弱），Rank 2 `clickup.com` 为大站内页顺路占位，Rank 8/9/10（ZoomInfo, Creatio, Celerant）皆为未命中主词之泛页面；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 264 词触发 <300 词硬伤封顶，缺专属配图与深度销售管道交互计算引擎。
- **决定**:
  1. 研发专业销售运营级 `SalesProductivityCalculator.tsx`（717行）：
     - 模式 1：配额达成率与销售产能模型（Active Sales Reps、Period Quota per Rep、Actual Closed Team Revenue、Blended Team Ramp Capacity %、Revenue per Rep、Quota Gap / Surplus）；
     - 模式 2：销售管道流速 V 公式模型（Qualified Pipeline Opportunities、Win Rate %、Average Deal Size ACV $、Sales Cycle Length Days、Daily Sales Velocity $/day、Monthly Velocity $/mo、Annualized Run-Rate Pipeline Output、Deals Won / Cycle）；
     - 模式 3：每小时销售产值与薪酬 ROI 模型（Period Revenue、Sales Reps Evaluated、Period Length Weeks、Active Selling Time %、Fully-Loaded Rep Annual Payroll OTE、Gross Sales Per Hour、Active Selling Sales Per Hour、Payroll Multiplier ARR、Payroll-to-Revenue Drag %）；
     - 提供四大 B2B 销售预设（SMB 高流速 SaaS、企业级复杂软件、电话外呼 SDR、咨询顾问大客户），支持一键导出 Markdown 销售复盘与人效核算报告。
  2. 撰写专业级权威 SEO 文本组件 `SalesProductivitySeoContent.tsx`（326行）：
     - 嵌入 800x400 零 CLS 矢量图 `sales-productivity-formula.svg`；
     - 详述三大核心算式：Quota Attainment Rate、Sales Velocity Formula、Sales Per Hour Labor ROI；
     - 涵盖 SMB、Mid-Market、Enterprise、SDR、Agency 5 大销售组织模式之 Bridge Group / Pavilion 基准对照表；
     - 提供真实德州奥斯汀 B2B SaaS 公司 12 名 AE 团队管道流速提升 63.2%、单季增收 $780,000 ARR 实战案例；
     - 提炼 5 大精益收入运营（Lean RevOps）策略（CRM 自动化减负、严格早期 MEDDIC 门禁、多线程决策人拓展、科学梯度爬坡、消除死单沉淀）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 锁定 57 字符（`Sales Productivity Calculator | Velocity & Quota Rate`），Description 精准压缩至 159 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **98 / 100 A 级卓越**（净增 +43 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 25/25，内容 17.5/19，媒体 8/8，结构化 10/10，抓取 17/17，耗时 1007ms，体积 139KB，词数 1,485 词，3-gram `#1 sales productivity calculator` 出现 8 次，占位密度 1.62%，独占 Rank 1 登顶，0 堆砌告警）。

### DEC-017: /calculator/data-entry 数据录入效率与 BPO 成本全案升级、KPH/WPM 转换与每千条记录成本模型
- **背景**:
  1. GSC 表现：`/calculator/data-entry` 合并曝光 152 次，产生 1 次真实自然点击，平均排名 18.3 位；
  2. 哥飞 SERP 侦察：`data entry productivity calculator` 难度 KD **10.7 · 极易**，**震撼发现：本站在谷歌全球 SERP 已稳居 Rank 3**！前两名为 generic 首页或泛工业页面，第 7/8 名为 monday.com 与 getharvest.com 弱相关浮标。升级此页将立即稳固 Rank 1 狙击位；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 267 词触发 <300 词硬伤封顶，缺专属配图与深度数据录入交互计算引擎。
- **决定**:
  1. 研发专业数据录入运营级 `DataEntryProductivityCalculator.tsx`（782行）：
     - 模式 1：KPH 与 Net 净精准度模型（Gross Keystrokes Per Hour、Keying Errors、Error Penalty Multiplier 5x-10x、Shift Hours、Net KPH、Raw Accuracy %、Net Accuracy %、Equivalent WPM、Shift Total Net Keystrokes、Operator Tier）；
     - 模式 2：WPM 与批次流速模型（Gross Typing Speed WPM、Keystrokes per Record、Allocated Hours、Shift Target Batch Quota、Records/hr、Cycle Time per Record、100-Record Batch Time、Attainment %）；
     - 模式 3：每千条记录成本与 BPO 经济性模型（Hourly Loaded Wage $、Records Completed/hr、Monthly Record Volume、QA Error Rework Overhead %、Offshore BPO Benchmark Rate、Unit Cost per 1,000 Records、Direct Cost per Record、Monthly In-House Spend、Monthly Benchmark Total、Variance Analysis）；
     - 提供四大行业标杆预设（CMS-1500 医疗报销账单、电商 SKU 目录录入、财务应付账款与发票 10-Key、法律档案与病历数字化），支持一键导出 Markdown 数据录入审计报告。
  2. 撰写专业级权威 SEO 文本组件 `DataEntryProductivitySeoContent.tsx`（283行）：
     - 嵌入 800x400 零 CLS 矢量图 `data-entry-productivity-formula.svg`；
     - 详述三大核心算式：Net KPH with Error Deduction、Batch Velocity & Records/hr、Unit Economics / 1,000 Records；
     - 涵盖医疗账单、财务应付、电商 SKU、法律档案、物流运单 5 大行业 BPO 录入标杆基准表；
     - 提供真实芝加哥/马尼拉双岸医疗外包中心 38 名录入员千条记录成本从 $265.40 骤降至 $142.10，年省 $172,000 实战案例；
     - 提炼 5 大精益录入策略（正则格式校验掩码、快捷键消灭鼠标依赖、双屏工位工效学、OCR混合预填、分级质量抽检）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 锁定 52 字符（`Data Entry Productivity Calculator | KPH & WPM Rate`），Description 精准压缩至 158 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **97 / 100 A 级卓越**（净增 +42 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 23.5/25，内容 19/19，媒体 8/8，结构化 10/10，抓取 17/17，耗时 380ms，体积 132KB，词数 1,558 词，4-gram `#1 data entry productivity calculator` 出现 6 次，占位密度 1.54%，独占 Rank 1 登顶，0 堆砌告警）。

### DEC-018: /calculator/marketing 营销投资回报率与管道流速全案升级、MROI/LTV:CAC 与每合格商机成本模型
- **背景**:
  1. GSC 表现：`/calculator/marketing` 合并曝光 103 次，平均排名 38.6 位；
  2. 哥飞 SERP 侦察：`marketing productivity calculator` 难度 KD **23.9 · 容易**，前 10 名竞品极其薄弱：Rank 1 `productivitycalc.com`（DR 4 泛首页）、Rank 2 `omnicalculator.com`（DR 83 泛大站，未针对营销关键词定制）、Rank 3 `ripplergroup.outgrow.us`（停留时间 0 秒，极度脆弱）、Rank 7 `theproductivitycalculator.com`（DR 0 骨架站），整体缺乏深度垂直营销人效与管道核算引擎；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 265 词触发 <300 词硬伤封顶，缺专属矢量图与多模式营销投资测算引擎。
- **决定**:
  1. 研发专业增长营销级 `MarketingProductivityCalculator.tsx`（708行）：
     - 模式 1：Marketing ROI 与 LTV:CAC 比率模型（Total Marketing Budget、Attributed Revenue $、Contribution Margin %、Average Customer Lifetime Value LTV、New Customers Acquired、Gross Marketing ROI %、Net MROI %、Blended CAC $、LTV:CAC Ratio、CAC Payback Months）；
     - 模式 2：销售线索流速与漏斗吞吐量模型（Prior Month Leads、Current Month Leads、MQL to SQL Conversion %、SQL to Won Deal %、Average Deal Size ACV $、Lead Velocity Rate LVR %、SQL Pipeline Velocity $/mo、Forecast Closed ARR）；
     - 模式 3：营销人效与每合格商机成本模型（Total Marketing Payroll OTE、Full-Time Marketing Headcount、Contractor & Agency Fees、Sales Qualified Opportunities SQO、Monthly Campaign Hours、Marketing Spend per Headcount、Cost Per Qualified Opportunity CPQO、Marketing Labor Yield $/hr）；
     - 提供四大组织模式预设（B2B 企业级集客、B2C 电商付费投流、产品驱动增长 PLG SaaS、高流速营销代理商外包），支持一键导出 Markdown 营销效能复盘审计报告。
  2. 撰写专业级权威 SEO 文本组件 `MarketingProductivitySeoContent.tsx`（282行）：
     - 嵌入 800x400 零 CLS 矢量图 `marketing-productivity-formula.svg`（三支柱：MROI & LTV:CAC、Pipeline Velocity V、Labor Yield & CPQO）；
     - 详述三大核心算式：Blended Marketing ROI & LTV:CAC、Lead Velocity Rate LVR %、Cost Per Qualified Opportunity CPQO；
     - 涵盖 B2B SaaS、B2C E-Commerce、Enterprise FinTech、Healthcare MedTech、Agency Services 5 大行业营销标杆基准对照表；
     - 提供真实旧金山 MarTech SaaS 公司营销团队季度 MROI 从 142% 提升至 386%、LTV:CAC 跃升至 4.2x、CPQO 从 $1,840 骤降至 $720 实战案例；
     - 提炼 5 大精益增长营销策略（严格 ICP 客户画像门禁、砍掉虚荣顶层流量聚焦高意向内容、自动化打通 CRM/CDP 消除数据孤岛、全漏斗归因权重校准、按合格商机管道激励 SDR）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 锁定 50 字符（`Marketing Productivity Calculator | ROI & CAC Rate`），Description 精准压缩至 154 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **99 / 100 A 级卓越**（净增 +44 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，耗时 401ms，体积 131KB，词数 1,444 词，3-gram `#1 marketing productivity calculator` 出现 8 次，占位密度 1.66%，独占 Rank 1 登顶，0 堆砌告警）。

### DEC-019: /calculator/retail 零售门店工效与空间密度全案升级、SPLH/SPSF/GMROI 与损耗率模型
- **背景**:
  1. GSC 表现：`/calculator/retail` 累计斩获 81 次真实合并曝光；
  2. 哥飞 SERP 侦察：`retail productivity calculator` 难度 KD **2.2 · 极易**，前 10 名竞品整体薄弱：Rank 1 `celerant.com`（DR 70 权重内页）、Rank 2 `productivitycalc.com`（DR 4 泛首页）、Rank 5 `retailtoolkit.app`（DR 0，仅 5 个月新站，停留 0 秒垫底脆弱），Rank 7/8/10（Omni, LiveAbout, Vic Gov）皆为未命中主词之顺路页；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D 级较差)，正文仅 262 词触发 <300 词硬伤封顶，缺专属矢量图与多模式零售门店工效测算引擎。
- **决定**:
  1. 研发专业零售运营级 `RetailProductivityCalculator.tsx`（759行）：
     - 模式 1：Sales Per Labor Hour (SPLH) 与门店人工成本占比模型（Net Weekly Sales, Scheduled Labor Hours, Average Loaded Wage $/hr, Weekly Transactions, SPLH, Total Payroll, Labor Cost %, ATV, Transactions Per Labor Hour TPLH）；
     - 模式 2：Sales Per Square Foot (SPSF) 与营业面积密度模型（Annual Net Sales, Dedicated Selling Space Sq Ft, Gross GLA Sq Ft, Annual Rent & CAM, SPSF Selling, SPSF Gross, Selling Space Ratio %, Occupancy Drag %）；
     - 模式 3：GMROI 与库存周转/损耗率模型（Annual Gross Margin, Average Inventory Cost, COGS, Annual Shrinkage Loss, Raw GMROI, Inventory Turnover, Days of Inventory on Hand DOH, Shrinkage Drag %, Net Adjusted GMROI）；
     - 提供四大行业标杆预设（精品服饰、大型商超/杂货、轻奢旗舰、便利快消），支持一键导出 Markdown 门店工效审计报表。
  2. 撰写专业级权威 SEO 文本组件 `RetailProductivitySeoContent.tsx`（284行）：
     - 嵌入 800x400 零 CLS 矢量图 `retail-productivity-formula.svg`（三支柱：Labor SPLH, Space SPSF, Working Capital GMROI）；
     - 详述三大核心算式：SPLH & Labor Cost %, SPSF Space Yield, GMROI & Shrinkage Drag；
     - 涵盖 Specialty Apparel、Grocery、Luxury Flagship、Big-Box、Convenience 5 大行业 NRF 标杆对照表；
     - 提供真实芝加哥密歇根大道生活方式旗舰店工效提升 43.3%、SPLH 飙升至 $206.73/hr、GMROI 跃升至 3.12x、年增收 $188,400 实战案例；
     - 提炼 5 大精益门店运营策略（客流热力动态排班、移动 mPOS 破除排队跑单、核心动线视觉陈列、RFID 自动化盘点、防损损耗管控）；
     - 注入 6 大权威 PAA FAQ 与 JSON-LD `WebApplication` + `FAQPage` 结构化数据。
  3. 精调元数据：Title 锁定 53 字符（`Retail Productivity Calculator | SPLH & Space Density`），Description 精准压缩至 160 字符黄金区间。
  4. 实测与线上复检：SSG 静态编译 147 页面 100% 成功，生产上线后经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **98 / 100 A 级卓越**（净增 +43 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，耗时 476ms，体积 140KB，词数 1,678 词，3-gram 命中，0 堆砌告警，冲刺谷歌 Top 3）。

### DEC-020: /calculator/agriculture 农业耕作单产与农机作业效率(EFC)全案升级与 On-Page SEO 外科手术
- **背景**:
  1. GSC 表现与 SERP 侦察：`/calculator/agriculture` 累计 84 次真实曝光，哥飞 SERP 侦察显示 KD 仅 **4.7 · 极易**，且我们未经优化的 263 词极简页面已奇迹般排在 **Google 美区搜索结果第 8 名**！
  2. 竞争格局分析：前 10 名中几乎无任何针对农业单产与农机作业效率的专业交互工具（Top 1/2 为政府税收与大学扩展长文，Top 5 为已放弃维护的 DR 0 农场杂项站），完全处于无防御真空带；
  3. 初始基线体检：`seo.web.cafe/audit/` 评分仅 55 分 (D级较差)，正文仅 263 词触发 <300 词硬性惩罚断崖，且缺少专属工具引擎、矢量配图与精准 TDK。
- **决定**:
  1. 研发专业级农业生产力交互组件 `src/components/AgricultureProductivityCalculator.tsx`（737行，严格 $\le 800$ 行）：生物单产与采收工效、ASABE D497 农机作业效率 (EFC) 与柴油消耗率、经营边际与保本单产三模式，内置四大场景预设（爱荷华玉米、堪萨斯旱地小麦、加州有机果蔬、华盛顿商用苹果）与一键 Markdown 审计报告导出；
  2. 撰写专业级权威 SEO 文本组件 `src/components/AgricultureProductivitySeoContent.tsx`（325行，1,533 词）：嵌入 800x400 零 CLS 矢量图 `agriculture-productivity-formula.svg`，呈现 5 大农作物 USDA 标杆对照表、爱荷华 1,500 英亩玉米农场节油与增产实战案例、5 大精益精准农业策略与 6 大 PAA FAQ，并引用 USDA ERS、ASABE D497 与 UN FAO 权威信源；
  3. 解耦扩充结构化数据：创建 `src/lib/schemas/faqs/agriculture.ts` 并注册至 `faqs/index.ts`，在 `meta.ts` 注册专用元数据；
  4. 重构优化 `src/app/calculator/[slug]/page.tsx`（777行，严格守牢 $\le 800$ 行红线）：精炼 Title 59 字符（`Agriculture Productivity Calculator | Yield & Field Capacity`）、Description 158 字符，配置专属 Badge 与 H1；
  5. 静态编译验证通过，147 页面 SSG 构建完成（1.01s），实测产物 HTML 词数达 1,533 词；
  6. 提交 commit `b79cc2d` 推送至 GitHub master，Cloudflare Pages 自动构建上线；
  7. 经 `seo.web.cafe/audit/` 实测体检：总分由 55 D 级飙升至 **98 / 100 A 级卓越**（净增 +43 分，突破 300 词惩罚断崖，主题聚焦 100%，Meta 25/25，内容 24/24，媒体 8/8，结构化 10/10，抓取 17/17，耗时 433ms，体积 140KB，词数 1,533 词，3-gram `#1 agriculture productivity calculator` 独占 Rank 1 登顶，出现 6 次，占位密度 1.17%，0 堆砌告警，狙击谷歌 US Top 1~3）。

# CURRENT.md - Site 04 Local Status & Active Loops

## 当前状态
- **站点版本**: v1.31.0 (新增 `/calculator/billing-units` CMS 8分钟规则与多CPT计费拆分套件)
- **部署环境**: Cloudflare Pages (`productivitycalculator.work`)
- **最近提交**: 原子同步提交 (`TASK-057` / `DEC-031`)
- **核心架构升级**: 基于哥飞 `/serp/` 实测 `billing units calculator` (KD 2.7, #1 DR 4 507词, #5 `theproductivitycalc.com` DR 1 1003词) 新增第 27 个英文专业套件页 `/calculator/billing-units`：交付三模式引擎 (`BillingUnitsCalculator.tsx` 674行)、1,570词深度规则/Excel公式指南 (`BillingUnitsSeoContent.tsx` 335行)、800x400 `billing-units-formula.svg`、`billingUnitsFaqs` 结构化 Schema，并打通首页、`Footer.tsx`、`/calculator/physical-therapy` 双向内链与 32-URL `sitemap.xml`。152 静态页面编译 0 错误。
- **过往合规基座**: 已完成 [src/app/[lang]/page.tsx](file:///d:/projects/sites/productivity-calculator/src/app/[lang]/page.tsx) 与 [src/app/[lang]/calculator/[slug]/page.tsx](file:///d:/projects/sites/productivity-calculator/src/app/[lang]/calculator/[slug]/page.tsx) `robots: noindex, follow` 收口；清理 [sitemap.xml](file:///d:/projects/sites/productivity-calculator/public/sitemap.xml) 为英文 Canonical URL；扩写首页 [src/app/page.tsx](file:///d:/projects/sites/productivity-calculator/src/app/page.tsx) 至 1,350+ 词；完成 [src/lib/calculatorRegistry.tsx](file:///d:/projects/sites/productivity-calculator/src/lib/calculatorRegistry.tsx) 全部 23 组三词逗号堆砌副标题自然句化改造，并在 [src/components/Header.tsx](file:///d:/projects/sites/productivity-calculator/src/components/Header.tsx) 上对默认英文站移除多语言切换器以防将用户导流至 `noindex` 译页。
- **实测验证**: 
  - Static Build (`npm run build`) 147 页面 100% 静态编译通过，0 错误
  - 全部 8 大未升级页面经 `seo.web.cafe/audit/` 实测跑分，**100% 斩获 $\ge 96$ A 级卓越**：
    1. `/calculator/restaurant`: 1,515 词，On-Page SEO **97 A 级**（RevPASH、翻台率、食材损耗模型，SVG 架构图，Rank 1）
    2. `/calculator/software-development`: 1,520 词，On-Page SEO **96 A 级**（DORA 交付流速、Sprint 故事点、人均 ARR 产出模型）
    3. `/calculator/real-estate`: 1,480 词，On-Page SEO **98 A 级**（NAR 佣金分账、带看成交率、时薪产值模型）
    4. `/calculator/education`: 1,510 词，On-Page SEO **98 A 级**（NCES 生师比 STR、生均支出、学费学时收益模型，SERP Rank 3）
    5. `/calculator/customer-support`: 1,535 词，On-Page SEO **99 A 级**（HDI/Zendesk 工单流速 TPH、FCR 首次解决率、单工单成本与 CSAT 模型，SERP Rank 2）
    6. `/calculator/graphic-design`: 1,540 词，On-Page SEO **99 A 级**（AIGA/DMI 工单交付周期 TAT、改稿损耗率、设计师小时产值与利用率模型，SERP Rank 1 登顶）
    7. `/calculator/writing`: 1,525 词，On-Page SEO **96 A 级**（EFA/ASJA 纯写作时钟 WPH、非写作损耗比、千字费率与实际时薪折算模型）
    8. `/calculator/general`: 1,550 词，On-Page SEO **100 A 级满分大满贯**（BLS/OECD 单要素工时产出、柯布道格拉斯 TFP 创新指数、复合要素边际回报模型）

## 活跃任务
- [x] **TASK-001** ~ **TASK-038**: 历史完成的前 18 个行业计算器套件升级与体检卓越验证（详见历史 WORKLOG）
- [x] **TASK-039**: `/calculator/restaurant` 餐饮门店工效全案升级（RevPASH、翻台率、食材损耗模型，commit `89e7957`）
- [x] **TASK-040**: `/calculator/restaurant` 线上体检复核，得分飙升至 **97 / 100 A 级卓越**
- [x] **TASK-041**: `/calculator/software-development` 产研人效全案升级（DORA 交付流速、Sprint 估算、人均 ARR 模型，commit `d37c0c1`）
- [x] **TASK-042**: `/calculator/software-development` 线上体检复核，得分飙升至 **96 / 100 A 级卓越**
- [x] **TASK-043**: `/calculator/real-estate` 房地产经纪人效全案升级（GCI 佣金分账、带看成交率、时薪回报模型，commit `3de69fc`）
- [x] **TASK-044**: `/calculator/real-estate` 线上体检复核，得分飙升至 **98 / 100 A 级卓越**
- [x] **TASK-045**: `/calculator/education` 教育教学工效全案升级（NCES 生师比 STR、生均支出、学费学时收益模型，commit `b73d800`）
- [x] **TASK-046**: `/calculator/education` 线上体检复核，得分飙升至 **98 / 100 A 级卓越**
- [x] **TASK-047**: `/calculator/customer-support` 客服人效全案升级（工单流速 TPH、FCR、单工单成本与 CSAT 模型，commit `ef452bb`）
- [x] **TASK-048**: `/calculator/customer-support` 线上体检复核，得分飙升至 **99 / 100 A 级卓越**
- [x] **TASK-049**: `/calculator/graphic-design` 设计工坊工效全案升级（工单周期、改稿损耗率、小时产值与利用率模型，commit `5b246bf`）
- [x] **TASK-050**: `/calculator/graphic-design` 线上体检复核，得分飙升至 **99 / 100 A 级卓越**（Google SERP Rank 1 登顶）
- [x] **TASK-051**: `/calculator/writing` 内容创作人效全案升级（纯写作 WPH、非写作损耗比、千字费率时薪折算模型，commit `7b6068d`）
- [x] **TASK-052**: `/calculator/writing` 线上体检复核，得分飙升至 **96 / 100 A 级卓越**
- [x] **TASK-053**: `/calculator/general` 全行业通用生产力基准全案升级（单要素工时、柯布道格拉斯 TFP、复合要素边际模型，commit `978bd85`）
- [x] **TASK-054**: `/calculator/general` 线上体检复核，得分飙升至 **100 / 100 A 级满分大满贯**
- [x] **TASK-055**: 修复 `seo.web.cafe/adsense/` 报出的 2 Blocker + 1 High（非英 <500 词译页设 `noindex`、精简 `sitemap.xml` 至 31 条英文精选路由、首页扩写至 1,350+ 词并嵌入 SVG 与基准表、清理营销副标题堆砌），147 页面 `npm run build` 编译 PASS
- [x] **TASK-056**: 清除 `/adsense/` 残留的 `ADS-CONTENT-08` Medium 隐患：重写 [calculatorRegistry.tsx](file:///d:/projects/sites/productivity-calculator/src/lib/calculatorRegistry.tsx) 全部 23 组逗号堆砌副标题，并在 [Header.tsx](file:///d:/projects/sites/productivity-calculator/src/components/Header.tsx) 英文主站导航移除多语言切换器改直链高权重新核心内页，147 页面 `npm run build` 编译 PASS
- [x] **TASK-057**: 基于哥飞 SERP 解密 (`billing units calculator`, KD 2.7, 10/10 内页占位) 新上线第 27 个英文套件页 `/calculator/billing-units`（三模式 CMS/AMA/Excel 计费引擎 + `billing-units-formula.svg` + 1,500+ 词深度指南 + FAQPage Schema + PT 双向内链 + 32 URL `sitemap.xml`），152 页面编译 PASS 并推流上线，即将复测 `/audit/` 与 `/adsense/`

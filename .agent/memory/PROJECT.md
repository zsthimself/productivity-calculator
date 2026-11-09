# PROJECT.md - Productivity Calculator (Site 04)

## 站点定位与业务模型
- **域名**: `https://productivitycalculator.work`
- **定位**: 全美 20+ 垂直行业生产力与绩效换算平台，针对高搜索量长尾词（如 `physical therapy productivity calculator`）进行手术刀级定制。
- **技术栈**: Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript + Cloudflare Pages (静态导出 `output: export`)。
- **流量与变现**:
  - GSC 真实自然曝光：2,640+ Impressions，破零点击。
  - 核心突破口：`/calculator/physical-therapy`（PT / OT / SLP 垂直赛道）。
  - 变现路径：Google AdSense 官方展示广告（`pub-5918682936014293`，已挂载标准 ads.txt 与 0-CLS 广告槽位）。

## 架构规约与工程纪律
- **代码规范**: 单文件行数严守 $\le 800$ 行红线。
- **GEB 协议**: L1/L2/L3 语义同构，三层回环。
- **SOP-09 跨仓库双轨记忆**: 本地 `.agent/memory/` 与根目录总控工作区保持原子同构提交。

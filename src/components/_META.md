# /src/components - 可复用组件库

存放所有可复用的 React 组件。

## 文件清单

| 文件/目录 | 地位/作用 |
|-----------|----------|
| `Calculator.tsx` | 核心计算器组件，使用 shadcn/ui Card/Button/Input/Label |
| `PhysicalTherapyCalculator.tsx` | 物理治疗师专用临床绩效与倒推打卡计算器（支持 85% 绩效达标、Clock-Out Planner 与 Medicare 8-Minute Rule） |
| `BillingUnitsCalculator.tsx` | 医疗与物理治疗 8 分钟计费单元计算器（分钟转单元、多 CPT 余数分拆、单元转工时折算） |
| `BillingUnitsSeoContent.tsx` | 8 分钟规则计费单元深度指南、CMS vs AMA 规则表、Excel 公式与 FAQ |
| `Footer.tsx` | 全局页脚组件，满足 AdSense 审核合规链接、隐私声明与热门行业计算器导流 |
| `Header.tsx` | 顶部导航栏，包含 Logo 与多语言切换器 |
| `HistoryPanel.tsx` | 计算历史记录抽屉面板 |
| `IndustryList.tsx` | 行业列表组件，使用 shadcn/ui Card |
| `LanguageSwitcher.tsx` | 多语言切换下拉组件 |
| `ui/` | shadcn/ui 基础组件库目录（Button, Card, Input, Label, Toggle 等） |

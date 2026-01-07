/**
 * @INPUT: 无 (纯类型定义文件)
 * @OUTPUT: IndustryInput, IndustryData, CalculationMode, IndustryBenchmark, CalculationRecord 接口
 * @POS: 类型定义 - 被 Calculator, IndustryList, pSEO 页面等依赖
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 types/_META.md。
 */

// 计算模式：正向计算生产力、反向计算所需产出、反向计算所需投入
export type CalculationMode = "productivity" | "output" | "input";

// 行业基准数据
export interface IndustryBenchmark {
  average: number;
  good: number;
  excellent: number;
}

// 历史计算记录
export interface CalculationRecord {
  id: string;
  industrySlug: string;
  mode: CalculationMode;
  values: Record<string, number>;
  result: number;
  timestamp: number;
  // 金钱维度 (可选)
  hourlyRate?: number;      // 时薪/单价
  earnings?: number;        // 计算出的收益
  costPerUnit?: number;     // 单位成本
  // 基准功能 (可选)
  isBenchmark?: boolean;    // 是否为基准记录
}

export interface IndustryInput {
  label: string;
  unit: string;
  key: "output" | "input";
  placeholder: string;
}

export interface IndustryData {
  slug: string;
  name: string;
  title: string;
  description: string;
  inputs: IndustryInput[];
  resultLabel: string;
  resultUnit: string;
  icon: string;
  benchmark?: IndustryBenchmark; // 可选的行业基准数据
}

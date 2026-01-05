/**
 * @INPUT: 无 (纯类型定义文件)
 * @OUTPUT: IndustryInput, IndustryData 接口 - 约束 industries.json 结构
 * @POS: 类型定义 - 被 Calculator, IndustryList, pSEO 页面等依赖
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 types/_META.md。
 */
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
}

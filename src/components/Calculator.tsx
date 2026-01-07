/**
 * @INPUT: IndustryData (from types/industry.ts) - 行业配置对象
 * @OUTPUT: Calculator React 组件 - 可交互的生产力计算器 UI
 * @POS: 核心业务组件 - 被首页和所有 pSEO 行业页面复用
 *
 * 功能特性:
 * 1. 双向计算模式 - 支持正向/反向计算
 * 2. 工作时间细化 - 可选扣除休息时间
 * 3. 行业基准对比 - 显示与行业平均水平对比
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 components/_META.md。
 */
"use client";

import { useState, useMemo, useEffect } from "react";
import { IndustryData, CalculationMode } from "@/types/industry";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCalculationHistory } from "@/hooks/useCalculationHistory";
import HistoryPanel from "@/components/HistoryPanel";

interface CalculatorProps {
    industry: IndustryData;
}

// 计算模式配置
const MODE_CONFIG: Record<CalculationMode, {
    label: string;
    description: string;
    formula: string;
}> = {
    productivity: {
        label: "Calculate Productivity",
        description: "Find your productivity rate",
        formula: "Output ÷ Input = Productivity"
    },
    output: {
        label: "Calculate Output",
        description: "Find required output for target",
        formula: "Productivity × Input = Output"
    },
    input: {
        label: "Calculate Input",
        description: "Find required input for target",
        formula: "Output ÷ Productivity = Input"
    }
};

export default function Calculator({ industry }: CalculatorProps) {
    // 计算模式
    const [mode, setMode] = useState<CalculationMode>("productivity");

    // 输入值
    const [outputValue, setOutputValue] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    const [productivityValue, setProductivityValue] = useState<string>("");

    // 高级选项
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [breakTime, setBreakTime] = useState<string>("");

    // 结果
    const [result, setResult] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // 历史记录
    const { addRecord, getIndustryHistory, clearHistory } = useCalculationHistory();
    const industryHistory = getIndustryHistory(industry.slug);

    const outputField = industry.inputs.find((i) => i.key === "output");
    const inputField = industry.inputs.find((i) => i.key === "input");

    // 计算有效工作时间（扣除休息时间）
    const getEffectiveInput = (rawInput: number): number => {
        const breakMinutes = parseFloat(breakTime) || 0;
        // 假设 input 单位是小时，休息时间是分钟
        const breakHours = breakMinutes / 60;
        return Math.max(0, rawInput - breakHours);
    };

    const calculate = () => {
        setIsCalculating(true);

        setTimeout(() => {
            let calculatedResult: number | null = null;

            switch (mode) {
                case "productivity": {
                    const output = parseFloat(outputValue);
                    const rawInput = parseFloat(inputValue);
                    const effectiveInput = getEffectiveInput(rawInput);

                    if (!isNaN(output) && !isNaN(effectiveInput) && effectiveInput > 0) {
                        calculatedResult = output / effectiveInput;
                    }
                    break;
                }
                case "output": {
                    const productivity = parseFloat(productivityValue);
                    const rawInput = parseFloat(inputValue);
                    const effectiveInput = getEffectiveInput(rawInput);

                    if (!isNaN(productivity) && !isNaN(effectiveInput)) {
                        calculatedResult = productivity * effectiveInput;
                    }
                    break;
                }
                case "input": {
                    const output = parseFloat(outputValue);
                    const productivity = parseFloat(productivityValue);

                    if (!isNaN(output) && !isNaN(productivity) && productivity > 0) {
                        calculatedResult = output / productivity;
                    }
                    break;
                }
            }

            setResult(calculatedResult);
            setIsCalculating(false);

            // 保存到历史记录
            if (calculatedResult !== null) {
                addRecord({
                    industrySlug: industry.slug,
                    mode,
                    values: {
                        output: parseFloat(outputValue) || 0,
                        input: parseFloat(inputValue) || 0,
                        productivity: parseFloat(productivityValue) || 0,
                    },
                    result: calculatedResult,
                });
            }
        }, 300);
    };

    const reset = () => {
        setOutputValue("");
        setInputValue("");
        setProductivityValue("");
        setBreakTime("");
        setResult(null);
    };

    // 获取结果标签
    const getResultLabel = (): string => {
        switch (mode) {
            case "productivity":
                return industry.resultLabel;
            case "output":
                return outputField?.label || "Required Output";
            case "input":
                return inputField?.label || "Required Input";
        }
    };

    // 获取结果单位
    const getResultUnit = (): string => {
        switch (mode) {
            case "productivity":
                return industry.resultUnit;
            case "output":
                return outputField?.unit || "units";
            case "input":
                return inputField?.unit || "hours";
        }
    };

    // 基准对比信息
    const benchmarkInfo = useMemo(() => {
        if (mode !== "productivity" || !industry.benchmark || result === null) {
            return null;
        }

        const { average, good, excellent } = industry.benchmark;

        if (result >= excellent) {
            return { level: "excellent", emoji: "🏆", text: "Excellent!", color: "text-yellow-400" };
        } else if (result >= good) {
            return { level: "good", emoji: "✅", text: "Above Average", color: "text-green-400" };
        } else if (result >= average) {
            return { level: "average", emoji: "📊", text: "Average", color: "text-blue-400" };
        } else {
            return { level: "below", emoji: "📈", text: "Below Average", color: "text-orange-400" };
        }
    }, [mode, industry.benchmark, result]);

    return (
        <div className="w-full max-w-lg mx-auto">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                    <div className="animate-float">
                        <span className="text-5xl md:text-6xl block mb-3 drop-shadow-lg">
                            {industry.icon}
                        </span>
                    </div>
                    <CardTitle className="font-display text-xl md:text-2xl text-gradient tracking-wide">
                        {industry.resultLabel}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {MODE_CONFIG[mode].description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Mode Selector */}
                    <div className="animate-fade-in">
                        <Label className="font-display text-sm tracking-wider uppercase mb-3 block">
                            Calculation Mode
                        </Label>
                        <ToggleGroup
                            type="single"
                            value={mode}
                            onValueChange={(value) => value && setMode(value as CalculationMode)}
                            className="grid grid-cols-3 gap-2"
                        >
                            <ToggleGroupItem
                                value="productivity"
                                className="text-xs px-2 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            >
                                Productivity
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="output"
                                className="text-xs px-2 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            >
                                Output
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="input"
                                className="text-xs px-2 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            >
                                Input
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                            {MODE_CONFIG[mode].formula}
                        </p>
                    </div>

                    {/* Output Field - shown for productivity and input modes */}
                    {(mode === "productivity" || mode === "input") && (
                        <div className="space-y-2 animate-fade-in stagger-1">
                            <Label htmlFor="output" className="font-display text-sm tracking-wider uppercase">
                                {outputField?.label}
                                <span className="text-primary ml-2 font-normal normal-case">
                                    ({outputField?.unit})
                                </span>
                            </Label>
                            <Input
                                id="output"
                                type="number"
                                value={outputValue}
                                onChange={(e) => setOutputValue(e.target.value)}
                                placeholder={outputField?.placeholder}
                                className="h-12 text-lg bg-input/50"
                            />
                        </div>
                    )}

                    {/* Productivity Target Field - shown for output and input modes */}
                    {(mode === "output" || mode === "input") && (
                        <div className="space-y-2 animate-fade-in stagger-1">
                            <Label htmlFor="productivity-target" className="font-display text-sm tracking-wider uppercase">
                                Target {industry.resultLabel}
                                <span className="text-yellow-400 ml-2 font-normal normal-case">
                                    ({industry.resultUnit})
                                </span>
                            </Label>
                            <Input
                                id="productivity-target"
                                type="number"
                                value={productivityValue}
                                onChange={(e) => setProductivityValue(e.target.value)}
                                placeholder={`e.g., 50`}
                                className="h-12 text-lg bg-input/50"
                            />
                        </div>
                    )}

                    {/* Divider */}
                    <div className="flex items-center gap-4 animate-fade-in stagger-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        <span className="text-primary font-display text-sm">
                            {mode === "output" ? "×" : "÷"}
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    </div>

                    {/* Input Field - shown for productivity and output modes */}
                    {(mode === "productivity" || mode === "output") && (
                        <div className="space-y-2 animate-fade-in stagger-2">
                            <Label htmlFor="input" className="font-display text-sm tracking-wider uppercase">
                                {inputField?.label}
                                <span className="text-pink-400 ml-2 font-normal normal-case">
                                    ({inputField?.unit})
                                </span>
                            </Label>
                            <Input
                                id="input"
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={inputField?.placeholder}
                                className="h-12 text-lg bg-input/50"
                            />
                        </div>
                    )}

                    {/* Advanced Options Toggle */}
                    {(mode === "productivity" || mode === "output") && (
                        <div className="animate-fade-in">
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                            >
                                <span>{showAdvanced ? "▼" : "▶"}</span>
                                Advanced Options (Break Time)
                            </button>

                            {showAdvanced && (
                                <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/50 animate-fade-in">
                                    <Label htmlFor="break-time" className="font-display text-xs tracking-wider uppercase">
                                        Break Time
                                        <span className="text-muted-foreground ml-2 font-normal normal-case">
                                            (minutes to subtract)
                                        </span>
                                    </Label>
                                    <Input
                                        id="break-time"
                                        type="number"
                                        value={breakTime}
                                        onChange={(e) => setBreakTime(e.target.value)}
                                        placeholder="e.g., 30"
                                        className="h-10 text-sm bg-input/50 mt-2"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        This time will be subtracted from your input hours
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2 animate-fade-in stagger-3">
                        <Button
                            onClick={calculate}
                            disabled={isCalculating}
                            className="flex-1 h-12 font-display text-sm tracking-wider"
                            size="lg"
                        >
                            {isCalculating ? "COMPUTING..." : "CALCULATE"}
                        </Button>
                        <Button
                            onClick={reset}
                            variant="outline"
                            className="h-12 font-display text-sm tracking-wider"
                            size="lg"
                        >
                            RESET
                        </Button>
                    </div>

                    {/* Result Display */}
                    {result !== null && (
                        <Card className="mt-4 bg-primary/10 border-primary/30 animate-fade-in animate-pulse-glow overflow-hidden">
                            <CardContent className="pt-6 pb-6 text-center">
                                <p className="text-xs text-primary mb-2 font-display tracking-widest uppercase">
                                    {mode === "productivity" ? "Your" : "Required"} {getResultLabel()}
                                </p>
                                <p className="text-4xl md:text-5xl font-bold text-foreground font-display neon-text-subtle">
                                    {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {getResultUnit()}
                                </p>

                                {/* Benchmark Comparison */}
                                {benchmarkInfo && industry.benchmark && (
                                    <div className={`mt-4 pt-4 border-t border-primary/20 ${benchmarkInfo.color}`}>
                                        <p className="text-sm font-medium">
                                            {benchmarkInfo.emoji} {benchmarkInfo.text}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Typical range: {industry.benchmark.average} - {industry.benchmark.excellent} {industry.resultUnit}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            {/* History Panel */}
            <HistoryPanel
                records={industryHistory}
                industryName={industry.name}
                resultUnit={industry.resultUnit}
                onClear={clearHistory}
            />
        </div>
    );
}

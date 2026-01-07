/**
 * @INPUT: CalculationRecord[] (from types/industry.ts) - 历史计算记录数组
 * @OUTPUT: HistoryPanel React 组件 - 展示最近的计算历史
 * @POS: UI 组件 - 显示在 Calculator 下方
 *
 * 功能特性:
 * 1. 统计数据展示（最高、最低、平均）
 * 2. 设为基准功能（⭐ 按钮）
 * 3. 迷你趋势图
 * 4. 与基准对比百分比
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释。
 */
"use client";

import { CalculationRecord, CalculationMode } from "@/types/industry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HistoryStats } from "@/hooks/useCalculationHistory";
import { useMemo } from "react";
import { Locale, DEFAULT_LOCALE } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

interface HistoryPanelProps {
    records: CalculationRecord[];
    industryName: string;
    resultUnit: string;
    onClear: () => void;
    onSetBenchmark: (recordId: string) => void;
    benchmark: CalculationRecord | null;
    stats: HistoryStats | null;
    locale?: Locale;
}

// 迷你趋势图组件
function MiniTrendChart({ records, maxCount = 8 }: { records: CalculationRecord[]; maxCount?: number }) {
    const chartData = useMemo(() => {
        // 只取 productivity 模式的记录用于图表
        const productivityRecords = records
            .filter((r) => r.mode === "productivity")
            .slice(0, maxCount)
            .reverse(); // 反转以便从左到右显示时间顺序

        if (productivityRecords.length < 2) return null;

        const values = productivityRecords.map((r) => r.result);
        const max = Math.max(...values);
        const min = Math.min(...values);
        const range = max - min || 1;

        return {
            points: productivityRecords.map((record, index) => ({
                x: (index / (productivityRecords.length - 1)) * 100,
                y: 100 - ((record.result - min) / range) * 80 - 10, // 10-90% 范围
                value: record.result,
            })),
            count: productivityRecords.length,
        };
    }, [records, maxCount]);

    if (!chartData) return null;

    const pathD = chartData.points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");

    // 判断趋势颜色
    const firstValue = chartData.points[0]?.value || 0;
    const lastValue = chartData.points[chartData.points.length - 1]?.value || 0;
    const strokeColor = lastValue > firstValue ? "#22c55e" : lastValue < firstValue ? "#ef4444" : "#6b7280";

    return (
        <div className="w-full h-12 mt-2">
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                {/* 网格线 */}
                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
                {/* 趋势线 */}
                <path
                    d={pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* 数据点 */}
                {chartData.points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="2"
                        fill={strokeColor}
                    />
                ))}
            </svg>
        </div>
    );
}

export default function HistoryPanel({
    records,
    industryName,
    resultUnit,
    onClear,
    onSetBenchmark,
    benchmark,
    stats,
    locale = DEFAULT_LOCALE,
}: HistoryPanelProps) {
    const t = getTranslations(locale);

    // 模式标签翻译
    const MODE_LABELS: Record<CalculationMode, string> = {
        productivity: t.calculator.modeProductivity,
        output: t.calculator.modeOutput,
        input: t.calculator.modeInput,
    };

    // 趋势翻译
    const TREND_LABELS = {
        up: locale === "zh" ? "↑ 上升中" :
            locale === "es" ? "↑ Mejorando" :
                locale === "de" ? "↑ Verbesserung" :
                    locale === "ja" ? "↑ 改善中" :
                        "↑ Improving",
        down: locale === "zh" ? "↓ 下降中" :
            locale === "es" ? "↓ Disminuyendo" :
                locale === "de" ? "↓ Abnehmend" :
                    locale === "ja" ? "↓ 低下中" :
                        "↓ Declining",
        stable: locale === "zh" ? "→ 稳定" :
            locale === "es" ? "→ Estable" :
                locale === "de" ? "→ Stabil" :
                    locale === "ja" ? "→ 安定" :
                        "→ Stable",
    };

    // 时间翻译
    const TIME_LABELS = {
        justNow: locale === "zh" ? "刚刚" :
            locale === "es" ? "Ahora" :
                locale === "de" ? "Gerade" :
                    locale === "ja" ? "たった今" :
                        "Just now",
        mAgo: locale === "zh" ? "分钟前" :
            locale === "es" ? "m atrás" :
                locale === "de" ? "m her" :
                    locale === "ja" ? "分前" :
                        "m ago",
        hAgo: locale === "zh" ? "小时前" :
            locale === "es" ? "h atrás" :
                locale === "de" ? "h her" :
                    locale === "ja" ? "時間前" :
                        "h ago",
    };

    if (records.length === 0) {
        return null;
    }

    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return TIME_LABELS.justNow;
        if (diffMins < 60) return `${diffMins}${TIME_LABELS.mAgo}`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}${TIME_LABELS.hAgo}`;

        return date.toLocaleDateString();
    };

    // 计算与基准的对比百分比
    const getComparePercentage = (record: CalculationRecord): string | null => {
        if (!benchmark || record.id === benchmark.id || record.mode !== "productivity") return null;
        const diff = ((record.result - benchmark.result) / benchmark.result) * 100;
        const sign = diff > 0 ? "+" : "";
        return `${sign}${diff.toFixed(1)}%`;
    };

    return (
        <Card className="mt-6 border-border/30 bg-card/50">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-display tracking-wider uppercase text-muted-foreground">
                        📜 {t.history.title}
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClear}
                        className="text-xs text-muted-foreground hover:text-destructive"
                    >
                        {t.history.clear}
                    </Button>
                </div>

                {/* 统计数据 */}
                {stats && (
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                            <p className="text-xs text-green-400 font-display">📈 {t.history.best}</p>
                            <p className="text-sm font-bold text-green-400">
                                {stats.max.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                            </p>
                        </div>
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <p className="text-xs text-blue-400 font-display">📊 {t.history.avg}</p>
                            <p className="text-sm font-bold text-blue-400">
                                {stats.avg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                            </p>
                        </div>
                        <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <p className="text-xs text-orange-400 font-display">📉 {t.history.worst}</p>
                            <p className="text-sm font-bold text-orange-400">
                                {stats.min.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                            </p>
                        </div>
                    </div>
                )}

                {/* 迷你趋势图 */}
                <MiniTrendChart records={records} />

                {/* 趋势指示器 */}
                {stats?.trend && (
                    <div className="mt-2 text-center">
                        <span className={`text-xs font-medium ${stats.trend === "up" ? "text-green-400" :
                            stats.trend === "down" ? "text-red-400" : "text-gray-400"
                            }`}>
                            {TREND_LABELS[stats.trend]}
                        </span>
                    </div>
                )}
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-2">
                    {records.slice(0, 5).map((record) => {
                        const comparePercent = getComparePercentage(record);
                        const isBenchmark = record.isBenchmark;

                        return (
                            <div
                                key={record.id}
                                className={`flex items-center justify-between p-2 rounded-lg transition-colors ${isBenchmark
                                    ? "bg-yellow-500/10 border border-yellow-500/30"
                                    : "bg-muted/30 hover:bg-muted/50"
                                    }`}
                            >
                                <div className="flex items-center gap-2 flex-1">
                                    {/* 设为基准按钮 */}
                                    <button
                                        onClick={() => onSetBenchmark(record.id)}
                                        className={`text-sm transition-colors ${isBenchmark ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"
                                            }`}
                                        title={isBenchmark ? t.history.benchmark : t.history.setBenchmark}
                                    >
                                        {isBenchmark ? "⭐" : "☆"}
                                    </button>

                                    <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium">
                                        {MODE_LABELS[record.mode]}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {record.result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {resultUnit}
                                    </span>

                                    {/* 与基准对比 */}
                                    {comparePercent && (
                                        <span className={`text-xs font-medium ${comparePercent.startsWith("+") ? "text-green-400" : "text-red-400"
                                            }`}>
                                            {comparePercent}
                                        </span>
                                    )}

                                    {/* 收益信息 */}
                                    {record.earnings && (
                                        <span className="text-xs text-green-400">
                                            ${record.earnings.toFixed(0)}/hr
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {formatTime(record.timestamp)}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* 基准提示 */}
                {benchmark && (
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                        ⭐ {t.history.benchmark}: {benchmark.result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {resultUnit}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

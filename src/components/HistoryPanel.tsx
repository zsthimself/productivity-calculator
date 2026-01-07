/**
 * @INPUT: CalculationRecord[] (from types/industry.ts) - 历史计算记录数组
 * @OUTPUT: HistoryPanel React 组件 - 展示最近的计算历史
 * @POS: UI 组件 - 显示在 Calculator 下方
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释。
 */
"use client";

import { CalculationRecord, CalculationMode } from "@/types/industry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HistoryPanelProps {
    records: CalculationRecord[];
    industryName: string;
    resultUnit: string;
    onClear: () => void;
}

const MODE_LABELS: Record<CalculationMode, string> = {
    productivity: "Productivity",
    output: "Output",
    input: "Input",
};

export default function HistoryPanel({ records, industryName, resultUnit, onClear }: HistoryPanelProps) {
    if (records.length === 0) {
        return null;
    }

    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;

        return date.toLocaleDateString();
    };

    return (
        <Card className="mt-6 border-border/30 bg-card/50">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-display tracking-wider uppercase text-muted-foreground">
                        📜 Recent Calculations
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClear}
                        className="text-xs text-muted-foreground hover:text-destructive"
                    >
                        Clear
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="space-y-2">
                    {records.slice(0, 5).map((record) => (
                        <div
                            key={record.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium">
                                    {MODE_LABELS[record.mode]}
                                </span>
                                <span className="text-sm font-medium">
                                    {record.result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {resultUnit}
                                </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {formatTime(record.timestamp)}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

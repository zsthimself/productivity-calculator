/**
 * @INPUT: industrySlug (string) - 当前行业标识
 * @OUTPUT: useCalculationHistory Hook - 管理计算历史记录的自定义 Hook
 * @POS: Hooks - 提供 localStorage 持久化的计算历史功能
 *
 * 功能特性:
 * 1. 历史记录 CRUD
 * 2. 设为基准功能
 * 3. 统计数据计算
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释。
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { CalculationRecord } from "@/types/industry";

const STORAGE_KEY = "productivity-calculator-history";
const MAX_RECORDS = 20; // 增加到 20 条记录以支持更好的统计

// 统计数据接口
export interface HistoryStats {
    max: number;
    min: number;
    avg: number;
    count: number;
    trend: "up" | "down" | "stable" | null; // 与上一条对比的趋势
}

interface UseCalculationHistoryReturn {
    history: CalculationRecord[];
    addRecord: (record: Omit<CalculationRecord, "id" | "timestamp">) => void;
    clearHistory: () => void;
    getIndustryHistory: (slug: string) => CalculationRecord[];
    setBenchmark: (recordId: string) => void;
    getBenchmark: (slug: string) => CalculationRecord | null;
    getStats: (slug: string) => HistoryStats | null;
}

export function useCalculationHistory(): UseCalculationHistoryReturn {
    const [history, setHistory] = useState<CalculationRecord[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // 从 localStorage 加载历史记录
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as CalculationRecord[];
                setHistory(parsed);
            }
        } catch (error) {
            console.error("Failed to load calculation history:", error);
        }
        setIsInitialized(true);
    }, []);

    // 保存到 localStorage
    useEffect(() => {
        if (!isInitialized || typeof window === "undefined") return;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (error) {
            console.error("Failed to save calculation history:", error);
        }
    }, [history, isInitialized]);

    // 添加新记录
    const addRecord = useCallback((record: Omit<CalculationRecord, "id" | "timestamp">) => {
        const newRecord: CalculationRecord = {
            ...record,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
        };

        setHistory((prev) => {
            const updated = [newRecord, ...prev].slice(0, MAX_RECORDS);
            return updated;
        });
    }, []);

    // 清空历史
    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    // 获取特定行业的历史记录
    const getIndustryHistory = useCallback((slug: string): CalculationRecord[] => {
        return history.filter((record) => record.industrySlug === slug);
    }, [history]);

    // 设为基准
    const setBenchmark = useCallback((recordId: string) => {
        setHistory((prev) => {
            // 找到要设为基准的记录
            const targetRecord = prev.find((r) => r.id === recordId);
            if (!targetRecord) return prev;

            return prev.map((record) => {
                // 同行业的其他记录取消基准
                if (record.industrySlug === targetRecord.industrySlug) {
                    return {
                        ...record,
                        isBenchmark: record.id === recordId ? !record.isBenchmark : false,
                    };
                }
                return record;
            });
        });
    }, []);

    // 获取基准记录
    const getBenchmark = useCallback((slug: string): CalculationRecord | null => {
        return history.find((r) => r.industrySlug === slug && r.isBenchmark) || null;
    }, [history]);

    // 获取统计数据
    const getStats = useCallback((slug: string): HistoryStats | null => {
        const industryRecords = history.filter(
            (r) => r.industrySlug === slug && r.mode === "productivity"
        );

        if (industryRecords.length === 0) return null;

        const results = industryRecords.map((r) => r.result);
        const max = Math.max(...results);
        const min = Math.min(...results);
        const avg = results.reduce((a, b) => a + b, 0) / results.length;

        // 计算趋势：最新记录与上一条对比
        let trend: "up" | "down" | "stable" | null = null;
        if (industryRecords.length >= 2) {
            const latest = industryRecords[0].result;
            const previous = industryRecords[1].result;
            if (latest > previous * 1.01) trend = "up";
            else if (latest < previous * 0.99) trend = "down";
            else trend = "stable";
        }

        return { max, min, avg, count: industryRecords.length, trend };
    }, [history]);

    return {
        history,
        addRecord,
        clearHistory,
        getIndustryHistory,
        setBenchmark,
        getBenchmark,
        getStats,
    };
}

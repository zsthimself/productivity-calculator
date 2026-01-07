/**
 * @INPUT: industrySlug (string) - 当前行业标识
 * @OUTPUT: useCalculationHistory Hook - 管理计算历史记录的自定义 Hook
 * @POS: Hooks - 提供 localStorage 持久化的计算历史功能
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释。
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { CalculationRecord, CalculationMode } from "@/types/industry";

const STORAGE_KEY = "productivity-calculator-history";
const MAX_RECORDS = 10; // 保留最近 10 条记录

interface UseCalculationHistoryReturn {
    history: CalculationRecord[];
    addRecord: (record: Omit<CalculationRecord, "id" | "timestamp">) => void;
    clearHistory: () => void;
    getIndustryHistory: (slug: string) => CalculationRecord[];
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

    return {
        history,
        addRecord,
        clearHistory,
        getIndustryHistory,
    };
}

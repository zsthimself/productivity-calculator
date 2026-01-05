/**
 * @INPUT: IndustryData (from types/industry.ts) - 行业配置对象
 * @OUTPUT: Calculator React 组件 - 可交互的生产力计算器 UI
 * @POS: 核心业务组件 - 被首页和所有 pSEO 行业页面复用
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 components/_META.md。
 */
"use client";

import { useState } from "react";
import { IndustryData } from "@/types/industry";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalculatorProps {
    industry: IndustryData;
}

export default function Calculator({ industry }: CalculatorProps) {
    const [outputValue, setOutputValue] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const outputField = industry.inputs.find((i) => i.key === "output");
    const inputField = industry.inputs.find((i) => i.key === "input");

    const calculate = () => {
        const output = parseFloat(outputValue);
        const input = parseFloat(inputValue);

        if (isNaN(output) || isNaN(input) || input === 0) {
            setResult(null);
            return;
        }

        setIsCalculating(true);
        setTimeout(() => {
            setResult(output / input);
            setIsCalculating(false);
        }, 300);
    };

    const reset = () => {
        setOutputValue("");
        setInputValue("");
        setResult(null);
    };

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
                        Enter your values below to calculate
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Output Field */}
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

                    {/* Divider */}
                    <div className="flex items-center gap-4 animate-fade-in stagger-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                        <span className="text-primary font-display text-sm">÷</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    </div>

                    {/* Input Field */}
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
                                    Your {industry.resultLabel}
                                </p>
                                <p className="text-4xl md:text-5xl font-bold text-foreground font-display neon-text-subtle">
                                    {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {industry.resultUnit}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 videoProductionFaqs
 * [POS]: src/lib/schemas/faqs/videoProduction.ts 影视视频制作垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const videoProductionFaqs: FAQItem[] = [
    {
        question: "How do you calculate productivity in video production?",
        answer: "Video production productivity is calculated by dividing finished video output (minutes or deliverable units) by total production inputs (labor hours or budget): Video Productivity = Delivered Output ÷ Labor Hours (or Total Budget). Key metrics include editing hours per finished minute, shooting ratio, and cost per finished minute.",
    },
    {
        question: "What is a normal cost per minute for video production?",
        answer: "Professional corporate marketing videos average $1,500 to $3,500 per finished minute. Broadcast television commercials typically range from $10,000 to $40,000+ per minute due to specialized crews, studio stages, and visual effects. Agile digital creator content averages $150 to $450 per minute.",
    },
    {
        question: "What is an ideal shooting ratio for commercial video?",
        answer: "A shooting ratio between 15:1 and 25:1 is ideal for corporate and commercial video: capturing 15 to 25 minutes of raw footage for every 1 minute of finished video. Ratios below 10:1 risk lacking B-roll coverage, while ratios above 40:1 cause post-production logging bottlenecks.",
    },
    {
        question: "How many hours does it take to edit a 5-minute video?",
        answer: "A polished 5-minute corporate video typically takes 25 to 40 post-production hours: 6 hours for footage ingestion and assembly, 12 hours for pacing and B-roll placement, 8 hours for motion graphics and color grading, and 6 hours for client feedback revisions.",
    },
    {
        question: "How does crew size affect production turnaround time?",
        answer: "Larger crews accelerate on-set shooting by delegating lighting, audio recording, and camera setup, but do not directly speed up editing. In post-production, adding multiple editors introduces timeline reconciliation overhead; a single dedicated lead editor yields the highest efficiency.",
    },
    {
        question: "Why do TikTok, Reels, and Shorts require a different productivity model?",
        answer: "Short-form vertical video relies on batch production: measuring cost per asset and daily throughput. A solo creator or two-person team can batch-shoot 15 to 20 videos in half a day, using standardized caption templates to achieve turnaround times under 48 hours.",
    },
];

/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 softwareDevelopmentFaqs
 * [POS]: src/lib/schemas/faqs/softwareDevelopment.ts 产研人效、DORA 研发交付流速与 Sprint 工时垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const softwareDevelopmentFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating software development productivity?",
        answer: "Modern software development productivity is evaluated across three complementary dimensions rather than single vanity metrics like lines of code (LOC): 1) DORA Velocity & Lead Time = Total Time Elapsed from First Code Commit to Successful Production Deployment; 2) Sprint Story Point Yield = Completed Story Points ÷ Total Engineering FTEs per 2-week Sprint; and 3) Engineering Revenue Leverage = Annual Recurring Revenue (ARR) ÷ Total Full-Time Engineering Headcount. High-performing engineering organizations combine DORA delivery throughput with the multi-dimensional SPACE framework (Satisfaction, Performance, Activity, Communication, Efficiency).",
    },
    {
        question: "What are the four core DORA metrics and their industry performance tiers?",
        answer: "Developed by Google Cloud's DevOps Research and Assessment (DORA) team, the four foundational metrics are: 1) Deployment Frequency (Elite: on-demand multiple times per day; Low: once every 1 to 6 months); 2) Lead Time for Changes (Elite: less than 1 hour; Low: between 1 and 6 months); 3) Change Failure Rate (Elite: 0% to 5%; Low: 46% to 60%); and 4) Failed Deployment Recovery Time / MTTR (Elite: under 1 hour; Low: over 1 week). Elite teams deploy frequently in small batches, dramatically limiting blast radius and accelerating recovery.",
    },
    {
        question: "How do engineering leaders calculate Sprint Story Point Velocity and developer capacity?",
        answer: "Sprint Velocity is calculated by summing the estimated point values of all user stories and tasks that meet the team's 'Definition of Done' at sprint conclusion: Velocity = Total Accepted Story Points ÷ Sprint Weeks. Developer capacity evaluates individual contribution: Point Yield per FTE = Total Sprint Velocity ÷ Active Developers. Typical high-functioning cross-functional agile teams deliver between 8 and 14 calibrated story points per full-time engineer per 2-week iteration while preserving an 85%+ planned-to-delivered commitment ratio.",
    },
    {
        question: "What is a healthy Pull Request (PR) merge velocity and code review SLA?",
        answer: "Industry telemetry from GitHub and linear engineering benchmarks indicates that high-performing software teams maintain a PR review turnaround time of under 4 hours, with pull requests remaining open for less than 24 hours total. High-velocity developers merge between 3 and 6 bite-sized pull requests (typically under 200 lines of modified code) per week. Large pull requests exceeding 400 lines experience a 65% longer review latency, higher defect escapes, and significant context-switching penalties.",
    },
    {
        question: "What is the standard ARR per engineer benchmark for high-growth SaaS companies?",
        answer: "In venture-backed and public B2B SaaS organizations, ARR per Engineering FTE serves as a primary efficiency indicator. Early-stage Series A companies ($1M to $5M ARR) typically generate $120,000 to $220,000 per engineer. Scaled growth-stage companies ($10M to $50M ARR) achieve $250,000 to $450,000 per engineer, while top-quartile public enterprise SaaS operators (such as Atlassian, Datadog, or Snowflake) surpass $500,000 to $750,000 in ARR per engineering employee through platform leverage and automated CI/CD tooling.",
    },
    {
        question: "How should engineering managers allocate developer capacity between new features and technical debt?",
        answer: "Industry consensus across leading tech organizations recommends the 70/20/10 capacity allocation framework: 70% of engineering bandwidth dedicated to core product roadmap features and customer commitments; 20% reserved for architecture modernization, refactoring, and technical debt retirement; and 10% allocated to developer experience tooling, CI pipeline optimizations, and innovation spikes. Allocating less than 15% to technical debt leads to compounding regression bugs, brittle architecture, and a 40% collapse in feature delivery velocity within 12 to 18 months.",
    },
];

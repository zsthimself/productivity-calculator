/**
 * [INPUT]: 依赖 ./types 的 FAQItem
 * [OUTPUT]: 导出 educationFaqs
 * [POS]: src/lib/schemas/faqs/education.ts 教育教学人效、生师比与学费收益工时垂直行业 FAQPage 结构化问答
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { FAQItem } from "./types";

export const educationFaqs: FAQItem[] = [
    {
        question: "What is the formula for calculating education productivity and teacher efficiency?",
        answer: "Education productivity is measured across three primary institutional dimensions: 1) Student-to-Teacher Ratio (STR) = Total Full-Time Equivalent (FTE) Enrolled Students ÷ Total Full-Time Faculty FTEs; 2) Instructional Contact Hours = Total Classroom Teaching Hours Delivered ÷ Total Student Body; and 3) Cost Per Student = Total Annual Institutional Operating Budget ÷ Total Enrolled Student Population. In higher education, productivity additionally measures Student Credit Hours (SCH) generated per faculty member: SCH Yield = Total Credit Hours Delivered ÷ Active Instructional Faculty.",
    },
    {
        question: "What is the optimal student-to-teacher ratio for student achievement and operational efficiency?",
        answer: "According to National Center for Education Statistics (NCES) empirical studies, the national average student-teacher ratio in US public elementary and secondary schools is approximately 15.3:1. High-performing private preparatory schools maintain ratios between 10.5:1 and 12.5:1 to maximize individual student feedback, while regional universities and community colleges operate between 16:1 and 22:1 to balance tuition affordability with instructional contact quality.",
    },
    {
        question: "How do school districts calculate per-pupil expenditure and instructional budget ratios?",
        answer: "Per-Pupil Expenditure is calculated by dividing total annual district operating expenses (instruction, administrative leadership, facilities, student support services, and school nutrition) by Average Daily Membership (ADM) or October enrollment counts. Across the United States, per-pupil spending averages $15,633 annually. State departments of education recommend that at least 60% to 65% of total operating budgets be allocated directly to classroom instruction and teacher compensation.",
    },
    {
        question: "What are Student Credit Hours (SCH) and how do universities measure faculty productivity?",
        answer: "A Student Credit Hour (SCH) represents one student enrolled in a one-credit course. In higher education, an undergraduate class of 30 students enrolled in a 3-credit course produces 90 Student Credit Hours (30 students × 3 credits). University provosts and deans evaluate instructional productivity by tracking SCH per full-time faculty member per semester (typically targeting 280 to 450 SCH for teaching faculty, or 150 to 220 SCH for research-active tenured professors with active grants).",
    },
    {
        question: "How does teacher classroom scheduling impact educational productivity and burnout?",
        answer: "Traditional six-to-seven-period daily schedules require teachers to manage multiple rapid 45-minute transitions and up to 150 daily student interactions, increasing grading fatigue and classroom friction. Transitioning to modified block scheduling (e.g. four 85-minute classes on alternating A/B days) provides teachers with consolidated 90-minute planning periods, increases student active project engagement by 22%, and reduces non-instructional passing period hallway supervision time.",
    },
    {
        question: "How can educational institutions improve productivity without compromising learning outcomes?",
        answer: "Schools and universities expand educational productivity through five lean pedagogical strategies: 1) Deploying centralized Learning Management Systems (LMS) with automated quiz grading and rubric templates to save teachers 4 to 6 hours of weekly clerical grading; 2) Implementing Multi-Tiered Systems of Support (MTSS) early warning indicators to prevent costly student course failures; 3) Standardizing curriculum materials across grade levels to eliminate redundant individual lesson planning; 4) Consolidating low-enrollment specialized elective courses across regional consortiums; and 5) Providing instructional coaching rather than administrative compliance inspections.",
    },
];

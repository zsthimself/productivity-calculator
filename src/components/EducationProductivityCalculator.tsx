/**
 * [INPUT]: 依赖 react (useState, useMemo)；依赖 lucide-react 图标
 * [OUTPUT]: 导出 EducationProductivityCalculator 交互组件及默认导出
 * [POS]: src/components 的教育教学人效、生师比、生均支出与学费收益工时计算引擎，承接 /calculator/education 路由
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  Sparkles,
  School,
  Clock,
  ShieldCheck,
  Layers,
} from "lucide-react";

type CalcMode = "str_capacity" | "per_pupil_cost" | "tuition_roi";

interface EducationPreset {
  name: string;
  type: string;
  enrolledStudents: number;
  facultyFte: number;
  annualTeachingHours: number;
  weeklyPeriods: number;
  annualBudget: number;
  instructionalPayroll: number;
  adminOverhead: number;
  creditHoursDelivered: number;
  netTuitionRevenue: number;
  completionRatePct: number;
}

const PRESETS: Record<string, EducationPreset> = {
  public_k12: {
    name: "Public K-12 District",
    type: "Suburban Comprehensive School District",
    enrolledStudents: 1450,
    facultyFte: 95,
    annualTeachingHours: 880,
    weeklyPeriods: 25,
    annualBudget: 23500000,
    instructionalPayroll: 15200000,
    adminOverhead: 3600000,
    creditHoursDelivered: 29000,
    netTuitionRevenue: 0, // Public funding
    completionRatePct: 92.5,
  },
  private_prep: {
    name: "College Prep Academy",
    type: "Independent K-12 Preparatory School",
    enrolledStudents: 480,
    facultyFte: 44,
    annualTeachingHours: 720,
    weeklyPeriods: 20,
    annualBudget: 11800000,
    instructionalPayroll: 7600000,
    adminOverhead: 1950000,
    creditHoursDelivered: 11500,
    netTuitionRevenue: 12400000,
    completionRatePct: 98.2,
  },
  state_university: {
    name: "State University",
    type: "Public Research & Teaching Campus",
    enrolledStudents: 18500,
    facultyFte: 940,
    annualTeachingHours: 420,
    weeklyPeriods: 9,
    annualBudget: 210000000,
    instructionalPayroll: 115000000,
    adminOverhead: 42000000,
    creditHoursDelivered: 460000,
    netTuitionRevenue: 185000000,
    completionRatePct: 74.8,
  },
  vocational_tech: {
    name: "Vocational College",
    type: "Community & Career Technical Institute",
    enrolledStudents: 2400,
    facultyFte: 125,
    annualTeachingHours: 920,
    weeklyPeriods: 24,
    annualBudget: 28500000,
    instructionalPayroll: 18200000,
    adminOverhead: 4500000,
    creditHoursDelivered: 68000,
    netTuitionRevenue: 14200000,
    completionRatePct: 68.5,
  },
};

export function EducationProductivityCalculator() {
  const [mode, setMode] = useState<CalcMode>("str_capacity");
  const [copied, setCopied] = useState(false);

  // Common institutional inputs
  const [enrolledStudents, setEnrolledStudents] = useState(1450);
  const [facultyFte, setFacultyFte] = useState(95);

  // Mode 1: STR & Hours
  const [annualTeachingHours, setAnnualTeachingHours] = useState(880);
  const [weeklyPeriods, setWeeklyPeriods] = useState(25);

  // Mode 2: Per Pupil
  const [annualBudget, setAnnualBudget] = useState(23500000);
  const [instructionalPayroll, setInstructionalPayroll] = useState(15200000);
  const [adminOverhead, setAdminOverhead] = useState(3600000);

  // Mode 3: Higher Ed
  const [creditHoursDelivered, setCreditHoursDelivered] = useState(29000);
  const [netTuitionRevenue, setNetTuitionRevenue] = useState(12400000);
  const [completionRatePct, setCompletionRatePct] = useState(92.5);

  // Computations: Mode 1 STR
  const strStats = useMemo(() => {
    const studentTeacherRatio = facultyFte > 0 ? enrolledStudents / facultyFte : 0;
    const totalInstructionalHours = facultyFte * annualTeachingHours;
    const hoursPerStudent = enrolledStudents > 0 ? totalInstructionalHours / enrolledStudents : 0;
    const averageClassSizeEstimate = studentTeacherRatio * 1.35; // Standard schedule distribution factor

    return {
      studentTeacherRatio,
      totalInstructionalHours,
      hoursPerStudent,
      averageClassSizeEstimate,
    };
  }, [enrolledStudents, facultyFte, annualTeachingHours]);

  // Computations: Mode 2 Per-Pupil
  const budgetStats = useMemo(() => {
    const costPerStudent = enrolledStudents > 0 ? annualBudget / enrolledStudents : 0;
    const instructionRatioPct = annualBudget > 0 ? (instructionalPayroll / annualBudget) * 100 : 0;
    const adminRatioPct = annualBudget > 0 ? (adminOverhead / annualBudget) * 100 : 0;
    const instructionSpendPerStudent = enrolledStudents > 0 ? instructionalPayroll / enrolledStudents : 0;

    return {
      costPerStudent,
      instructionRatioPct,
      adminRatioPct,
      instructionSpendPerStudent,
    };
  }, [annualBudget, enrolledStudents, instructionalPayroll, adminOverhead]);

  // Computations: Mode 3 Higher Ed
  const higherEdStats = useMemo(() => {
    const schPerFaculty = facultyFte > 0 ? creditHoursDelivered / facultyFte : 0;
    const tuitionRoiMultiplier = instructionalPayroll > 0 ? netTuitionRevenue / instructionalPayroll : 0;
    const revenuePerCreditHour = creditHoursDelivered > 0 ? netTuitionRevenue / creditHoursDelivered : 0;

    return {
      schPerFaculty,
      tuitionRoiMultiplier,
      revenuePerCreditHour,
    };
  }, [creditHoursDelivered, facultyFte, netTuitionRevenue, instructionalPayroll]);

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (!p) return;
    setEnrolledStudents(p.enrolledStudents);
    setFacultyFte(p.facultyFte);
    setAnnualTeachingHours(p.annualTeachingHours);
    setWeeklyPeriods(p.weeklyPeriods);
    setAnnualBudget(p.annualBudget);
    setInstructionalPayroll(p.instructionalPayroll);
    setAdminOverhead(p.adminOverhead);
    setCreditHoursDelivered(p.creditHoursDelivered);
    setNetTuitionRevenue(p.netTuitionRevenue);
    setCompletionRatePct(p.completionRatePct);
  };

  const copyReport = () => {
    const text = `### Education Productivity & Academic Yield Audit Report
**Institutional Enrollment:** ${enrolledStudents.toLocaleString()} Students | **Faculty:** ${facultyFte} FTEs
**Annual Operating Budget:** $${annualBudget.toLocaleString()}

#### 1. Student-to-Teacher Ratio & Contact Capacity
- **Student-Teacher Ratio (STR):** ${strStats.studentTeacherRatio.toFixed(1)}:1 (NCES benchmark: 15.3:1)
- **Estimated Average Class Size:** ${strStats.averageClassSizeEstimate.toFixed(1)} students
- **Total Instructional Contact Hours:** ${strStats.totalInstructionalHours.toLocaleString()} hours
- **Direct Hours Delivered Per Student:** ${strStats.hoursPerStudent.toFixed(1)} hrs/student

#### 2. Cost Per Student & Budget Efficiency
- **Total Expenditure Per Student:** $${budgetStats.costPerStudent.toFixed(0)} / student
- **Classroom Instruction Ratio:** ${budgetStats.instructionRatioPct.toFixed(1)}% (target > 60%)
- **Direct Instructional Spend Per Pupil:** $${budgetStats.instructionSpendPerStudent.toFixed(0)}
- **Administrative Overhead Ratio:** ${budgetStats.adminRatioPct.toFixed(1)}%

#### 3. Academic Yield & Tuition ROI
- **Student Credit Hours (SCH) per Faculty:** ${higherEdStats.schPerFaculty.toFixed(0)} SCH/FTE
- **Tuition-to-Payroll ROI Multiple:** ${higherEdStats.tuitionRoiMultiplier.toFixed(2)}x
- **Academic Completion / Graduation Rate:** ${completionRatePct}%
*Generated via productivitycalculator.work/calculator/education*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 md:p-8 rounded-2xl bg-card border border-border/80 shadow-2xl space-y-8 font-body">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <GraduationCap className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground tracking-tight">
                Education Productivity &amp; School Metrics Calculator
              </h2>
              <p className="text-xs text-muted-foreground">
                NCES benchmarks, student-to-teacher ratio (STR), per-pupil spending &amp; credit hour yield
              </p>
            </div>
          </div>
        </div>

        {/* Industry Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(PRESETS).map(([k, p]) => (
            <button
              key={k}
              onClick={() => applyPreset(k)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all border border-border/40 hover:border-border"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setMode("str_capacity")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "str_capacity"
              ? "bg-indigo-500/15 border-indigo-500/60 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. Student-Teacher Ratio (STR)</span>
        </button>

        <button
          onClick={() => setMode("per_pupil_cost")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "per_pupil_cost"
              ? "bg-pink-500/15 border-pink-500/60 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>2. Cost Per Student &amp; Budget</span>
        </button>

        <button
          onClick={() => setMode("tuition_roi")}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
            mode === "tuition_roi"
              ? "bg-emerald-500/15 border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/60"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>3. Credit Hours &amp; Tuition ROI</span>
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-muted/20 border border-border/50">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Total Enrolled Student Population</span>
            <span className="font-mono text-indigo-400 font-bold">{enrolledStudents.toLocaleString()} students</span>
          </div>
          <input
            type="range"
            min="50"
            max="30000"
            step="50"
            value={enrolledStudents}
            onChange={(e) => setEnrolledStudents(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <input
            type="number"
            value={enrolledStudents}
            onChange={(e) => setEnrolledStudents(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground font-medium">Full-Time Faculty &amp; Teaching Staff (FTEs)</span>
            <span className="font-mono text-indigo-400 font-bold">{facultyFte} faculty</span>
          </div>
          <input
            type="range"
            min="5"
            max="1500"
            step="5"
            value={facultyFte}
            onChange={(e) => setFacultyFte(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <input
            type="number"
            value={facultyFte}
            onChange={(e) => setFacultyFte(Number(e.target.value))}
            className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-indigo-500"
          />
        </div>

        {mode === "str_capacity" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Annual Classroom Teaching Hours / Teacher</span>
                <span className="font-mono text-indigo-400 font-bold">{annualTeachingHours} hrs/yr</span>
              </div>
              <input
                type="range"
                min="300"
                max="1200"
                step="10"
                value={annualTeachingHours}
                onChange={(e) => setAnnualTeachingHours(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Weekly Teaching Periods / Courses</span>
                <span className="font-mono text-indigo-400 font-bold">{weeklyPeriods} periods</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={weeklyPeriods}
                onChange={(e) => setWeeklyPeriods(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </>
        )}

        {mode === "per_pupil_cost" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Total Annual Operating Budget ($)</span>
                <span className="font-mono text-pink-400 font-bold">${annualBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="300000000"
                step="500000"
                value={annualBudget}
                onChange={(e) => setAnnualBudget(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
              <input
                type="number"
                value={annualBudget}
                onChange={(e) => setAnnualBudget(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Instructional Salaries &amp; Classroom Spend ($)</span>
                <span className="font-mono text-pink-400 font-bold">${instructionalPayroll.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="250000"
                max="180000000"
                step="250000"
                value={instructionalPayroll}
                onChange={(e) => setInstructionalPayroll(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
              <input
                type="number"
                value={instructionalPayroll}
                onChange={(e) => setInstructionalPayroll(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Administrative Leadership &amp; Facility Overhead ($)</span>
                <span className="font-mono text-pink-400 font-bold">${adminOverhead.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="60000000"
                step="100000"
                value={adminOverhead}
                onChange={(e) => setAdminOverhead(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>
          </>
        )}

        {mode === "tuition_roi" && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Student Credit Hours Delivered (Annual SCH)</span>
                <span className="font-mono text-emerald-400 font-bold">{creditHoursDelivered.toLocaleString()} SCH</span>
              </div>
              <input
                type="range"
                min="2000"
                max="600000"
                step="1000"
                value={creditHoursDelivered}
                onChange={(e) => setCreditHoursDelivered(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={creditHoursDelivered}
                onChange={(e) => setCreditHoursDelivered(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Net Annual Tuition &amp; Fee Revenue ($)</span>
                <span className="font-mono text-emerald-400 font-bold">${netTuitionRevenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="250000000"
                step="500000"
                value={netTuitionRevenue}
                onChange={(e) => setNetTuitionRevenue(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="number"
                value={netTuitionRevenue}
                onChange={(e) => setNetTuitionRevenue(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground font-medium">Student Graduation / Completion Rate (%)</span>
                <span className="font-mono text-emerald-400 font-bold">{completionRatePct}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="0.5"
                value={completionRatePct}
                onChange={(e) => setCompletionRatePct(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </>
        )}
      </div>

      {/* KPI Display Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Student-Teacher Ratio
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-indigo-400">
            {strStats.studentTeacherRatio.toFixed(1)}:1
          </div>
          <div className="text-[11px] text-muted-foreground">US K-12 Avg: 15.3:1</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Cost Per Student
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-pink-400">
            ${(budgetStats.costPerStudent / 1000).toFixed(1)}k
          </div>
          <div className="text-[11px] text-muted-foreground">per pupil / year</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Instruction Ratio %
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${
            budgetStats.instructionRatioPct >= 60 ? "text-emerald-400" : "text-amber-400"
          }`}>
            {budgetStats.instructionRatioPct.toFixed(1)}%
          </div>
          <div className="text-[11px] text-muted-foreground">Target &gt; 60.0%</div>
        </div>

        <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            SCH Yield / Faculty
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400">
            {higherEdStats.schPerFaculty.toFixed(0)} SCH
          </div>
          <div className="text-[11px] text-muted-foreground">credit hours / FTE</div>
        </div>
      </div>

      {/* Secondary Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-card border border-border/50 text-xs">
        <div>
          <span className="text-muted-foreground block">Avg Class Size Est.</span>
          <span className="font-mono font-semibold text-foreground">
            ~{strStats.averageClassSizeEstimate.toFixed(1)} students
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Direct Instructional Spend</span>
          <span className="font-mono font-semibold text-foreground">
            ${budgetStats.instructionSpendPerStudent.toFixed(0)} / student
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Admin Overhead %</span>
          <span className="font-mono font-semibold text-foreground">
            {budgetStats.adminRatioPct.toFixed(1)}% of budget
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Tuition Payroll Multiplier</span>
          <span className="font-mono font-semibold text-foreground">
            {higherEdStats.tuitionRoiMultiplier > 0 ? `${higherEdStats.tuitionRoiMultiplier.toFixed(2)}x` : "Tax Funded"}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Academic benchmarks aligned with NCES Fast Facts &amp; UNESCO Standards</span>
        </div>

        <button
          onClick={copyReport}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Report Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy School Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default EducationProductivityCalculator;

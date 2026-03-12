"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Minus, Circle, Square } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface MetricCard {
    label: string;
    value: string;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

interface MigrationStage {
    title: string;
    count: number;
    steps: Array<{
        label: string;
    }>;
}

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const metrics: MetricCard[] = [
        {
            label: "Total Line",
            value: "312,982,172,726",
            icon: <Minus className="h-3 w-3 text-cyan-400" />,
        },
        {
            label: "Workspace Ready for Hammer Intervention",
            value: "8,769",
            icon: <Circle className="h-2 w-2 text-blue-500" strokeWidth={3} />,
            trend: { value: 90, isPositive: true },
        },
        {
            label: "Project PTE Saved",
            value: "$1,000",
            icon: <Minus className="h-3 w-3 text-orange-400" />,
            trend: { value: 90, isPositive: false },
        },
        {
            label: "Total Cost Per Lines of Code",
            value: "$2,000",
            icon: <Square className="h-2 w-2 text-cyan-400" strokeWidth={3} />,
            trend: { value: 90, isPositive: false },
        },
    ];

    const migrationStages: MigrationStage[] = [
        {
            title: "agentic planning",
            count: 113789,
            steps: [
                { label: "Scan and Interpretations" },
                { label: "SVN Data and Dependence" },
                { label: "Harmonize Attendance" },
            ],
        },
        {
            title: "Analytic Migration Workflow",
            count: 8769,
            steps: [
                { label: "Analysis" },
                { label: "Conversation" },
                { label: "Unit Test" },
            ],
        },
        {
            title: "Hammer Integration Stage",
            count: 0,
            steps: [
                { label: "Git Migration" },
                { label: "Regression Test" },
                { label: "Prod Primary String" },
                { label: "Business" },
            ],
        },
        {
            title: "SARS and DMS",
            count: 0,
            steps: [{ label: "SARS Programmer" }, { label: "SARS Server Dess" }],
        },
    ];

    // 为 Recharts 准备的平滑曲线数据
    const costData = [
        { name: "Jan", save: 45000, billing: 25000 },
        { name: "Feb", save: 44000, billing: 24500 },
        { name: "Mar", save: 43500, billing: 24000 },
        { name: "Apr", save: 42000, billing: 23000 },
        { name: "May", save: 36000, billing: 20000 },
        { name: "Jun", save: 40000, billing: 22000 },
        { name: "Jul", save: 46000, billing: 26000 },
        { name: "Aug", save: 44000, billing: 25000 },
        { name: "Sep", save: 38000, billing: 21000 },
        { name: "Oct", save: 35000, billing: 19000 },
        { name: "Nov", save: 42000, billing: 23000 },
        { name: "Dec", save: 44000, billing: 24000 },
    ];

    const files = [
        "uk_grid +256 workspace",
        "uk_grid +259 workspace",
        "子目錄 可以點開uk_grid +256 workspace",
        "子目錄 可以點開uk_grid +256 workspace",
        "子目錄 可以點開uk_grid +256 workspace",
        "子目錄 可以點開uk_grid +256 workspace",
    ];

    const filteredFiles = files.filter((f) =>
        f.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0B101E] p-8 font-sans">
            {/* Header */}
            <div className="mb-10 flex items-center gap-4">
                {/* 还原截图中的特殊红色 Icon */}
                <div className="relative flex h-8 w-10 items-center justify-center">
                    <div className="absolute left-0 h-6 w-6 transform rounded-sm bg-red-600 rotate-45"></div>
                    <div className="absolute right-0 h-6 w-6 transform rounded-sm bg-red-600 rotate-45"></div>
                    <div className="z-10 flex gap-1">
                        <div className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white"></div>
                        <div className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white"></div>
                    </div>
                </div>
                <h1 className="text-xl font-bold uppercase tracking-wide text-cyan-400">
                    SAS Modernization Categories
                </h1>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Left Section */}
                <div className="col-span-9 space-y-8">
                    {/* Metrics Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        {metrics.map((metric, idx) => (
                            <div key={idx} className="flex flex-col gap-4 p-2">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        {metric.icon}
                                        <p className="text-xs text-slate-400">{metric.label}</p>
                                    </div>
                                    {metric.trend && (
                                        <span
                                            className={`rounded px-2 py-0.5 text-xs font-bold ${metric.trend.isPositive
                                                    ? "bg-emerald-400/20 text-emerald-400"
                                                    : "bg-orange-400/20 text-orange-400"
                                                }`}
                                        >
                                            {metric.trend.isPositive ? "+" : "-"}
                                            {metric.trend.value}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xl font-bold text-slate-100 text-center">
                                    {metric.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Migration Status */}
                    <div className="space-y-6 pt-4">
                        <h2 className="text-sm font-semibold text-indigo-400 mb-2">
                            Migration Status
                        </h2>
                        <div className="space-y-6">
                            {migrationStages.map((stage, idx) => (
                                <div key={idx} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-[14px] font-medium text-cyan-400">
                                            {stage.title}
                                        </h3>
                                        {stage.count > 0 && (
                                            <span className="text-xs text-slate-500">
                                                ({stage.count.toLocaleString()})
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                        {stage.steps.map((step, stepIdx) => (
                                            <React.Fragment key={stepIdx}>
                                                <div className="text-slate-300">{step.label}</div>
                                                {stepIdx < stage.steps.length - 1 && (
                                                    <ArrowRight className="h-4 w-4 text-slate-600" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cost and Billing Chart (Recharts 优化版) */}
                    <Card className="mt-8 rounded-xl border-none bg-[#131A2B] p-6 shadow-xl">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Cost and Billing</h2>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                                    <span className="text-xs text-slate-400">Save</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                    <span className="text-xs text-slate-400">Billing</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={costData}
                                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                                >
                                    {/* 只保留水平横线，并降低透明度以匹配暗黑风格 */}
                                    <CartesianGrid vertical={false} stroke="#1E293B" strokeDasharray="3 3" />

                                    {/* 隐藏 X 轴以匹配原图纯净感 */}
                                    <XAxis dataKey="name" hide />

                                    {/* Y 轴去掉基准线，只留文字 */}
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#64748b", fontSize: 11 }}
                                        tickFormatter={(value) => value.toLocaleString()}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1e293b",
                                            border: "none",
                                            borderRadius: "8px",
                                            color: "#f8fafc",
                                        }}
                                        itemStyle={{ color: "#cbd5e1" }}
                                    />

                                    {/* Save 线条：使用 monotone 实现平滑曲线，开启原点 dot */}
                                    <Line
                                        type="monotone"
                                        dataKey="save"
                                        stroke="#06b6d4"
                                        strokeWidth={2}
                                        dot={{ r: 4, fill: "#06b6d4", strokeWidth: 0 }}
                                        activeDot={{ r: 6 }}
                                        isAnimationActive={false}
                                    />

                                    {/* Billing 线条 */}
                                    <Line
                                        type="monotone"
                                        dataKey="billing"
                                        stroke="#a855f7"
                                        strokeWidth={2}
                                        dot={{ r: 4, fill: "#a855f7", strokeWidth: 0 }}
                                        activeDot={{ r: 6 }}
                                        isAnimationActive={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Right Section - File List w/ Search */}
                <div className="col-span-3">
                    <Card className="h-full rounded-xl border-none bg-[#131A2B] p-6 shadow-xl">
                        <h2 className="mb-4 text-sm font-bold text-white">
                            Source Migration List Update
                        </h2>

                        {/* Search Input */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded bg-[#1E293B] py-2 pl-9 pr-4 text-sm text-slate-200 outline-none transition-all focus:ring-1 focus:ring-cyan-500"
                            />
                        </div>

                        <div className="space-y-3">
                            {filteredFiles.length > 0 ? (
                                filteredFiles.map((file, idx) => (
                                    <div
                                        key={idx}
                                        className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-slate-800 transition-colors"
                                    >
                                        <span className="text-sm text-slate-300 break-words">
                                            {file}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="py-4 text-center text-sm text-slate-500">
                                    No results found.
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
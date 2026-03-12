"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, Minus, Circle, Square, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { MigrationStageCard } from './migrationStage';

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
            title: "SAS and DMS",
            count: 0,
            steps: [{ label: "SAS Programmer" }, { label: "SAS Server Dess" }],
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
        <div className="min-h-screen bg-gradient-to-br from-[#0B101E] via-[#0D1427] to-[#0A0E1A] p-6 md:p-8 font-sans">
            {/* Header */}
            <div className="mb-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Logo Icon */}
                    <div className="relative flex h-10 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 shadow-lg">
                        <div className="absolute left-0 h-6 w-6 transform rounded-sm bg-red-500 rotate-45 opacity-40"></div>
                        <div className="absolute right-0 h-6 w-6 transform rounded-sm bg-red-500 rotate-45 opacity-40"></div>
                        <div className="z-10 flex gap-1">
                            <div className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white"></div>
                            <div className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white"></div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            SAS Modernization Categories
                        </h1>
                    </div>
                </div>
                <div className="flex gap-2 items-center text-sm text-slate-400">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span>System Active</span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-9 space-y-8">
                    {/* Metrics Cards - Enhanced Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {metrics.map((metric, idx) => (
                            <div
                                key={idx}
                                className="group relative overflow-hidden rounded-lg border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer"
                            >
                                {/* Background accent */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Content */}
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors">
                                                {metric.icon}
                                            </div>
                                            <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-tight max-w-xs">
                                                {metric.label}
                                            </p>
                                        </div>
                                        {metric.trend && (
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${metric.trend.isPositive
                                                    ? "bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500/25"
                                                    : "bg-orange-500/15 text-orange-400 group-hover:bg-orange-500/25"
                                                    }`}
                                            >
                                                {metric.trend.isPositive ? (
                                                    <TrendingUp className="w-3 h-3" />
                                                ) : (
                                                    <TrendingDown className="w-3 h-3" />
                                                )}
                                                {metric.trend.isPositive ? "+" : "-"}
                                                {metric.trend.value}%
                                            </span>
                                        )}
                                    </div>
                                    <div className="pt-2 border-t border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                                        <p className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                            {metric.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Migration Status - Enhanced */}
                    <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-8 w-1 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                            <h2 className="text-lg font-semibold text-white">
                                Migration Status Pipeline
                            </h2>
                            {/* <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div> */}
                        </div>

                        <div className="space-y-6">
                            {migrationStages.map((stage, idx) => (
                                <MigrationStageCard key={idx} stage={stage} index={idx} />
                            ))}
                        </div>
                    </div>

                    {/* Cost and Billing Chart - Enhanced */}
                    <Card className="mt-8 rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-7 shadow-xl hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all duration-300">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-1">Cost & Billing Analytics</h2>
                                <p className="text-xs text-slate-400">12-month performance trend</p>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/30 border border-slate-700/30">
                                    <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/20"></div>
                                    <span className="text-xs font-medium text-slate-300">Savings</span>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800/30 border border-slate-700/30">
                                    <div className="h-3 w-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/20"></div>
                                    <span className="text-xs font-medium text-slate-300">Billing</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[280px] w-full -mx-2 px-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={costData}
                                    margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
                                >
                                    <defs>
                                        <linearGradient id="colorSave" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorBilling" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="#334155" strokeDasharray="4 4" opacity={0.3} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#64748b"
                                        style={{ fontSize: "12px" }}
                                        tick={{ fill: "#94a3b8" }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "#64748b", fontSize: 12 }}
                                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1e293b",
                                            border: "1px solid #334155",
                                            borderRadius: "8px",
                                            color: "#f8fafc",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                                        }}
                                        itemStyle={{ color: "#cbd5e1" }}
                                        formatter={(value: number) => `$${(value / 1000).toFixed(1)}k`}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="save"
                                        stroke="#06b6d4"
                                        strokeWidth={3}
                                        dot={{ r: 5, fill: "#06b6d4", strokeWidth: 2, stroke: "#0B101E" }}
                                        activeDot={{ r: 7, strokeWidth: 2 }}
                                        isAnimationActive={false}
                                        fillOpacity={1}
                                        fill="url(#colorSave)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="billing"
                                        stroke="#a855f7"
                                        strokeWidth={3}
                                        dot={{ r: 5, fill: "#a855f7", strokeWidth: 2, stroke: "#0B101E" }}
                                        activeDot={{ r: 7, strokeWidth: 2 }}
                                        isAnimationActive={false}
                                        fillOpacity={1}
                                        fill="url(#colorBilling)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Right Section - File List w/ Search */}
                <div className="lg:col-span-3">
                    <Card className="h-full rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-6 shadow-xl flex flex-col hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all duration-300">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-white mb-1">
                                Source Files
                            </h2>
                            <p className="text-xs text-slate-400">Manage migration list</p>
                        </div>

                        {/* Search Input - Enhanced */}
                        <div className="relative mb-6 group">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-hover:text-slate-400 transition-colors pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search files..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg bg-slate-800/40 border border-slate-700/50 py-3 pl-11 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 focus:shadow-lg focus:shadow-cyan-500/10 hover:border-slate-600/70"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {/* File List - Scrollable */}
                        <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                            {filteredFiles.length > 0 ? (
                                filteredFiles.map((file, idx) => (
                                    <div
                                        key={idx}
                                        className="group/file flex items-center gap-3 rounded-lg px-4 py-3 bg-slate-800/20 border border-slate-700/30 hover:border-cyan-500/30 hover:bg-slate-800/40 transition-all duration-200 cursor-pointer hover:shadow-md hover:shadow-cyan-500/10"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 rounded bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center text-xs font-semibold text-cyan-400 group-hover/file:from-cyan-500/30 group-hover/file:to-blue-500/20 transition-all">
                                            F
                                        </div>
                                        <span className="text-sm text-slate-300 group-hover/file:text-slate-100 transition-colors break-words flex-1">
                                            {file}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover/file:text-cyan-500 transition-colors opacity-0 group-hover/file:opacity-100 -mr-2" />
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Search className="w-8 h-8 text-slate-700 mb-3" />
                                    <p className="text-sm text-slate-500">No files found</p>
                                    <p className="text-xs text-slate-600 mt-1">Try a different search term</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {filteredFiles.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-700/30 text-xs text-slate-500 text-center">
                                Showing {filteredFiles.length} of {files.length} files
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
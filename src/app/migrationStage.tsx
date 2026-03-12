"use client";

import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

export interface MigrationStep {
    label: string;
}

export interface MigrationStage {
    title: string;
    count: number;
    steps: MigrationStep[];
    type: "Manual" | "Automatic";
}

export const MigrationStageCard = ({
    stage,
    isLast,
}: {
    stage: MigrationStage;
    isLast?: boolean;
}) => {
    const hasItems = stage.count > 0;

    return (
        <div className="relative flex w-full">
            {/* 左侧纵向连接轴线 - 填补左侧垂直空白，增强整体感 */}
            {!isLast && (
                <div className="absolute left-[3px] top-[10px] bottom-[-30px] w-[1px] bg-gradient-to-b from-cyan-500/50 via-slate-700/30 to-transparent"></div>
            )}

            {/* 圆形轴点 */}
            <div className="relative z-10 mt-1.5 mr-6 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            </div>

            <div className="flex-1 pb-10">
                {/* 阶段标题栏 */}
                <div className="flex items-center gap-4 mb-5">
                    <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
                        {stage.title}
                    </h3>
                    {hasItems && (
                        <span className="text-[11px] text-slate-500 font-mono bg-slate-800/50 px-2 py-0.5 rounded">
                            {stage.count.toLocaleString()}
                        </span>
                    )}
                    <span
                        className={`text-[9px] px-2 py-0.5 rounded-sm border uppercase tracking-tighter ${stage.type === "Automatic"
                                ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/10"
                                : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                            }`}
                    >
                        {stage.type}
                    </span>
                </div>

                {/* 步骤横向容器 - 增加 gap 填补水平空白 */}
                <div className="flex flex-wrap items-center gap-y-4 gap-x-6">
                    {stage.steps.map((step, stepIdx) => (
                        <React.Fragment key={stepIdx}>
                            <div className="group relative">
                                <div className="min-w-[140px] px-4 py-3 rounded-md bg-[#111827] border border-slate-800 hover:border-cyan-500/50 hover:bg-[#161F33] transition-all duration-300 shadow-sm">
                                    <div className="text-xs text-slate-400 group-hover:text-cyan-100 transition-colors whitespace-nowrap">
                                        {step.label}
                                    </div>
                                </div>
                            </div>

                            {stepIdx < stage.steps.length - 1 && (
                                <div className="flex items-center">
                                    <ArrowRight className="w-4 h-4 text-slate-700 shrink-0" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const MigrationStatus = ({ stages }: { stages: MigrationStage[] }) => {
    return (
        <div className="w-full px-2">
            {/* 模块标题 */}
            <div className="flex items-center gap-3 mb-12">
                <div className="h-5 w-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
                <h2 className="text-md font-black text-white uppercase tracking-[0.25em]">
                    Migration Status Pipeline
                </h2>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-800 to-transparent ml-4"></div>
            </div>

            {/* 流程列表 */}
            <div className="flex flex-col">
                {stages.map((stage, index) => (
                    <MigrationStageCard
                        key={index}
                        stage={stage}
                        isLast={index === stages.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};